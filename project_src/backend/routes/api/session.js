const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username'),
    check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password'),
    handleValidationErrors
];


router.post( //? login route grants user a token
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;
        const user = await User.login({credential, password});

        if(!user){
            const err = new Error('Login Failed');
            err.status = 401;
            err.title = 'Login Failed';
            err.errors = ['The provided credentials were invalid'];
            return next(err);
        }

         let token = await setTokenCookie(res, user);

        return res.json({
            user,
            "token" : `${token}`
        })
    }
    );

router.delete( //? logout route, deletes the token cookie.
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success'});
    }
);

router.get(
    '/',
    restoreUser,
    (req, res) =>{
        const { user } = req;
        if(user){
            return res.json({
                user : user.toSafeObject()
            });
        }
        else{
            return res.json({});
        }
    }
);

module.exports = router;
