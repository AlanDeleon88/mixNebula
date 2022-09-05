import {useMemo, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { addUserAlbum } from '../../store/albums';


const AddAlbumForm = ({showModal}) => {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const album = {
            title,
            description,
            imageUrl
        }
        // console.log(album);

        return await dispatch(addUserAlbum(album))
        .then(() => {
            showModal(false);
        })
        .catch(async (res) =>{
            const data = await res.json();
            const errors = data.errors;
            setHasSubmitted(true);
            if(data.errors && data){
                setValidationErrors(errors);
            }

        });

    }

    return(
        <>
            <div className='add-album-container'>
                {validationErrors.length > 0 &&(
                    <>
                        <ul className='error-list'>
                            {validationErrors.map((error, i) =>{
                                return(
                                    <li key={i}>
                                        {error}
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                )}

                <form className='add-album-form' onSubmit={handleSubmit}>
                    <h3>Add Album:</h3>
                    <label htmlFor='title'>Title</label>
                    <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>

                    <label htmlFor='description'>Description</label>
                    <input id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>

                    <label htmlFor='imageUrl'>Image-Url</label>
                    <input id='ImageUrl' type='text' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>

                </form>

                <button className='album-submit-button' onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </>
    )
}


export default AddAlbumForm;