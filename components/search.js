import Login from '../components/login'
import { useSession } from "next-auth/client"
export default function Search(props){
    const [session] = useSession();
    if(!session)
        return <Login/>;
    return (
    <>
    <p>Search Component</p>
    <button onClick={() => props.dispatch({type: 'home'})}>Back</button>
    </>
    );
}