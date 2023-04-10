import { UserModel } from "@/models/UserModel"
import { GetStaticProps } from "next"
import Link from "next/link"

export const getStaticProps: GetStaticProps =async () => {
  const response = await fetch('http://localhost:3004/users')
  const data:UserModel[] = await response.json()
  console.log('Gen/ReGen')
  return{
    props:{users : data},
    revalidate: 10,
  }
}
export default function Alluser({users}:{users:UserModel[]}) {
  return (
    <>
      <h1>All Users</h1>
      {users.map((user:UserModel) =>(
        <div key={user.id}>
          <Link href={`users/${user.id}`}>
          <h2>{user.firstName}</h2></Link>
        </div>
      ))
      }
    </>
  )
}


