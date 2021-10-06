import { useRouter } from 'next/router'
export default function Search(props){
    const router = useRouter();
    return (
    <>
    <p>Search Component</p>
    <button onClick={() => router.back()}>Back</button>
    </>
    );
}