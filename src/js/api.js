import axios from "axios";

const API_KEY = 'live_VRhCQF6lvjQOfoDECIpalrMRlxNDTh1h8biuy5vCRsQEx1PgT7IeNnl84px6XWXe'
const URL_breeds = 'https://api.thecatapi.com/v1/breeds'
const URL = 'https://api.thecatapi.com/v1/images/search'

async function getBreeds() {

    const breeds = await axios.get(`${URL_breeds}?api_key=${API_KEY}`)

    return breeds.data
}
async function getURL(options) {
    const parameters = new URLSearchParams(options)
    const cat = await axios.get(`${URL}?api_key=${API_KEY}&${parameters}`)

    return cat.data
}

export {getURL, getBreeds}
// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME
// &breed_ids=${parameters}
// const parameters = new URLSearchParams(options)
