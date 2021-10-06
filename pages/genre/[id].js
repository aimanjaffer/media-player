import { useRouter } from 'next/router'
export default function GenreDetail(){
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
        <button onClick={() => router.back()}>Back</button>
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