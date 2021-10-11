import useSWR from 'swr'
import Track from './track';
import Image from 'next/image';
const fetcher = (url) => fetch(url).then((res) => res.json()).then(res => res.message);
export default function AlbumDetail(props){
    const album = useSWR(`/api/album/${props.id}`, fetcher);
    const artist = useSWR(album.data ? `/api/artist/${album.data.artistId}` : null, fetcher);
    const tracks = useSWR(`/api/tracks/albumId/${props.id}`, fetcher);
    if (album.error) return <div>Failed to load Album</div>
    if (!album.data) return <div>Loading Album...</div>
    /* if(album.data) 
        console.log(album.data);
    if(artist.data) 
        console.log(artist.data);
    if(tracks.data) 
        console.log(tracks.data); */
    return (
        <>
        <button className="text-white text-xl pb-1" onClick={() => props.dispatch({type: 'home'})}>Back</button>
        <div className="flex-initial pt-2 pb-2 mr-4">
            <Image className="rounded-lg border-4 drop-shadow-lg" src="/mjbad.jpg" height="200" width="200" />
        </div>
        <div className="text-white text-3xl pb-1">{album?.data?.name}</div>
        <div className="text-white text-2xl pb-1">{artist && artist?.data?.name}</div>
        <button>Play</button>
        <button>Like/Unlike</button>
        <div>Track List
            {tracks && tracks?.data?.map(item => <Track key={item._id} id={item._id} name={item.name} artistName={item.artistName} dispatch={props.dispatch} />)}
        </div>
        </>
    );
}
