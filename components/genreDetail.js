import { useEffect, useState } from "react";
import Track from "./track";
import Image from 'next/image';
import AlbumOverview from "./albumOverview";
export default function GenreDetail(props){
    const [genre, setGenre] = useState();
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    useEffect(()=>{
        fetch(`/api/genre/${props.id}`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if(response.success)
                setGenre(response.message);
        });
        fetch(`/api/albums/genreId/${props.id}`)
        .then(response => response.json())
        .then(response => {
            if(response.success)
                setAlbums(response.message);
        });
        fetch(`/api/tracks/genreId/${props.id}`)
        .then(response => response.json())
        .then(response => {
            if(response.success)
                setTracks(response.message);
        });
    },[props.id]);

    return (
        <>
        <button className="text-white text-xl pb-1" onClick={() => props.dispatch({type: 'explore'})}>Back</button>
        <div className="flex-initial p-2 mr-4">
            <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="200" width="200" />
        </div>
        <div className="text-white text-3xl pb-1">{genre?.name}</div>
        {/*<div>Playlists</div>*/}
        {(albums.length > 0) && <div className="text-white text-2xl pb-1">All Albums</div>}
        {(albums.length < 1) && <div className="text-white text-2xl pb-1">No Albums Available</div>}
        <div className="pr-10">
            {albums && albums.map(item => <AlbumOverview key={item._id} user={props.user} id={item._id} name={item.name} artistName={item.artistName} artistId={item.artistId} dispatch={props.dispatch}/>)}
        </div>
        {(tracks.length > 0) && <div className="text-white text-2xl pb-1">All Tracks</div>}
        {(tracks.length < 1) && <div className="text-white text-2xl pb-1">No Tracks Available</div>}
        <div className="pr-10">
            {tracks && tracks.map(item => <Track key={item._id} id={item._id} name={item.name} artistName={item.artistName} artistId={item.artistId} albumId={item.albumId} dispatch={props.dispatch} user={props.user} />)}
        </div>
        </>
    );
}