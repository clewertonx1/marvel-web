
import axios from 'axios';
import gerarHash from './gerarHash'

const date = new Date()
const ts = date.getTime()
const publicApiKey = "0342104a3146a3c0b77a6dd670729167"
const privateApiKey = "9ade4ea98edbd118237183e57324570312d3836f"
const hash =  gerarHash(ts + privateApiKey + publicApiKey)

const searchHeros = async (offset) => {
    const url = `https://gateway.marvel.com/v1/public/characters?&ts=${ts}&apikey=${publicApiKey}&hash=${hash}&offset=${offset}&limit=20`  
    console.log(url)
    const response = await getData(url)
    return response
  }

  const serachHerosByName = async (offset, name) => { 
    const url = `https://gateway.marvel.com/v1/public/characters?&ts=${ts}&apikey=${publicApiKey}&hash=${hash}&offset=${offset}&limit=20&nameStartsWith=${name}`  
    const response = await getData(url)
    return response
  }
  searchHeros()

async function getData(url){
  

    const respose = await axios.get(url).then(response =>{
        const data = response.data.data.results
        return data
    }).catch((err) =>{
        console.log(err)
    })

    return respose
}

export {searchHeros, serachHerosByName}