import { GetServerSideProps  } from "next"
import { NewsModel } from "@/models/NewModel";

  
export const getServerSideProps: GetServerSideProps =async (context) => {
    const {params} =context
    if(params){
    const url = `http://localhost:3004/news?category=${params.category}`
    // console.log(url)
    const response = await fetch(url)
    const data:NewsModel = await response.json()
    // console.log({data})
        return{
            props:{news : data},
            
        }
    }
    return {
        props: { error: true },
        
    };
}

export default function Categorynews({news}:{news:NewsModel[]}) {
    return (
        <div>
            {news.map((news:NewsModel) =>(
            <div key={news.id}>
            <h2>{news.title} {news.category}</h2>
            </div>
            ))}
        </div>
    )
}

