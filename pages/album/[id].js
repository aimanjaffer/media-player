import { useRouter } from 'next/router'
export default function AlbumDetail(){
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
        <button onClick={() => router.back()}>Back</button>
        <div>Cover Art</div>
        <div>Album Name</div>
        <div>Artist Name</div>
        <button>Play</button>
        <button>Like/Unlike</button>
        <div>Track List
            <Track/>
            <Track/>
            <Track/>
        </div>
        </>
    );
}