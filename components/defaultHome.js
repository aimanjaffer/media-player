import AlbumOverview from "./albumOverview";
import { signOut } from "next-auth/client";
import ArtistOverview from "./artistOverview";
import PlaylistOverview from "./playlistOverview";
import Track from "./track";
export default function DefaultHome(props){
    return (<>
            <div className="absolute top-5 right-5">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={signOut}>Sign out</button>
            </div>
            <div className="text-white text-5xl pb-5">Hey {props.user.name}</div>
            <div className="text-white text-3xl pb-1">Recently Played</div>
            {/** TODO:Recenlty played items here */}
            <div className="grid grid-cols-4 gap-4 pb-5">
                {props.user && props.user?.likedAlbums?.map(item => <AlbumOverview key={item._id} id={item._id} name={item.name} artistName={item.artistName} dispatch={props.dispatch}/>)}
            </div>
            <div className="text-white text-3xl pb-1">Liked Albums</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {props.user && props.user?.likedAlbums?.map(item => <AlbumOverview key={item._id} id={item._id} name={item.name} artistName={item.artistName} dispatch={props.dispatch}/>)}
            </div>
            <div className="text-white text-3xl pb-1">Liked Songs</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {props.user && props.user?.likedSongs?.map(item => <Track key={item._id} id={item._id} name={item.name} artistName={item.artistName} dispatch={props.dispatch}/>)}
            </div>
            <div className="text-white text-3xl pb-1">Liked Artists</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {props.user && props.user?.likedArtists?.map(item => <ArtistOverview key={item._id} id={item._id} name={item.name} dispatch={props.dispatch}/>)}
            </div>
            <div className="text-white text-3xl">Your Playlists</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {props.user && props.user?.playlists?.map(item => <PlaylistOverview key={item._id} id={item._id} name={item.name} dispatch={props.dispatch}/>)}
            </div>
            <div className="text-white text-3xl pb-1">Discover</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                <AlbumOverview/>
                <AlbumOverview/>
                <AlbumOverview/>
            </div>
            </>);
}