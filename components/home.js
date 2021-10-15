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
const userInitialState = {
    likedAlbums: [],
    likedArtists: [],
    likedSongs: [],
    recentlyPlayed: []
}

function userReducer(state, action){
    switch(action.type){
        case 'setLikedAlbums':
            return {...state, likedAlbums: action.payload};
        case 'setLikedArtists':
            return {...state, likedArtists: action.payload};
        case 'setLikedSongs':
            return {...state, likedSongs: action.payload};
        case 'setRecentlyPlayed':
            return {...state, recentlyPlayed: action.payload};
    }
}
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
        case 'playAlbum':
            return {...state, trackIds: action.payload.trackIds, currentIndex: action.payload.currentIndex, playing: true}
        //TODO Start
        case 'playPlaylist':
            return {...state, playlistId: action.payload, playing: true}
        //TODO End
        case 'playArtist':
            return {...state, trackIds: action.payload.trackIds, currentIndex: action.payload.currentIndex, playing: true}
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
    const [userState, userDispatch] = useReducer(userReducer, userInitialState);
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        if(user){
            userDispatch({type:'setLikedAlbums', payload: user.likedAlbums});
            userDispatch({type:'setLikedArtists', payload: user.likedArtists});
            userDispatch({type:'setLikedSongs', payload: user.likedSongs});
            userDispatch({type:'setRecentlyPlayed', payload: user.recentlyPlayed});
        }
    },[user]);
    useEffect(() => {
        if(props.user.email){
            console.log(props.user.email);
            fetch(`/api/user/email/${props.user.email}`)
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    setUser(response.message);
                    //console.log("response message: ",response.message);
                } 
                else{
                    let body = {
                        email: props.user.email,
                        name: props.user.name
                    }
                    let options = {
                        method: 'POST',
                        body: JSON.stringify(body)
                    };
                    fetch('/api/user/email', options)
                    .then(response => response.json())
                    .then(response => {
                        fetch(`/api/user/${response.message.insertedId}`)
                        .then(response => response.json())
                        .then(response => {
                            if(response.success)
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
        <div className="flex flex-col gap-5 pt-5">
            <button onClick={() => dispatch({type: 'home'})} className="rounded-lg hover:bg-gray-700">Home</button>
            <button onClick={() => dispatch({type: 'search'})} className="rounded-lg hover:bg-gray-700">Search</button>
            <button onClick={() => dispatch({type: 'explore'})} className="rounded-lg hover:bg-gray-700">Explore</button>
            <button className="rounded-lg hover:bg-gray-700">Create Playlist</button>
        </div>
    </div>

    <div className="col-span-9 bg-gray-900 pl-5 overflow-y-scroll">
    {state.view === 'explore' && <Explore user={user} dispatch={dispatch} userState={userState} userDispatch={userDispatch}/>}
    {state.view === 'search' && <Search user={user} dispatch={dispatch} userState={userState} userDispatch={userDispatch}/>}
    {state.view === 'home' && <DefaultHome user={user} dispatch={dispatch} userState={userState} userDispatch={userDispatch}/>}
    {state.view === 'album' && <AlbumDetail id={state.albumId} user={user} dispatch={dispatch} userState={userState} userDispatch={userDispatch}/>}
    {state.view === 'artist' && <ArtistDetail id={state.artistId} user={user} dispatch={dispatch} userState={userState} userDispatch={userDispatch}/>}
    {state.view === 'playlist' && <PlaylistDetail id={state.playlistId} user={user} dispatch={dispatch} userState={userState} userDispatch={userDispatch}/>}
    {state.view === 'genre' && <GenreDetail id={state.genreId} user={user} dispatch={dispatch} userState={userState} userDispatch={userDispatch}/>}
    </div>
    </div>
    <div className="absolute inset-x-10 bottom-5">
        <AudioPlayer trackIds={state.trackIds} currentIndex={state.currentIndex} playing={state.playing} dispatch={dispatch} userState={userState} userDispatch={userDispatch}/>
    </div>
    </>
    );
}