import useSWR from 'swr'
import Track from './track';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const fetcher = (url) => fetch(url).then((res) => res.json()).then(res => res.message);
export default function AlbumDetail(props){
    const [trackIds, setTrackIds] = useState();
    const [liked, setLiked] = useState();
    useEffect(()=>{
        fetch(`/api/tracks/albumId/${props.id}`)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                let ids = response.message.map(track => track._id);
                setTrackIds(ids);
            }
        })
    },[props.id]);
    useEffect(()=>{
        if(props.userState && (props.userState.likedAlbums?.filter(album => album._id === props.id).length > 0))
            setLiked(true);
    },[props.userState]);
    const album = useSWR(`/api/album/${props.id}`, fetcher);
    const artist = useSWR(album.data ? `/api/artist/${album.data.artistId}` : null, fetcher);
    const tracks = useSWR(`/api/tracks/albumId/${props.id}`, fetcher);
    const unlikeAlbum = (e) => {
        e.stopPropagation();
        console.log("unlike album button clicked");
        let body = {
            userId: props.user._id,
            album: {
                name: album?.data?.name,
                artistName: artist?.data?.name,
                _id: props.id,
                artistId: artist?.data?._id
            }
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body)
        }
        fetch('/api/user/unlikeAlbum', options)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                setLiked(false);
                let likedAlbumsNew = props.userState.likedAlbums.filter(item => item._id !== body.album._id);
                //console.log(likedAlbumsNew);
                props.userDispatch({type: 'setLikedAlbums', payload: likedAlbumsNew});
            }
                
        });
    };
    const likeAlbum = (e) => {
        e.stopPropagation();
        console.log("like album button clicked");
        let body = {
            userId: props.user._id,
            album: {
                name: album?.data?.name,
                artistName: artist?.data?.name,
                _id: props.id,
                artistId: artist?.data?._id
            }
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body)
        }
        fetch('/api/user/likeAlbum', options)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                setLiked(true);
                props.userDispatch({type: 'setLikedAlbums', payload: [...props.userState.likedAlbums, body.album]});
            }
                
        });
    };
    const playAlbum = (e) => {
        e.stopPropagation();
        console.log("play album");
        let body = {
            userId: props.user._id,
            type: "album",
            item: {
                name: album?.data?.name,
                artistName: artist?.data?.name,
                _id: props.id,
                artistId: artist?.data?._id
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
        props.dispatch({type: 'playAlbum', payload: {trackIds: trackIds, currentIndex: 0}});
    }
    if (album.error) return <div>Failed to load Album</div>
    if (!album.data) return <div>Loading Album...</div>
    return (
        <>
        <button className="text-white text-xl pb-1" onClick={() => props.dispatch({type: 'home'})}>Back</button>
        <div className="flex-initial pt-2 pb-2 mr-4">
            <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="200" width="200" />
        </div>
        <div className="text-white text-3xl pb-1">{album?.data?.name}</div>
        <div className="text-white text-2xl pb-1">{artist && artist?.data?.name}</div>
        <div className="flex flex-row justify-around">
            <div className="text-white text-xl pb-1">
                <button className="rounded-lg hover:bg-gray-700 p-2" onClick={playAlbum}>Play Album</button>
            </div>
            <div className="text-white text-xl pb-1">
                {!liked && <button className="rounded-lg hover:bg-gray-700 p-2" onClick={likeAlbum}>Like Album</button>}
                {liked && <button className="rounded-lg hover:bg-gray-700 p-2"onClick={unlikeAlbum}>Unlike Album</button>}
            </div>
        </div>
        
        {(tracks?.data?.length > 0) && <div className="text-white text-2xl pb-1">Track List</div>}
        {((tracks?.data?.length < 1)||(tracks.error)) && <div className="text-white text-2xl pb-1">No Tracks Available</div>}
        <div className="pr-10">
            {tracks && tracks?.data?.map(item => <Track key={item._id} 
                                                        id={item._id} 
                                                        name={item.name} 
                                                        artistName={item.artistName} 
                                                        artistId={album.data.artistId} 
                                                        albumId={props.id} 
                                                        dispatch={props.dispatch} 
                                                        user={props.user} 
                                                        userState={props.userState} 
                                                        userDispatch={props.userDispatch}
                                                        />)}
        </div>
        </>
    );
}
