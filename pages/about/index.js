
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

export default function Home() {

    const [data, setData] = useState([])
    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        
        console.log(id)
        async function setDataState(){
          console.log("aaaaa")
        }
        
        setDataState()
       
    
      },[])

    
    return (
        <div>
           <h1>In production</h1>
        </div>
    )
}
