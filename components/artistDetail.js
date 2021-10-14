import Track from "./track";
import Image from 'next/image';
import useSWR from 'swr';
import AlbumOverview from './albumOverview';
import { useEffect, useState } from 'react';
const fetcher = (url) => fetch(url).then((res) => res.json()).then(res => res.message);
export default function ArtistDetail(props){
    const [trackIds, setTrackIds] = useState();
    const artist = useSWR(`/api/artist/${props.id}`, fetcher);
    const tracks = useSWR(`/api/tracks/artistId/${props.id}`, fetcher);
    const [albums, setAlbums] = useState([]);
    const [liked, setLiked] = useState();
    useEffect(()=>{
        if(props.userState && (props.userState.likedArtists?.filter(artist => artist._id === props.id).length > 0))
            setLiked(true);
    },[props.userState]);
    useEffect(()=>{
        fetch(`/api/tracks/artistId/${props.id}`)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                let ids = response.message.map(track => track._id);
                setTrackIds(ids);
            }
        });
        fetch(`/api/albums/artistId/${props.id}`)
        .then(response => response.json())
        .then(response => {
            if(response.success)
                setAlbums(response.message);
        });
    },[props.id]);
    const unlikeArtist = (e) => {
        e.stopPropagation();
        console.log("unlike artist button clicked");
        let body = {
            userId: props.user._id,
            artist: {
                name: artist?.data?.name,
                _id: props.id,
            }
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body)
        }
        fetch('/api/user/unlikeArtist', options)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                setLiked(false);
                let likedArtistsNew = props.userState.likedArtists.filter(item => item._id !== body.artist._id);
                //console.log(likedArtistsNew);
                props.userDispatch({type: 'setLikedArtists', payload: likedArtistsNew});
            }
                
        });
    };
    const likeArtist = (e) => {
        e.stopPropagation();
        console.log("like artist button clicked");
        let body = {
            userId: props.user._id,
            artist: {
                name: artist?.data?.name,
                _id: props.id,
            }
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body)
        }
        fetch('/api/user/likeArtist', options)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                setLiked(true);
                props.userDispatch({type: 'setLikedArtists', payload: [...props.userState.likedArtists, body.artist]});
            }
                
        });
    };
    const playArtist = (e) => {
        e.stopPropagation();
        console.log("play artist");
        let body = {
            userId: props.user._id,
            type: "artist",
            item: {
                name: artist?.data?.name,
                _id: props.id,
            }
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body)
        }
        fetch('/api/user/recentlyPlayed', options)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                fetch(`/api/user/${props.user._id}`)
                .then(response => response.json())
                .then(response => {
                    if(response.success)
                    props.userDispatch({type:'setRecentlyPlayed', payload: response.message.recentlyPlayed});
                });
            }
        });
        props.dispatch({type: 'playArtist', payload: {trackIds: trackIds, currentIndex: 0}});
    }
    return(
    <>
    <button className="text-white text-xl pb-1" onClick={() => props.dispatch({type: 'home'})}>Back</button>
    <div className="flex-initial p-2 mr-4">
            <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="200" width="200" />
    </div>
    <div className="text-white text-3xl pb-1">{artist?.data?.name}</div>
    <div className="text-white text-2xl pb-1">Artist Bio</div>
    <div className="flex flex-row justify-around">
            <div className="text-white text-xl pb-1">
                <button className="rounded-lg hover:bg-gray-700 p-2" onClick={playArtist}>Play Artist</button>
            </div>
            <div className="text-white text-xl pb-1">
                {!liked && <button className="rounded-lg hover:bg-gray-700 p-2" onClick={likeArtist}>Like Artist</button>}
                {liked && <button className="rounded-lg hover:bg-gray-700 p-2"onClick={unlikeArtist}>Unlike Artist</button>}
            </div>
    </div>
    {(albums.length > 0) && <div className="text-white text-2xl pb-1">All Albums</div>}
    {(albums.length < 1) && <div className="text-white text-2xl pb-1">No Albums Available</div>}
    <div className="pr-10">
        {albums && albums.map(item => <AlbumOverview key={item._id}
                                                        user={props.user}
                                                        id={item._id}
                                                        name={item.name}
                                                        artistName={item.artistName}
                                                        artistId={item.artistId}
                                                        dispatch={props.dispatch}
                                                        userState={props.userState}
                                                        userDispatch={props.userDispatch}/>)}
    </div>
    {(tracks?.data?.length > 0) && <div className="text-white text-2xl pb-1">All Discography</div>}
    {((tracks?.data?.length < 1)||(tracks.error)) && <div className="text-white text-2xl pb-1">No Tracks Available</div>}
        <div className="pr-10">
            {tracks && tracks?.data?.map(item => <Track key={item._id} 
                                                        id={item._id} 
                                                        name={item.name} 
                                                        artistName={item.artistName} 
                                                        artistId={props.id} 
                                                        albumId={item.albumId} 
                                                        dispatch={props.dispatch} 
                                                        user={props.user} 
                                                        userState={props.userState}
                                                        userDispatch={props.userDispatch}/>)}
        </div>
    </>
    );
}