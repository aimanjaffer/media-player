import Track from "./track";
import Image from 'next/image';
export default function ArtistDetail(props){
    return(
    <>
    <button onClick={() => props.dispatch({type: 'home'})}>Back</button>
    <div className="flex-initial p-2 mr-4">
            <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="200" width="200" />
    </div>
    <div>Artist Name</div>
    <div>Bio</div>
    <div>Popular tracks
        <Track/>
        <Track/>
        <Track/>
    </div>
    <button>Play</button>
    <button>Like</button>
    <div>All Discography</div>
    </>
    );
}