import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
//Reference: https://www.npmjs.com/package/react-player
export default function AudioPlayer(props){
    
    const [url, setUrl] = useState('/song.mp3');
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    useEffect(() => {
        fetch(`/api/track/${props.trackId}`)
        .then(response => response.json())
        .then(response => {
            if(response.success){
                setUrl(response.message.url);
                setCurrentlyPlaying(response.message.name);
            }
        })
    },[props.trackId]);

    return (
    <>
        <ReactPlayer url={url}
         playing={props.playing}
         controls={true}
         height='50px'
         width='100%'
         onPause={() => props.dispatch({type: 'pause'})}
         onPlay={() => props.dispatch({type: 'play'})}
         />
         {currentlyPlaying && <div className="text-xl">Currently Playing: {currentlyPlaying}</div>}
    </>
    );
}