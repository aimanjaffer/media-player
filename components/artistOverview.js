import Image from 'next/image'
export default function ArtistOverview(props){
    return (
        <div className="group rounded-lg bg-green-800 hover:bg-green-700 hover:drop-shadow-lg text-white flex">
            <div className="flex-initial p-2 mr-4">
                <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="80" width="80" />
            </div>
            <div className="flex-grow flex-col">
                <div className="flex-none mt-2 mb-4 text-xl">{props.name}</div>
            </div>
            {/**Show on hover */}
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