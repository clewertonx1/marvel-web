
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import getData from '../../service/api'
export default function Home() {

    const [data, setData] = useState([])
    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        
        console.log(id)
        async function setDataState(){
          setData(await getData(10, id))
    
        }
        
        setDataState()
        console.log("aaaa", data.title)
    
      },[])

    
    return (
        <div>
           
        </div>
    )
}
