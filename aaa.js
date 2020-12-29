return (
  <div id={'main'}>
    {showLoadign ? 
      <div id={'cards'}>
        {Array( data.length + 20).fill().map((d, i) =>{
          return( 
            <div id={"card"}> 
              <MyLoader></MyLoader>
            </div>
        )})}
      </div>
    :
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
    </div>
    } 
    
    <div style={{width: 50, height: 50, background: "green"}}  ref={schrollObserve}>AAA</div>
    
  </div>
)