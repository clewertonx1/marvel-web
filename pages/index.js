
import {useState, useEffect, useRef}from 'react'
import getData from '../service/api'
import LoadingCard from '../components/loandig'
import Card from '../components/card'


export default function Home() {

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
      loadMoreData()
      setDataState()
    }
  },[schrollRadio])

  function loadMoreData(){
    setOffset(offset + 20)
  }

  return (
    <div className={'main'}>
      <div class={'cards'}>
        {data.map((data, index) => (
          <Card data={data}/>
        ))}
      </div>  
    {showLoadign ?
      <div class={'cards'}>
        {Array(5).fill().map((d, i) => (
          <LoadingCard></LoadingCard>
        ))}
      </div>
      :
      null
      }
         
      <div ref={schrollObserve}></div>    
    </div>
  )
}
