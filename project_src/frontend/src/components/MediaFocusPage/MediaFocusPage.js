import './MediaFocusPage.css'
import MediaFocusHeader from './MediaFocusHeader'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAlbum } from '../../store/currentAlbum'
import { getSong } from '../../store/currentSong'
import { getPlaylistById } from '../../store/currentPlaylist'
import MediaFocusContent from './MediaFocusContent'

const MediaFocusPage = () =>{
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const { id,link } = useParams()
    let intId = Number(id)
    const album = useSelector(state=>state.currentAlbum)
    const playlist = useSelector(state=>state.currentPlaylist)
    const song = useSelector(state=>state.currentSong)
    console.log(intId, link)
    console.log(isLoaded);

    useEffect(()=>{
        if(link === 'album'){
            dispatch(getAlbum(intId)).then(res =>{
                setIsLoaded(true)
            })
        }
        else if(link === 'playlist'){
            dispatch(getPlaylistById(intId)).then(res =>{
                setIsLoaded(true)
            })
        }
        else if(link ==='song'){
            dispatch(getSong(intId)).then(res =>{
                setIsLoaded(true)
            })
        }
        return (() =>{
            setIsLoaded(false)
        })
    },[dispatch])


    return(
        <>
            <div className='media-focus-main-container'>
                {isLoaded &&
                    <>
                        <div className='media-focus-header-container'>
                            {
                                (link === 'album') ?
                                <>
                                    <MediaFocusHeader album = {album} />
                                </>
                                :
                                <>
                                    {
                                        (link === 'playlist') ?
                                            <>
                                                <MediaFocusHeader playlist = {playlist} />
                                            </>
                                            :
                                            <>
                                                <MediaFocusHeader song = {song} />
                                            </>
                                    }
                                </>
                            }
                        </div>

                    </>

                }
                <div className='media-focus-content-container'>
                    <MediaFocusContent song={song} album={album} playlist={playlist}/>
                </div>

            </div>
        </>
    )



}

export default MediaFocusPage
