import { useEffect, useState } from "react"
import { useHistory, useParams, Route, Switch, NavLink, useRouteMatch} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import './UserProfilePage.css'
import UserProfileHeader from "./UserProfileHeader"
import { getArtist } from "../../store/artist"
import ExploreUserComponent from "../LoggedHome/ExploreUserComponent"
import TrackList from "./TrackList"
import UserAlbumList from "./UserAlbumList"
import UserPlaylistList from "./UserPlaylistList"
import UserStatsComponent from "./UserStatsComponent"

const UserProfilePage = () =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const currentUser = useSelector(state=>state.session.user)
    const user = useSelector(state=>state.artist)
    const match = useRouteMatch();
    let {username,userId} = useParams();
    userId = Number(userId)
    const history = useHistory();
    const dispatch = useDispatch();
    // console.log(typeof userId);
    // console.log(username);

    useEffect(() =>{
        dispatch(getArtist(userId)).then(res=>{
            setIsLoaded(true)
        })

    },[dispatch, userId])

    return(
        <>
            <div className="user-page-main-container">
                {isLoaded &&
                    <UserProfileHeader user={user} currentUser={currentUser} userId={userId}/>

                }

                <div className="user-page-nav-bar-container">
                    {/* Make these nav links for active class later  */}
                    <NavLink to={`${match.url}`} exact={true} className='user-page-nav-link' activeClassName="user-page-nav-active">
                        Tracks
                    </NavLink>
                    <NavLink to={`${match.url}/albums`} className='user-page-nav-link' activeClassName="user-page-nav-active">
                        Albums
                    </NavLink>
                    <NavLink to={`${match.url}/playlists`} className='user-page-nav-link' activeClassName="user-page-nav-active">
                        Playlists
                    </NavLink>
                </div>
                <div className="user-page-content-container">
                    <div className="user-page-content">
                        <Switch>
                            <Route path={`${match.url}`} exact={true}>

                                <TrackList userId={userId}/>

                            </Route>
                            <Route path={`${match.url}/albums`}>
                                <UserAlbumList userId={userId} username={user.username}/>
                            </Route>
                            <Route path={`${match.url}/playlists`}>
                                <UserPlaylistList userId={userId} username={user.username}/>

                            </Route>

                        </Switch>
                    </div>
                    <div className="user-page-stats-container">
                        <UserStatsComponent user={user}/>

                        <ExploreUserComponent />
                    </div>
                </div>

            </div>
        </>
    )

}

export default UserProfilePage
