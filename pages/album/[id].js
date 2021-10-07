import { useRouter } from 'next/router'
import useSWR from 'swr'
import Track from '../../components/track';
const fetcher = (url) => fetch(url).then((res) => res.json()).then(res => res.message);
export default function AlbumDetail(){
    const router = useRouter();
    const { id } = router.query;
    const album = useSWR(`/api/album/${id}`, fetcher);
    const artist = useSWR(album.data ? `/api/artist/${album.data.artistId}` : null, fetcher);
    const tracks = useSWR(`/api/tracks/albumId/${id}`, fetcher);
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
        <button onClick={() => router.back()}>Back</button>
        <div>Cover Art</div>
        <div>{album?.data?.name}</div>
        <div>{artist && artist?.data?.name}</div>
        <button>Play</button>
        <button>Like/Unlike</button>
        <div>Track List
            {tracks && tracks?.data?.map(item => <Track key={item._id} name={item.name} artistName={item.artistName}/>)}
        </div>
        </>
    );
}
