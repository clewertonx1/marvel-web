
import {useState, useEffect, useRef}from 'react'
import getData from '../service/api'
import Link from 'next/link'
import MyLoader from './components/loandig'



export default function Home() {

  const NavBar = () =>{
    return(
      <div onClick={() => nextPage()} id={"navbar"}>
          <h1 id={'icon'}>More heros +</h1>
      </div>
    )
  }

  const [showLoadign, setShowLoading] = useState(false)

  const [data, setData] = useState([])

  const [offset, setOffset] = useState(0)

  const [schrollRadio, setSchrollRadio] = useState(null)

  const schrollObserve = useRef()

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries => {
      const radio = entries[0].intersectionRatio
      setSchrollRadio(radio)
    }))

    intersectionObserver.observe(schrollObserve.current)
    
    return () => {
      intersectionObserver.disconnect()
    }
  },[])
  

 

  useEffect(() => {
    async function setDataState(){
      let response = await getData(offset)
      setData(data.concat(response))
      setShowLoading(false)
    }

    if(schrollRadio > 0 && data !== []){
      setShowLoading(true)
      nextPage()
      setDataState()
    }
  },[schrollRadio])

  function nextPage(){
    setOffset(offset + 20)
  }



  return (
    <div id={'main'}>
        <div id={'cards'}>
          {data.map((d, i) =>{
            return( 
                <div id={"card"}>   
                  <img src={`${d.thumbnail.path}/standard_fantastic.${d.thumbnail.extension}`}></img>
                  <div id={"descritpionDiv"}>
                    <p id={"lastModified"}>{d.modified.substring(0, 10)}</p>
                    <h1 id={"title"}>{d.name}</h1>
                    {d.description ?
                      <p id={"descriptionText"}>{d.description}</p>
                    : 
                      <p id={"descriptionText"}></p>
                    }
                    <Link href={{ pathname: '/about', query: { id: d.id } }}>
                      <h2  id={"findMore"}>Find out more</h2>
                    </Link>
                  </div>    
                </div> 
            )})}
            {showLoadign ?
               <div id={'cards'}>
                {Array(5).fill().map((d, i) =>{
                  return( 
                    <div id={"card"}> 
                      <MyLoader></MyLoader>
                    </div>
                )})}
             </div>
             :
              <></>
            }
      </div>
       
      
      <div ref={schrollObserve}>AAA</div>
      
    </div>
  )
}
