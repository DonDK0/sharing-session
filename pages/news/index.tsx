import { NewsModel } from "@/models/NewModel"
import { GetServerSideProps } from "next"
import Link from "next/link"
export const getServerSideProps: GetServerSideProps =async () => {
    const response = await fetch(`http://localhost:3004/news`)
    const data:NewsModel[] = await response.json()
    return {
        props:{news:data}
    }
    
}
export default function Allnews({news}:{news:NewsModel[]}) {
    
    return (
    <div>
      <h1>All Users</h1>
      {news.map((news:NewsModel) =>(
        <div key={news.id}>
          <h2>{news.title} {news.category}</h2>
        </div>
      ))
      }
    </div>
  )
}
