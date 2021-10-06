import { useRouter } from 'next/router'
export default function ArtistDetail(){
    const router = useRouter();
    const { id } = router.query;
    return(
    <>
    <button onClick={() => router.back()}>Back</button>
    <div>Profile Photo</div>
    <div>Artist Name</div>
    <div>Bio</div>
    <div>Popular tracks
        <Track/>
        <Track/>
        <Track/>
    </div>
    <button>Play</button>
    <button>Like</button>
    <div>All Discography</div>
    </>
    );
}