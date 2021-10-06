import GenreOverview from "../components/genreOverview";
import { useRouter } from 'next/router'
export default function Explore(props){
    const router = useRouter();
    return (
    <>
        <p>Explore Component</p>
        <button onClick={() => router.back()}>Back</button>
        <GenreOverview/>
        <GenreOverview/>
        <GenreOverview/>
    </>
    );
}