import Image from 'next/image'
export default function Track(props){
    const likeTrack = (e) => {
        e.stopPropagation();
        console.log("like track clicked");
    }
    return (
        <div onClick={() => props.dispatch({type: 'playTrack', payload: props.id})} className="cursor-pointer group rounded-lg bg-blue-800 hover:bg-blue-700 hover:drop-shadow-lg text-white flex mb-2">
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