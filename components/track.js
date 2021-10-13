import Image from 'next/image'
import {useState, useEffect} from 'react';
export default function Track(props){
    const [liked, setLiked] = useState();
    const [albumName, setAlbumName] = useState();
    useEffect(()=>{
        if(props.albumId){
            fetch(`/api/album/${props.albumId}`)
            .then(response => response.json())
            .then(response => {
                if(response.success && response.message){
                    setAlbumName(response.message.name);
                }
            })
        }
    },[props.albumId])
    useEffect(()=>{
        if(props.user && (props.user?.likedSongs?.filter(song => song._id === props.id).length > 0))
            setLiked(true);
    },[props.user]);
    
    const unlikeTrack = (e) => {
        e.stopPropagation();
        console.log("unlike track button clicked");
        let body = {
            userId: props.user._id,
            track: {
                name: props.name,
                artistName: props.artistName,
                _id: props.id,
                artistId: props.artistId,
                albumId: props.albumId
            }
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body)
        }
        fetch('/api/user/unlikeTrack', options)
        .then(response => response.json())
        .then(response => {
            if(response.success)
                setLiked(false);
        });
    }

    const likeTrack = (e) => {
        e.stopPropagation();
        console.log("like track button clicked");
        let body = {
            userId: props.user._id,
            track: {
                name: props.name,
                artistName: props.artistName,
                _id: props.id,
                artistId: props.artistId,
                albumId: props.albumId
            }
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body)
        }
        fetch('/api/user/likeTrack', options)
        .then(response => response.json())
        .then(response => {
            if(response.success)
                setLiked(true);
        });
    }

    const playTrack = (e) => {
        console.log("play track");
        let body = {
            userId: props.user._id,
            type: "track",
            item: {
                name: props.name,
                artistName: props.artistName,
                _id: props.id,
                artistId: props.artistId,
                albumId: props.albumId
            }
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body)
        }
        fetch('/api/user/recentlyPlayed', options)
        .then(response => response.json())
        .then(console.log);
        props.dispatch({type: 'playTrack', payload: {trackIds: [props.id], currentIndex: 0}});
    }
    return (
        <div onClick={playTrack} className="cursor-pointer group rounded-lg bg-blue-800 hover:bg-blue-700 hover:drop-shadow-lg text-white flex mb-2">
            <div className="flex-initial p-2 mr-4">
                <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="80" width="80" />
            </div>
            <div className="flex-grow flex-col">
                <div className="flex-none mt-2 mb-4 text-xl">{props.name}</div>
                <div>{albumName}</div>
                <div>{props.artistName}</div>
            </div>
            <div className="flex-col items-stretch mr-4 mt-2">
                <div className="invisible group-hover:visible group-hover:self-end">
                    {!liked && <button className="rounded-lg hover:bg-blue-800 p-1" onClick={likeTrack}>Like</button>}
                    {liked && <button className="rounded-lg hover:bg-blue-800 p-1" onClick={unlikeTrack}>Unlike</button>}
                </div>
            </div>
            
        </div>
    );
}