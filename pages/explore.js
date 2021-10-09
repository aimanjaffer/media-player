import GenreOverview from "../components/genreOverview";
import { useRouter } from 'next/router'
import Login from '../components/login'
import { getSession, useSession } from "next-auth/client"
export default function Explore(props){
    const router = useRouter();
    const [session] = useSession();
    if(!session)
        return <Login/>;
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
export async function getServerSideProps(context){
    const session = await getSession(context);
    return {
      props:{
        session,
      },
    };
  }