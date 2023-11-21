import './DeleteAlbum.css'
import { useDispatch } from 'react-redux';
import { deleteUserAlbum } from '../../store/albums';
const DeleteAlbum = ({album, showModal}) =>{
    const dispatch = useDispatch();

    const handleYes = async (e) =>{
        e.preventDefault();
        return await dispatch(deleteUserAlbum(album.id))
        .then(() => {
            showModal(false);
        })
        .catch( async (res)=>{
            const data = await res.json();
            const errors = data.message;
            window.alert(errors); //!temp
            
        })
    }

    const handleNo = (e) =>{
        e.preventDefault();
        showModal(false);
    }

    return(
        <div className="delete-window-container">
            <div className='delete-prompt'>
                Are you sure you want to delete this album?
            </div>
            <div className='button-container'>
                <button className='button yes' onClick={handleYes}>Yes</button>
                <button className='button no' onClick={handleNo}>No</button>
            </div>

        </div>
    )
}

export default DeleteAlbum;
