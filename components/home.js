import AudioPlayer from "./audioPlayer";
import AlbumOverview from "./albumOverview";
import ArtistOverview from "./artistOverview";
import PlaylistOverview from "./playlistOverview";
import Track from "./track";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { signOut } from "next-auth/client";
export default function Home(props){
    const [user, setUser] = useState({});
    useEffect(() => {
        if(props.user.email){
            fetch(`/api/user/email/${props.user.email}`)
            .then(response => response.json())
            .then(response => {
                if(response.message)
                    setUser(response.message);
                else{
                    let body = {
                        email: props.user.email,
                        name: props.user.name
                    }
                    let options = {
                        method: 'POST',
                        body: JSON.stringify(body)
                    };
                    fetch('/api/user/email/', options)
                    .then(response => response.json())
                    .then(response => {
                        fetch(`/api/user/${response.message.insertedId}`)
                        .then(response => response.json())
                        .then(response => {
                            if(response.message)
                                setUser(response.message);
                        });
                    });
                }
            });
        }
    },[props.user]);
    return (
    <div className="grid grid-cols-10 h-full">
    <div className="bg-gray-800 col-span-1 text-white">
        <div className="flex flex-col gap-5">
        <Link href="/search"><button className="rounded-lg hover:bg-green-900">Search</button></Link>
        <Link href="/explore"><button className="rounded-lg hover:bg-green-900">Explore</button></Link>
        <button className="rounded-lg hover:bg-green-900">Create Playlist</button>
        </div>
    </div>
    <div className="col-span-9 bg-gray-900 pl-5">
    <div className="absolute top-5 right-5">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={signOut}>Sign out</button>
    </div>
    <div className="text-white text-5xl pb-5">Hey {user.name}</div>
            <div className="text-white text-3xl pb-1">Recently Played</div>
            {/** TODO:Recenlty played items here */}
            <div className="grid grid-cols-4 gap-4 pb-5">
                {user && user?.likedAlbums?.map(item => <AlbumOverview key={item._id} id={item._id} name={item.name} artistName={item.artistName} />)}
            </div>
            <div className="text-white text-3xl pb-1">Liked Albums</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {user && user?.likedAlbums?.map(item => <AlbumOverview key={item._id} id={item._id} name={item.name} artistName={item.artistName} />)}
            </div>
            <div className="text-white text-3xl pb-1">Liked Songs</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {user && user?.likedSongs?.map(item => <Track key={item._id} id={item._id} name={item.name} artistName={item.artistName} />)}
            </div>
            <div className="text-white text-3xl pb-1">Liked Artists</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {user && user?.likedArtists?.map(item => <ArtistOverview key={item._id} id={item._id} name={item.name}/>)}
            </div>
            <div className="text-white text-3xl">Your Playlists</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {user && user?.playlists?.map(item => <PlaylistOverview key={item._id} id={item._id} name={item.name} />)}
            </div>
            <div className="text-white text-3xl pb-1">Discover</div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                <AlbumOverview/>
                <AlbumOverview/>
                <AlbumOverview/>
            </div>
    </div>
    <div className="absolute inset-x-10 bottom-10">
        <AudioPlayer/>
    </div>
    </div>
    );
}