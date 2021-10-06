import { useRouter } from 'next/router'
export default function PlaylistDetail(){
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
        <button onClick={() => router.back()}>Back</button>
        <div>Cover Art</div>
        <div>Playlist Name</div>
        <div>Created by</div>
        <button>Play</button>
        <button>Like/Unlike</button>
        <div>Track List</div>
        </>
    );
}