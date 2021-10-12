import Image from 'next/image'
export default function ArtistOverview(props){
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
        .then(console.log);
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
        //TODO: get all tracks by the Artist and send an object containing array of trackIds and index to play from via the reducer
        props.dispatch({type: 'playArtist', payload: props.id});
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
                    <button onClick={playArtist}>Play</button>
                </div>
                <div className="invisible group-hover:visible group-hover:self-end">
                    <button onClick={likeArtist}>Like</button>
                </div>
            </div>
        </div>
    );
}