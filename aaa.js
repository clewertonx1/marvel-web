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