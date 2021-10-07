import Head from 'next/head'
import Home from '../components/home'
import Login from '../components/login'
export default function Index({ isConnected }) {
  let user = {
    email: "abc@xyz.com"
  }
  return (
    <div>
      <Head>
        <title>Media Player App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*TODO: alternate between Login and Home depending on whether user is logged in or not*/}
      <Login/>
      <Home user={user}/>
    </div>
  )
}
