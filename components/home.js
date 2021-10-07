import AudioPlayer from "./audioPlayer";
import AlbumOverview from "./albumOverview";
import ArtistOverview from "./artistOverview";
import PlaylistOverview from "./playlistOverview";
import Track from "./track";
import Link from 'next/link';
import { useEffect, useState } from "react";
export default function Home(props){
    //suppose we have user coming as a prop
    const [user, setUser] = useState({});
    useEffect(() => {
        if(props.user.email){
            fetch(`/api/user/email/${props.user.email}`)
            .then(response => response.json())
            .then(response => {
                console.log("response from API handler: ", response.message);
                setUser(response.message);
            });
        }
    },[props.user]);
    return (
    <>
    <p>Home Component</p>
    <div>{/** Left Pane */}
        <Link href="/search"><button>Search</button></Link>
        <Link href="/explore"><button>Explore</button></Link>
        <button>Create Playlist</button>
    </div>
    <div>{/** Right Pane */}
    <div>Good Morning/Evening/Day/Night</div>{/** Dynamic based on time */}
            <div className="text-3xl">Recently Played</div>
            {/** Recenlty played items here */}
            <div className="text-3xl">Liked Albums</div>
            <div className="grid grid-cols-4 gap-4">
                {user && user?.likedAlbums?.map(item => <AlbumOverview key={item._id} id={item._id} name={item.name} artistName={item.artistName} />)}
            </div>
            <div className="text-3xl">Liked Songs</div>
            <div className="grid grid-cols-4 gap-4">
                {user && user?.likedSongs?.map(item => <Track key={item._id} id={item._id} name={item.name} artistName={item.artistName} />)}
            </div>
            <div className="text-3xl">Liked Artists</div>
            <div className="grid grid-cols-4 gap-4">
                {user && user?.likedArtists?.map(item => <ArtistOverview key={item._id} id={item._id} name={item.name}/>)}
            </div>
            <div className="text-3xl">Your Playlists</div>
            <div className="grid grid-cols-4 gap-4">
                {user && user?.playlists?.map(item => <PlaylistOverview key={item._id} id={item._id} name={item.name} />)}
            </div>
            <div className="text-3xl">Discover</div>
            <div className="grid grid-cols-4 gap-4">
                <AlbumOverview/>
                <AlbumOverview/>
                <AlbumOverview/>
            </div>
    </div>
    <div>
        <AudioPlayer/>
    </div>
    
    </>
    );
}