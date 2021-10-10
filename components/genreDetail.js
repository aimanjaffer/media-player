import Track from "./track";
export default function GenreDetail(props){
    return (
        <>
        <button className="text-white text-xl pb-1" onClick={() => props.dispatch({type: 'explore'})}>Back</button>
        <div className="text-white text-3xl pb-1">Genre Name</div>
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