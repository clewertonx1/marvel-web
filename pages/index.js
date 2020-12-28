
import {useState, useEffect} from 'react'
import getData from '../service/api'
import Link from 'next/link'
import {HiOutlineArrowCircleDown} from 'react-icons/hi'
import { Button } from 'react-bootstrap';


export default function Home() {

  const NavBar = () =>{
    return(
      <div onClick={() => nextPage()} id={"navbar"}>
          <HiOutlineArrowCircleDown  id={'icon'}></HiOutlineArrowCircleDown>
      </div>
    )
  }

  const style = {
    main:{
      magin: 0,
      display: 'flex',
      flexDirection: "row",
      alignItems: 'center',
      backgroundColor: '#f71b39',
      overflow: 'auto',
      height: "100vh",
    },
    card:{
      padding: 10,
      display: 'block',
      widht: 520, 
      height: 520,
      backgroundColor: '#dedede',
      margin: 30,
      borderRadius: 10,
    },
    descriptionDiv:{
      margin: 20,
    },
    descriptionTextCard:{
      marginTop: 5,
      textAling: 'justify',
      textJustify: "auto",
      fontSize: 13,
      color: "#424242"
    },
    titleCard:{
      margin: 0,
      fontSize: 25,
      color: "#424242"
    },
    lastModifiedCard:{
      margin: 0,
      fontSize: 10,
      color: "#424242"
    },
    title:{
      marginBottom: 0,
      fontSize: 50,
      color: 'white',
    },
    subTitle:{
      marginTop: 0,
      fontSize: 30,
      color: 'white',
    }
  }


  const [data, setData] = useState([])

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    console.log("uma vez")
    async function setDataState(){
      let a = await getData(offset)
      setData(a)
    }
    setDataState()
  },[])
  useEffect(() => {
    console.log("offset")
    async function setDataState(){
      let a = await getData(offset)
      setData(data.concat(a))
    }
    setDataState()
  },[offset])

  function nextPage(){
    setOffset(offset + 20)
  }

  function backPage(){
    if(offset === 0){
      return
    }
    setOffset(offset - 20)
  }


  return (
    <div id={'main'}>
      <div id={'cards'}>
      {data.map((d, i) =>{
        return( 
          <div id={"card"}>
            
              <img src={`${d.thumbnail.path}/standard_fantastic.${d.thumbnail.extension}`}></img>
            
            <div id={"description"}>
              <p style={style.lastModifiedCard}>{d.modified.substring(0, 10)}</p>
              <h1 style={style.titleCard}>{d.name}</h1>
              {d.description ?
                <p style={style.descriptionTextCard}>{d.description}</p>
              : 
                <p style={style.descriptionTextCard} >No have description</p>
              }
              <Link href={{ pathname: '/about', query: { id: d.id } }}>
                <p style={{fontSize: 15,marginBottom: 0, color: '#f71b39'}}>Find out more</p>
              </Link>
            </div>
          </div>  
        ) 
      })}
      </div>
   
        <NavBar></NavBar>

    </div>
  )
}
