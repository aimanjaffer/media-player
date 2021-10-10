import Image from 'next/image'
export default function AlbumOverview(props){
    return (
        <div onClick={() => props.dispatch({type: 'album', payload: props.id})} className="group rounded-lg bg-gray-800 hover:bg-gray-700 hover:drop-shadow-lg text-white flex">
            <div className="flex-initial p-2 mr-4">
                <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="80" width="80" />
            </div>
            <div className="flex-grow flex-col">
                <div className="flex-none mt-2 mb-4 text-xl">{props.name}</div>
                <div className="flex-none">{props.artistName}</div>
            </div>
           
            
            <div className="flex-col items-stretch mr-4 mt-2">
                <div className="invisible mb-8 group-hover:visible group-hover:self-start">
                    <button>Play</button>
                </div>
                <div className="invisible group-hover:visible group-hover:self-end">
                    <button>Like</button>
                </div>
            </div>
        </div>
    );
}