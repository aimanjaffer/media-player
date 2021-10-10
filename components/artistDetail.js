import Track from "./track";
export default function ArtistDetail(props){
    return(
    <>
    <button onClick={() => props.dispatch({type: 'home'})}>Back</button>
    <div>Profile Photo</div>
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