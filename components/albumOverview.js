import Image from 'next/image'
import { useEffect, useState } from 'react';
export default function AlbumOverview(props){
    const [trackIds, setTrackIds] = useState();
    const [liked, setLiked] = useState();
    useEffect(()=>{
        if(props.userState && (props.userState?.likedAlbums?.filter(album => album._id === props.id).length > 0))
            setLiked(true);
    },[props.userState]);
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
    const unlikeAlbum = (e) => {
        e.stopPropagation();
        console.log("unlike album button clicked");
        let body = {
            userId: props.user._id,
            album: {
                name: props.name,
                artistName: props.artistName,
                _id: props.id,
                artistId: props.artistId
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
                name: props.name,
                artistName: props.artistName,
                _id: props.id,
                artistId: props.artistId
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
                name: props.name,
                artistName: props.artistName,
                _id: props.id,
                artistId: props.artistId
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
    return (
        <div onClick={() => props.dispatch({type: 'album', payload: props.id})} className="cursor-pointer group rounded-lg bg-gray-800 hover:bg-gray-700 hover:drop-shadow-lg text-white flex mb-2">
            <div className="flex-initial p-2 mr-4">
                <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="80" width="80" />
            </div>
            <div className="flex-grow flex-col">
                <div className="flex-none mt-2 mb-4 text-xl">{props.name}</div>
                <div className="flex-none">{props.artistName}</div>
            </div>
            <div className="flex-col items-stretch mr-4 mt-2">
                <div className="invisible mb-8 group-hover:visible group-hover:self-start">
                    <button className="rounded-lg hover:bg-gray-800 p-1" onClick={playAlbum}>Play</button>
                </div>
                <div className="invisible group-hover:visible group-hover:self-end">
                {!liked && <button className="rounded-lg hover:bg-gray-800 p-1" onClick={likeAlbum}>Like</button>}
                {liked && <button className="rounded-lg hover:bg-gray-800 p-1" onClick={unlikeAlbum}>Unlike</button>}
                </div>
            </div>
        </div>
    );
}