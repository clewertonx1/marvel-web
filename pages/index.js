
import {useState, useEffect, useRef}from 'react'


import {searchHeros, serachHerosByName } from '../service/api'

import LoadingCard from '../components/loandig'
import Card from '../components/card'
import InputSearch from '../components/inputSearch'

export default function Home() {

  const [inputSearchValue, setInputSearchValue] = useState("")

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
    async function teste(){
      const response = await searchHeros(offset)
      return response
    }
    if(schrollRadio > 0 && data != []){
      setShowLoading(true)
     
      console.log( teste())
      nextPage()
    }
    
      
  
  },[schrollRadio])

  useEffect(() => {
    if(inputSearchValue != ""){
      setOffset(0)
      setShowLoading(true)
      const name = inputSearchValue
      const response = serachHerosByName(offset, name)
    }

  },[inputSearchValue])

  function nextPage(){
    setOffset(offset + 20)
  }

  return (
    <div className={'main'}>
      <InputSearch setInputSearchValue={setInputSearchValue} inputSearchValue={inputSearchValue}></InputSearch>
      <div className={'cards'}>
        {data.map((data, index) => (
          <Card data={data}/>
        ))}
      </div>  
    {showLoadign ?
      <div className={'cards'}>
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
