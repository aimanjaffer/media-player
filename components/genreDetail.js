import Track from "./track";
export default function GenreDetail(props){
    return (
        <>
        <button onClick={() => dispatch({type: 'home'})}>Back</button>
        <div>Genre Name</div>
        <div>Playlists</div>
        <div>Albums</div>
        <div>Top Tracks
            <Track/>
            <Track/>
            <Track/>
        </div>
        </>
    );
}