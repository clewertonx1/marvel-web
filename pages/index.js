
import {useState, useEffect} from 'react'
import getData from '../service/api'
import Link from 'next/link'

export default function Home() {

  const NavBar = () =>{
    return(
      <div style={{display: "flex", alignItems: 'center', flexDirection: 'row', justifyContent:'center'}}>
        
        <button onClick={() => backPage()}>Back</button>
        <p style={{margin:10}}>{offset}</p>
        <button onClick={() => nextPage()}>Next</button>
        
      </div>
    )
  }

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


  const [data, setData] = useState([])

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    console.log("teste")
    async function setDataState(){
      setData(await getData(offset))
    }

    setDataState()

  },[offset])

  function nextPage(){
    setOffset(offset + 10)
  }

  function backPage(){
    if(offset === 0){
      return
    }
    setOffset(offset - 10)
  }


  return (
    <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center'}}>
    <NavBar></NavBar>
      {data.map((d, i) =>{
        return( 
          <div style={style.card}>
            <Link href={{ pathname: '/about', query: { id: d.id } }}>
              <img src={`${d.thumbnail.path}/portrait_fantastic.${d.thumbnail.extension}`}></img>
            </Link>
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
      <NavBar></NavBar>
    </div>
  )
}
