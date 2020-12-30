
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

  const [noMoreData, setNoMoreData] = useState(false)

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

  function nextPage(){
    setOffset(offset + 20)
  }
   const handleWithSchrollRadio = async () =>{
    if(schrollRadio > 0 && data != [] && noMoreData != true){
      
      setShowLoading(true)
      nextPage()
      let response = []
      const heroName = inputSearchValue
      if(heroName != ""){
        response = await serachHerosByName(offset, heroName)
        if(response = []){
          setNoMoreData(true)
        }
      }else{
        response = await searchHeros(offset, heroName)
      } 
      setData(data.concat(response))
      setShowLoading(false)
    }
  }

  useEffect(() => {
    handleWithSchrollRadio() 
  },[schrollRadio])

  const handleWithInputSearch = async () => {
    if(inputSearchValue != ""){
      setShowLoading(false)
      setOffset(0)
      const heroName = inputSearchValue
      const response = await serachHerosByName(offset, heroName)
      setData(response)
    }
  }

  useEffect(() => {
    handleWithInputSearch()
  },[inputSearchValue])

 

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
