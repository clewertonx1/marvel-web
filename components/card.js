import React from "react"
import Link from 'next/link'

const Card = ({data}) => (
    <div className={"card"}>   
        <img src={`${data.thumbnail.path}/standard_fantastic.${data.thumbnail.extension}`}></img>
        <div id={"descritpionDiv"}>
            <p id={"lastModified"}>{data.modified.substring(0, 10)}</p>
            <h1 id={"title"}>{data.name}</h1>
            {data.description ?
            <p id={"descriptionText"}>{data.description}</p>
            : 
            <p id={"descriptionText"}></p>
            }
            <Link href={{ pathname: '/about', query: { id: data.id } }}>
            <h2  id={"findMore"}>Find out more</h2>
            </Link>
        </div>    
    </div> 
)

export default Card