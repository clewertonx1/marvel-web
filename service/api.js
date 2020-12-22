
import axios from 'axios';
import gerarHash from './gerarHash'

async function getData(offset, id){
    const date = new Date()

    const ts = date.getTime()
    
    const publicApiKey = "0342104a3146a3c0b77a6dd670729167"
    const privateApiKey = "9ade4ea98edbd118237183e57324570312d3836f"

    const hash = await gerarHash(ts + privateApiKey + publicApiKey)
    
    console.log(id)
    var url = ''
    if(id){
        console.log("true")
        url = `http://gateway.marvel.com/v1/public/characters/${id}/comics?&ts=${ts}&apikey=${publicApiKey}&hash=${hash}&offset=${offset}&limit=20`
    }else{
        console.log("false")
        url = `http://gateway.marvel.com/v1/public/characters?&ts=${ts}&apikey=${publicApiKey}&hash=${hash}&offset=${offset}&limit=20`
    }
    
    
   
    const respose = await axios.get(url)
    .then(response =>{
        const data = response.data.data.results
        return data
    }).catch((err) =>{
        console.log(err)
    })

    return respose
}

export default getData