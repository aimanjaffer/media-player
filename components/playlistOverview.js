import Image from 'next/image'
export default function PlaylistOverview(props){
    const playPlaylist = (e) => {
        e.stopPropagation();
        //console.log("play playlist");
        let body = {
            userId: props.user._id,
            type: "playlist",
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
        //TODO: get all tracks in the Playlist and send an array of trackIds via the reducer, playing an individual track will be the same but array will have only on trackId
        props.dispatch({type: 'playPlaylist', payload: props.id});
    }
    return (
        <div onClick={() => props.dispatch({type: 'playlist', payload: props.id})} className="group rounded-lg bg-green-800 hover:bg-green-700 hover:drop-shadow-lg text-white flex">
            <div className="flex-initial p-2 mr-4">
                <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="80" width="80" />
            </div>
            <div className="flex-grow flex-col">
                <div className="flex-none mt-2 mb-4 text-xl">{props.name}</div>
                {/**TODO: make dynamic */}
                <div className="flex-none">Created By</div>
            </div>
            <div className="flex-col items-stretch mr-4 mt-2">
                <div className="invisible mb-8 group-hover:visible group-hover:self-start">
                    <button onClick={playPlaylist}>Play</button>
                </div>
                {/*<div className="invisible group-hover:visible group-hover:self-end">
                    <button>Like</button>
                </div>*/}
            </div>
        </div>
    );
}