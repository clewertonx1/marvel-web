import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import {useState, useEffect} from 'react'



import getData from '../service/api'


export default function Home() {

  const style = {

    card:{
      display: 'flex',
      padding: 10,
      width: "50%",
      height: "10%",
      backgroundColor: 'red',
      flexDirection: 'row',
      margin: 10,
      borderRadius: 20,
    },
    descriptionDiv:{
      margin: 10,
    },
    descriptionText:{
      fontSize: 15,
      color: 'white',
    },
    title:{
      fontSize: 20,
      color: 'white', 
    },
    lastModified:{
      alignSelf: 'flex-end',
      fontSize: 10,
      color: 'white', 
    }
  }

  console.log(style.main)
  const [data, setData] = useState([])

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    async function setDataState(){
      setData(await getData(0))
    }

    setDataState()

  },[offset])

  function nextPage(){
    console.log("teste")
  }

  function backPage(){
    
  }


  return (
    <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center'}}>
      <div style={{alignItems: 'center'}}>
        <button onClick={console.log("aaa")}>Back</button>
        <button onClick={console.log("next")}>Back</button>
        
      </div>
      {data.map((d, i) =>{
        return(
          <div style={style.card}>
            <img src={`${d.thumbnail.path}/portrait_fantastic.${d.thumbnail.extension}`}></img>
            <div style={style.descriptionDiv}>
              <h1 style={style.title}>{d.name}</h1>
              {d.description ?
                <h2 style={style.descriptionText}>{d.description}</h2>
              : 
                <h2 style={style.descriptionText} >No have description</h2>
              }
              <h3 style={style.lastModified}>Last modified: {d.modified.substring(0, 10)}</h3>
            </div>
          
          </div>
        )
       
      })}
      
    </div>
  )
}
