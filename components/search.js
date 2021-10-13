import Login from '../components/login';
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import AlbumOverview from "./albumOverview";
import ArtistOverview from "./artistOverview";
import PlaylistOverview from "./playlistOverview";
import Track from "./track";
export default function Search(props){
    const [session] = useSession();
    const { register } = useForm();
    const [searchResults, setSearchResults] = useState([]);
    if(!session)
        return <Login/>;
    const onChangeHandler = (e) => {
        if(e.target.value){
            fetch(`/api/search/${e.target.value}`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if(response.success)
                    setSearchResults(response.message);
            });
        }else{
            setSearchResults([]);
        }
    }
    const debouncedChangeHandler = useCallback(debounce(onChangeHandler, 300), []);
    return (
    <>
    <button className="text-white text-xl pb-1" onClick={() => props.dispatch({type: 'home'})}>Back</button>
    <p className="text-white text-3xl pb-2">Search</p>
    <form>
        <input className="mr-4 w-4/12 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         placeholder="Search for an Artist, Album, Song, Playlist"
         type="text"
         {...register("searchQuery", { onChange: debouncedChangeHandler })}/>
    </form>
    {(searchResults.length > 0) && searchResults.map(item => {
        if(item.type === 'album')
            return <AlbumOverview key={item._id} user={props.user} id={item._id} name={item.name} artistName={item.artistName} artistId={item.artistId} dispatch={props.dispatch}/>
        if(item.type === 'track')
            return <Track key={item._id} user={props.user} id={item._id} name={item.name} artistName={item.artistName} artistId={item.artistId} albumId={item.albumId} dispatch={props.dispatch}/>
        if(item.type === 'artist')
            return <ArtistOverview key={item._id} user={props.user} id={item._id} name={item.name} dispatch={props.dispatch}/>
        if(item.type === 'playlist')
            return <PlaylistOverview key={item._id} user={props.user} id={item._id} name={item.name} dispatch={props.dispatch}/>
    })}
    </>
    );
}