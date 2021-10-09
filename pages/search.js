import { useRouter } from 'next/router'
import Login from '../components/login'
import { getSession, useSession } from "next-auth/client"
export default function Search(props){
    const router = useRouter();
    const [session] = useSession();
    if(!session)
        return <Login/>;
    return (
    <>
    <p>Search Component</p>
    <button onClick={() => router.back()}>Back</button>
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