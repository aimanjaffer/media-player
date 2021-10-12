import AudioPlayer from "./audioPlayer";
import { useEffect, useReducer, useState } from "react";
import DefaultHome from "./defaultHome";
import Search from "./search";
import Explore from "./explore";
import ArtistDetail from "./artistDetail";
import AlbumDetail from "./albumDetail";
import PlaylistDetail from "./playlistDetail";
import GenreDetail from "./genreDetail";
const initialState = {
    view: "home"
};
function reducer(state, action){
     switch(action.type){
        case 'home':
            return {...state, view: 'home'}
        case 'explore':
            return {...state, view: 'explore'}
        case 'search':
            return {...state, view: 'search'}
        case 'album':
            return {...state, view: 'album', albumId: action.payload}
        case 'artist':
            return {...state, view: 'artist', artistId: action.payload}
        case 'playlist':
            return {...state, view: 'playlist', playlistId: action.payload}
        case 'genre':
            return {...state, view: 'genre', genreId: action.payload}
        case 'playTrack':
            return {...state, trackIds: action.payload.trackIds, currentIndex: action.payload.currentIndex, playing: true}
        //TODO Start
        case 'playAlbum':
            return {...state, albumId: action.payload, playing: true}
        case 'playPlaylist':
            return {...state, playlistId: action.payload, playing: true}
        case 'playArtist':
            return {...state, artistId: action.payload, playing: true}
        //TODO End
        case 'nextTrack':
            return {...state, currentIndex: action.payload}
        case 'previousTrack':
            return {...state, currentIndex: action.payload}
        case 'pause':
            return {...state, playing: false}
        case 'play':
            return {...state, playing: true}
    }
    return state; 
}
export default function Home(props){
    const [user, setUser] = useState({});
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        if(props.user.email){
            fetch(`/api/user/email/${props.user.email}`)
            .then(response => response.json())
            .then(response => {
                if(response.success)
                    setUser(response.message);
                else{
                    let body = {
                        email: props.user.email,
                        name: props.user.name
                    }
                    let options = {
                        method: 'POST',
                        body: JSON.stringify(body)
                    };
                    fetch('/api/user/email/', options)
                    .then(response => response.json())
                    .then(response => {
                        fetch(`/api/user/${response.message.insertedId}`)
                        .then(response => response.json())
                        .then(response => {
                            if(response.successs)
                                setUser(response.message);
                        });
                    });
                }
            });
        }
    },[props.user]);
    return (
    <>
    <div className="grid grid-cols-10 overflow-hidden h-screen">
    <div className="bg-gray-800 col-span-1 text-white text-xl">
        <div className="flex flex-col gap-5">
            <button onClick={() => dispatch({type: 'home'})} className="rounded-lg hover:bg-gray-700">Home</button>
            <button onClick={() => dispatch({type: 'search'})} className="rounded-lg hover:bg-gray-700">Search</button>
            <button onClick={() => dispatch({type: 'explore'})} className="rounded-lg hover:bg-gray-700">Explore</button>
            <button className="rounded-lg hover:bg-gray-700">Create Playlist</button>
        </div>
    </div>

    <div className="col-span-9 bg-gray-900 pl-5 overflow-y-scroll">
    {state.view === 'explore' && <Explore user={user} dispatch={dispatch}/>}
    {state.view === 'search' && <Search user={user} dispatch={dispatch}/>}
    {state.view === 'home' && <DefaultHome user={user} dispatch={dispatch}/>}
    {state.view === 'album' && <AlbumDetail id={state.albumId} user={user} dispatch={dispatch}/>}
    {state.view === 'artist' && <ArtistDetail id={state.artistId} user={user} dispatch={dispatch}/>}
    {state.view === 'playlist' && <PlaylistDetail id={state.playlistId} user={user} dispatch={dispatch}/>}
    {state.view === 'genre' && <GenreDetail id={state.genreId} user={user} dispatch={dispatch}/>}
    </div>
    </div>
    <div className="absolute inset-x-10 bottom-5">
        <AudioPlayer trackIds={state.trackIds} currentIndex={state.currentIndex} playing={state.playing} dispatch={dispatch}/>
    </div>
    </>
    );
}