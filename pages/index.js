import Head from 'next/head'
import Home from '../components/home'
import Login from '../components/login'
import clientPromise from '../lib/mongodb'
export default function Index({ isConnected }) {
  return (
    <div>
      <Head>
        <title>Media Player App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*TODO: alternate between Login and Home depending on whether user is logged in or not*/}
      <Login/>
      <Home/>
    </div>
  )
}
export async function getServerSideProps(context) {
  let isConnected;
  try {
    const client = await clientPromise
    isConnected = true;
  } catch(e) {
    console.log(e);
    isConnected = false;
  }

  return {
    props: { isConnected },
  }
}