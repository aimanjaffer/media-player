import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
//Reference: https://www.npmjs.com/package/react-player
export default function AudioPlayer(props){
    
    const [tracks, setTracks] = useState([]);
    const [currentlyPlayingName, setCurrentlyPlayingName] = useState();
    const [currentlyPlayingUrl, setCurrentlyPlayingUrl] = useState();
    
    useEffect(() => {
        if(props.trackIds){
            let localTracks = [];
            let promises = [];
            for(let trackId of props.trackIds){
                promises.push(
                    fetch(`/api/track/${trackId}`)
                    .then(response => response.json())
                    .then(response => {
                        if(response.success){
                            localTracks = [...localTracks, response.message];
                        }
                    })
                );
            }
            Promise.all(promises).then(() => {
                localTracks.sort((a, b) => a.positionInAlbum - b.positionInAlbum);
                setTracks(localTracks)
            });
        }
    }, [props.trackIds]);

    useEffect(() => {
        setCurrentlyPlayingName(tracks[props.currentIndex]?.name);
        setCurrentlyPlayingUrl(tracks[props.currentIndex]?.url);
    }, [props.currentIndex, tracks]);
    
    return (
    <>
        <ReactPlayer url={currentlyPlayingUrl}
         playing={props.playing}
         controls={true}
         height='50px'
         width='100%'
         onPause={() => props.dispatch({type: 'pause'})}
         onPlay={() => props.dispatch({type: 'play'})}
         onEnded={() => props.dispatch({type: 'nextTrack', payload: (props.currentIndex + 1) % tracks.length })}
         />
         <div className="grid justify-center justify-items-stretch">
         <div className="bg-black rounded-lg flex flex-row flex-wrap justify-evenly z-10 gap-10 pl-2 pr-2">
             <div className="flex-item">
                <button className="text-white text-l rounded-lg hover:bg-gray-700 pl-2 pr-2" onClick={() => props.dispatch({type: 'previousTrack', payload: (props.currentIndex + tracks.length - 1) % tracks.length })}>
                Previous Track
                </button>
             </div>
            <div className="flex-item">
                {currentlyPlayingName && <p className="text-l text-white">Now Playing: {currentlyPlayingName}</p>}
            </div>
            <div className="flex-item">
                <button className="text-white text-l rounded-lg hover:bg-gray-700 pl-2 pr-2" onClick={() => props.dispatch({type: 'nextTrack', payload: (props.currentIndex + 1) % tracks.length })}>
                Next Track
                </button>
            </div>
         </div>
         </div>
         
    </>
    );
}