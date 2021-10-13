import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function ArtistOverview(props){
    const [trackIds, setTrackIds] = useState();
    const [liked, setLiked] = useState();
    useEffect(()=>{
        if(props.user && (props.user?.likedArtists?.filter(artist => artist._id === props.id).length > 0))
            setLiked(true);
    },[props.user]);
    useEffect(()=>{
        fetch(`/api/tracks/artistId/${props.id}`)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                let ids = response.message.map(track => track._id);
                setTrackIds(ids);
            }
        })
    },[props.id]);
    const unlikeArtist = (e) => {
        e.stopPropagation();
        console.log("unlike artist button clicked");
        let body = {
            userId: props.user._id,
            artist: {
                name: props.name,
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
            if(response.success)
                setLiked(false);
        });
    };
    const likeArtist = (e) => {
        e.stopPropagation();
        console.log("like artist button clicked");
        let body = {
            userId: props.user._id,
            artist: {
                name: props.name,
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
            if(response.success)
                setLiked(true);
        });
    };
    const playArtist = (e) => {
        e.stopPropagation();
        console.log("play artist");
        let body = {
            userId: props.user._id,
            type: "artist",
            item: {
                name: props.name,
                _id: props.id,
            }
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body)
        }
        fetch('/api/user/recentlyPlayed', options)
        .then(response => response.json())
        .then(console.log);
        props.dispatch({type: 'playArtist', payload: {trackIds: trackIds, currentIndex: 0}});
    }
    return (
        <div onClick={() => props.dispatch({type: 'artist', payload: props.id})} className="group rounded-lg bg-green-800 hover:bg-green-700 hover:drop-shadow-lg text-white flex">
            <div className="flex-initial p-2 mr-4">
                <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="80" width="80" />
            </div>
            <div className="flex-grow flex-col">
                <div className="flex-none mt-2 mb-4 text-xl">{props.name}</div>
            </div>
            <div className="flex-col items-stretch mr-4 mt-2">
                <div className="invisible mb-8 group-hover:visible group-hover:self-start">
                    <button className="rounded-lg hover:bg-green-800 p-1" onClick={playArtist}>Play</button>
                </div>
                <div className="invisible group-hover:visible group-hover:self-end">
                    {!liked && <button className="rounded-lg hover:bg-green-800 p-1" onClick={likeArtist}>Like</button>}
                    {liked && <button className="rounded-lg hover:bg-green-800 p-1" onClick={unlikeArtist}>Unlike</button>}
                </div>
            </div>
        </div>
    );
}