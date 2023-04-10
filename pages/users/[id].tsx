import { GetStaticPaths, GetStaticProps } from "next"
import { UserModel } from "@/models/UserModel"
import { useRef } from "react";
import { useRouter } from "next/router";
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`http://localhost:3004/users`);
    const data:UserModel[] = await response.json()
  
    // const paths = data.map((user: UserModel) => ({
    //   params: { id: user.id.toString() },
    // }));
    const paths = [
        { params: { id: '1' } },
        { params: { id: '2' } },
        { params: { id: '3' } },
    ]
    //console.log(paths)
    return { paths, fallback: 'blocking' };
  };
  
export const getStaticProps: GetStaticProps =async (contex) => {
    const {params} =contex
    if (params){
    const response = await fetch(`http://localhost:3004/users/${params.id}`)
    const data:UserModel = await response.json()
    // console.log({data})
        return{
            props:{user : data},
            revalidate: 10,
        }
    }
    return {
        props: { error: true },
        
    };
}

export default function User({user}:{user:UserModel}) {
    // console.log({user})
    const router = useRouter()
    if (router.isFallback){
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <p>{user.id} {user.firstName} {user.lastName}</p>
        </div>
    )
}