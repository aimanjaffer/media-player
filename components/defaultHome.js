import AlbumOverview from "./albumOverview";
import { signOut } from "next-auth/client";
import ArtistOverview from "./artistOverview";
import PlaylistOverview from "./playlistOverview";
import Track from "./track";
import { useEffect, useState } from "react";
export default function DefaultHome(props){
    const [allAlbums, setAllAlbums] = useState([]);
    useEffect(()=>{
        fetch('/api/albums')
        .then(response => response.json())
        .then(response => {
            if(response.success)
                setAllAlbums(response.message);
        });
    }, []);
    return (<>
            <div className="absolute top-5 right-5">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={signOut}>Sign out</button>
            </div>
            <div className="text-white text-5xl pb-5">Hey {props.user?.name}</div>
            <div className="text-white text-3xl pb-1">Recently Played</div>
            
            <div className="grid grid-cols-4 gap-4 pb-5">
                {props.userState.recentlyPlayed && props.userState.recentlyPlayed.map(item => {
                if(item.type === 'album')
                    return <AlbumOverview key={item._id} user={props.user} id={item._id} name={item.name} artistName={item.artistName} artistId={item.artistId} dispatch={props.dispatch} userState={props.userState} userDispatch={props.userDispatch}/>
                if(item.type === 'track')
                    return <Track key={item._id} user={props.user} id={item._id} name={item.name} artistName={item.artistName} artistId={item.artistId} albumId={item.albumId} dispatch={props.dispatch} user={props.user} userState={props.userState} userDispatch={props.userDispatch}/>
                if(item.type === 'artist')
                    return <ArtistOverview key={item._id} user={props.user} id={item._id} name={item.name} dispatch={props.dispatch} userState={props.userState} userDispatch={props.userDispatch}/>
                if(item.type === 'playlist')
                    return <PlaylistOverview key={item._id} user={props.user} id={item._id} name={item.name} dispatch={props.dispatch} userState={props.userState} userDispatch={props.userDispatch}/>
                })}
            </div>
            <div className="text-white text-3xl pb-1">Liked Albums</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {props.userState.likedAlbums?.map(item => <AlbumOverview key={item._id} user={props.user} id={item._id} name={item.name} artistName={item.artistName} artistId={item.artistId} dispatch={props.dispatch} userState={props.userState} userDispatch={props.userDispatch}/>)}
            </div>
            <div className="text-white text-3xl pb-1">Liked Songs</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {props.userState.likedSongs?.map(item => <Track key={item._id} 
                                                id={item._id} 
                                                name={item.name} 
                                                artistName={item.artistName} 
                                                artistId={item.artistId} 
                                                albumId={item.albumId} 
                                                dispatch={props.dispatch} 
                                                user={props.user} 
                                                userState={props.userState} 
                                                userDispatch={props.userDispatch}
                                                />)}
            </div>
            <div className="text-white text-3xl pb-1">Liked Artists</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {props.userState.likedArtists?.map(item => <ArtistOverview key={item._id} user={props.user} id={item._id} name={item.name} dispatch={props.dispatch} userState={props.userState} userDispatch={props.userDispatch}/>)}
            </div>
            <div className="text-white text-3xl">Your Playlists</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {props.user && props.user?.playlists?.map(item => <PlaylistOverview key={item._id} user={props.user} id={item._id} name={item.name} dispatch={props.dispatch} userState={props.userState} userDispatch={props.userDispatch}/>)}
            </div>
            <div className="text-white text-3xl pb-1">Discover</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {allAlbums && allAlbums.map(item => <AlbumOverview key={item._id} id={item._id} user={props.user} name={item.name} artistName={item.artistName} artistId={item.artistId} dispatch={props.dispatch} userState={props.userState} userDispatch={props.userDispatch}/>)}
            </div>
            </>);
}