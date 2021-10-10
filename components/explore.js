import GenreOverview from "../components/genreOverview";
import Login from '../components/login'
import { useSession } from "next-auth/client"
export default function Explore(props){
    const [session] = useSession();
    if(!session)
        return <Login/>;
    return (
    <>
        <p>Explore Component</p>
        <button onClick={() => props.dispatch({type: 'home'})}>Back</button>
        <GenreOverview/>
        <GenreOverview/>
        <GenreOverview/>
    </>
    );
}