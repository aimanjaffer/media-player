export default function PlaylistDetail(props){
    return (
        <>
        <button onClick={() => props.dispatch({type: 'home'})}>Back</button>
        <div>Cover Art</div>
        <div>Playlist Name</div>
        <div>Created by</div>
        <button>Play</button>
        <button>Like/Unlike</button>
        <div>Track List</div>
        </>
    );
}