import Head from 'next/head'
import Home from '../components/home'
import Login from '../components/login'
import { getSession, useSession } from "next-auth/client"
export default function Index() {
  const [session] = useSession();
  if(!session)
    return <Login/>;
  return (
    <div>
      <Head>
        <title>Media Player App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home user={session.user}/>
    </div>
  )
}
export async function getServerSideProps(context){
  const session = await getSession(context);
  return {
    props:{
      session,
    },
  };
}