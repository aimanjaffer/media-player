import Image from 'next/image'
export default function GenreOverview(props){
    return (
        <div onClick={() => props.dispatch({type: 'genre', payload: props.id})} className="mb-4 mr-6 group rounded-lg bg-green-800 hover:bg-green-700 hover:drop-shadow-lg text-white flex">
        <div className="flex-initial p-2 mr-4">
            <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="80" width="80" />
        </div>
        <div className="flex-grow flex-col">
            <div className="flex-none mt-2 mb-4 text-xl">{props.name}</div>
        </div>
        </div>
    );
}