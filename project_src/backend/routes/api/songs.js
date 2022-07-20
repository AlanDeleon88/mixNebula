const express = require('express');

const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get(
    '/',
    async (req,res) =>{
        const songs = await Song.findAll();
        if(!songs){
            const err = new Error('No songs found!');
            err.title = 'No songs';
            err.status = 404;
            return next(err);
        }
        res.statusCode = 200;
        res.json({
            "Songs" : songs,
        })
    }
);

router.get(
    '/:id',
    async (req, res, next) =>{
        const { id } = req.params;
        const song = await Song.findByPk(id);
        if(!song){
            const err = new Error("Song couldn't be found");
            err.title = 'Song not found';
            err.status = 404;
            return next(err);
        }
        //!lazy loading?

        const artist = await User.findOne({
            where: {
                id : song.userId
            },
            attributes: ['id', 'username', 'previewImage']

        });
        const album = await Album.findOne({
            where:{
                id: song.albumId
            },
            attributes: ['id', 'title', 'previewImage']
        })

        res.statusCode = 200;
        res.json({
            song,
            artist,
            album

        });
    }
);

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) =>{
        const { id } = req.params;
        const { user } = req;

        const song = await Song.findByPk(id);

        if(!song){
            const err = new Error("Song couldn't be found"); //! maybe create a method to build these error handlers
            err.title = 'Song not Found';
            err.status = 404;
            return next(err);
        }
        if(user.id !== song.userId){
            const err = new Error("Song does not belong to current user"); //! maybe create a method to build these error handlers
            err.title = 'Unauthorized delete';
            err.status = 401;
            return next(err);
        }

        await Song.destroy({
            where:{
                id: id
            }
        });
        res.statusCode = 200
        res.json({
            "message" : "Successfully deleted",
            "statusCode" : res.statusCode
        })
    }
);

module.exports = router;