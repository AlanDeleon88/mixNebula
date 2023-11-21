import './MediaFocusContent.css'

const MediaFocusContent = ({user, song, album, playlist}) =>{


    return(
        <>
            <div className='media-focus-content-main'>
                <div className='media-focus-user-section'>
                    User bar here
                </div>
                <div className='media-focus-content'>
                    Content Here
                </div>
                <div className='media-focus-side-bar-container'>
                    Explore Side bar here
                </div>
            </div>
        </>
    )
}

export default MediaFocusContent
