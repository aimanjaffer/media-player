import Image from 'next/image'
export default function Track(props){
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
        .then(console.log);
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
        props.dispatch({type: 'playTrack', payload: props.id});
    }
    return (
        <div onClick={playTrack} className="cursor-pointer group rounded-lg bg-blue-800 hover:bg-blue-700 hover:drop-shadow-lg text-white flex mb-2">
            <div className="flex-initial p-2 mr-4">
                <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="80" width="80" />
            </div>
            <div className="flex-grow flex-col">
                <div className="flex-none mt-2 mb-4 text-xl">{props.name}</div>
                <div>Album Name</div>
                <div>{props.artistName}</div>
            </div>
            <div className="flex-col items-stretch mr-4 mt-2">
                <div className="invisible group-hover:visible group-hover:self-end">
                    <button onClick={likeTrack}>Like</button>
                </div>
            </div>
            
        </div>
    );
}