import AudioPlayer from "./audioPlayer";
import AlbumOverview from "./albumOverview";
import ArtistOverview from "./artistOverview";
import PlaylistOverview from "./playlistOverview";
import Track from "./track";
import Link from 'next/link';
export default function Home(props){
    const user = {
        _id: 1,
        name: "aiman jaffer",
        likedSongs: [{
            _id:1,
            name:"Summer of 69",
            url:"/song.mp3",
            artistName:"Bryan Adams",
            featuredArtists: [],
            album: "Best of Bryan Adams",
            genres: ["rock"]
        },{
            _id:2,
            name:"18 Till I Die",
            url:"/song.mp3",
            artistName:"Bryan Adams",
            featuredArtists: [],
            album: "Best of Bryan Adams",
            genres: ["rock"]
        },{
            _id:3,
            name:"Heaven",
            url:"/song.mp3",
            artistName:"Bryan Adams",
            featuredArtists: [],
            album: "Best of Bryan Adams",
            genres: ["rock"]
        }],
        likedArtists:[{
            _id:1,
            profilePhoto: "/photo.png",
            name: "Bryan Adams",
            bio: "XYZ",
            topTracks: [],
            albums: [],
            singles: []
        },{
            _id:2,
            profilePhoto: "/photo.png",
            name: "Michael Jackson",
            bio: "XYZ",
            topTracks: [],
            albums: [],
            singles: []
        },{
            _id:3,
            profilePhoto: "/photo.png",
            name: "Elvis Presley",
            bio: "XYZ",
            topTracks: [],
            albums: [],
            singles: []
        }],
        likedAlbums: [{
            _id:1,
            name: "Album 1",
            releaseDate: "21/01/1997",
            artistId: 1,
            artistName: "ABC",
            featuredArtists: [],
            tracks: [],
            genres: ["pop","rock"] 
        },{
            _id:2,
            name: "Album 2",
            releaseDate: "21/01/1997",
            artistId: 1,
            artistName: "DEF",
            featuredArtists: [],
            tracks: [],
            genres: ["hip-hop"] 
        },{
            _id:3,
            name: "Album 3",
            releaseDate: "21/01/1997",
            artistId: 1,
            artistName: "GHI",
            featuredArtists: [],
            tracks: [],
            genres: ["punk","metal"] 
        }],
        playlists: [{
            _id: 1,
            coverArt: "/image.png",
            name: "Playlist 1",
            createdBy: 1,
            featuredArtists: [],
            featuredAlbums: [],
            tracks: [],
            genres: ["rock", "punk"]
        },{
            _id: 2,
            coverArt: "/image.png",
            name: "Playlist 2",
            createdBy: 1,
            featuredArtists: [],
            featuredAlbums: [],
            tracks: [],
            genres: ["metal"]
        },{
            _id: 3,
            coverArt: "/image.png",
            name: "Playlist 3",
            createdBy: 1,
            featuredArtists: [],
            featuredAlbums: [],
            tracks: [],
            genres: ["k-pop"]
        }],
        currentlyPlaying: "xyz song",
        recentlyPlayed: []
    };
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
                {user.likedAlbums.map(item => <AlbumOverview key={item._id} name={item.name} artistName={item.artistName} />)}
            </div>
            <div className="text-3xl">Liked Songs</div>
            <div className="grid grid-cols-4 gap-4">
                {user.likedSongs.map(item => <Track key={item._id} name={item.name} artistName={item.artistName} />)}
            </div>
            <div className="text-3xl">Liked Artists</div>
            <div className="grid grid-cols-4 gap-4">
                {user.likedArtists.map(item => <ArtistOverview key={item._id} name={item.name}/>)}
            </div>
            <div className="text-3xl">Your Playlists</div>
            <div className="grid grid-cols-4 gap-4">
            {user.playlists.map(item => <PlaylistOverview key={item._id} name={item.name} />)}
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