import { useState } from 'react';
import ReactPlayer from 'react-player'
//Reference: https://www.npmjs.com/package/react-player
export default function AudioPlayer(props){
    const [playing, setPlaying] = useState(false);
    const [url, setUrl] = useState('/Audiobinger_Death_Note.mp3');
    /* 
    const [volume, setVolume] = useState(0);
    const [muted, setMuted] = useState(true);
    const togglePlayPause = () => {
        this.setPlaying((currentValue) => !currentValue );
    }
    const handleStop = () => {
        setUrl(null);
        setPlaying(false);
    }
    const handleVolumeChange = e => {
        this.setVolume(parseFloat(e.target.value));
    }
    const handleToggleMuted = () => {
        this.setMuted((currentValue) => !currentValue);
    }
    */
    return (
    <>
        <ReactPlayer url={url}
         playing={playing}
         controls={true}
         height='50px'
         width='100%'
         />
    </>
    );
}