import GenreOverview from "../components/genreOverview";
import Login from '../components/login'
import { useSession } from "next-auth/client"
import { useEffect, useState } from "react";
export default function Explore(props){
    const [session] = useSession();
    if(!session)
        return <Login/>;
    const [genres, setGenres] = useState();

    useEffect(()=>{
        fetch("api/genres")
        .then(response => response.json())
        .then(response => {
            if(response.success){
                setGenres(response.message);
            }
                
        });
    },[]);
    return (
    <>
        <button className="text-white text-xl pb-1" onClick={() => props.dispatch({type: 'home'})}>Back</button>
        <p className="text-white text-3xl pb-2">Explore</p>
        {genres && genres.map(genre => <GenreOverview key={genre._id} id={genre._id} name={genre.name} dispatch={props.dispatch} userState={props.userState} userDispatch={props.userDispatch}/> )}
    </>
    );
}