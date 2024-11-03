import './CreateSong.css'
import { useState } from 'react'
import uploadFile from '../../utils/uploadFile'
import { useDispatch, useSelector } from 'react-redux'
import {MdInsertPhoto, MdOutlineAddPhotoAlternate} from 'react-icons/md'
import { addSingle } from '../../store/songs'
import { loadUserAlbums } from '../../store/albums'
import { getArtist } from '../../store/artist'

const CreateSongForm = ({setShowModal}) =>{
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [songUrl, setSongUrl] = useState('')
    // const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(state=>state.session.user)
    const [filename, setFilename] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const dispatch = useDispatch();

    const handleUpload = e =>{
        let songObj = {
            title: title,
            descripttion: description,
            imageUrl : imageUrl,
            songUrl : songUrl

        }
        if(songUrl){
            dispatch(addSingle(songObj)).then(res =>{
                dispatch(loadUserAlbums(user.id))
                dispatch(getArtist(user.id))
                setShowModal(false)
                // console.log(res);
            })
            .catch(async (res) =>{
                if(res){
                    const data = await res.json()
                    const errors = data.errors

                    if(data.errors && data){
                        setValidationErrors(errors)
                    }

                }
            })
        }
    }

    const handleDelete = e =>{
        setImageUrl('')
        // console.log('HEY CLICKED');
    }

    const handleSongClick = e =>{
        let input = document.getElementById('song-form-upload')
        input.click()
    }

    const updateImage = e =>{
        const image = e.target.files[0]
        if(image){
            uploadFile(image, 'image').then(res =>{
                setImageUrl(res)
            }).catch(async (res) =>{
                const data = await res.json()
                console.log(data);
            })
        }
    }

    const updateSong = e =>{
        const song = e.target.files[0]

        if(song){
            setIsUploading(true)
            uploadFile(song, 'song').then(res =>{
                setFilename(song.name)
                setIsUploading(false)
                setSongUrl(res)
            }).catch(async (res) =>{
                const data = await res.json()
                console.log(data);
            })

        }
    }




    return(
        <>
            <div className='song-form-main-container'>
                <div className='song-form-header'>
                   Upload a song
                </div>
                { validationErrors &&
                <>
                    {validationErrors.map(error =>{
                        return(
                            <div className='create-album-errors error'>
                                {error}
                            </div>
                        )
                    })}
                </>

                }
                <div className='song-form'>
                    <div className='song-form-img-upload-container'>
                        <div className='song-form-img-header'>
                            Add song art
                        </div>
                        <div className='song-form-img-prev-container'>
                        { imageUrl ?
                            (

                                <>

                                    <img src={imageUrl} className='song-form-img'/>
                                    <div className='song-form-img-delete mix-neb-button mix-neb-delete' onClick={handleDelete}>
                                        Delete image
                                    </div>

                                </>

                            )
                            :
                            (
                                <div className='song-form-img-place-holder'>
                                    <MdOutlineAddPhotoAlternate  />
                                </div>
                            )
                        }

                        </div>
                        <div className='song-form-img-upload-button mix-neb-button mix-neb-confirm'
                        onClick={() =>{
                            document.getElementById('create-album-file-input').click()
                        }}>
                        <input type='file' accept='image/*' style={{display:'none'}} onChange={updateImage} id='create-album-file-input' onClick={(e) => e.target.value = null}/>
                        Upload an image
                    </div>
                    </div>
                    <div className='song-form-input-container'>
                            <div className='song-form-input-bundle'>
                                <label className='song-form-label'>
                                    File
                                </label>
                                {isUploading ?
                                (
                                    <>
                                        <div className='song-form-loading'>
                                            Uploading song..
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                    <div className='song-form-filename'>

                                        { filename?
                                            (
                                                <>
                                                    {filename}
                                                </>
                                            )

                                            :
                                            (
                                                <>
                                                    No file uploaded
                                                </>
                                            )

                                        }
                                    </div>

                                    </>
                                )
                            }
                                <div className='song-form-upload-song-button mix-neb-button mix-neb-confirm' onClick={handleSongClick}>
                                    Upload Song
                                </div>
                                <input type='file' accept='audio/*' style={{'display' : 'none'}} id='song-form-upload' onChange={updateSong}/>
                            </div>
                            <div className='song-form-input-bundle'>
                                <label className='song-form-label'>
                                    Title
                                </label>
                                <input type='text' className='song-form-input' value={title} onChange={(e) =>{setTitle(e.target.value)}}/>
                            </div>

                            <div className='song-form-input-bundle'>
                                <label className='song-form-label'>
                                    Description
                                </label>
                                <input type='text' className='song-form-input' value={description} onChange={(e) =>{setDescription(e.target.value)}}/>
                            </div>

                    </div>

                </div>
                <div className='song-form-button-background'>
                    <div className='song-form-buttons-container'>
                        <div className='song-form-buttons-bundle'>
                            <div className= { songUrl ? ('song-form-button mix-neb-button mix-neb-confirm') : ('song-form-button mix-neb-button mix-neb-confirm song-form-upload-disabled')} onClick={handleUpload}>
                                Upload
                            </div>
                            <div className='song-form-button mix-neb-button mix-neb-cancel' onClick={() =>{setShowModal(false)}}>
                                Cancel
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </>
    )

}

export default CreateSongForm
