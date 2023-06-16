import { getURL, getBreeds} from './js/api'
import Notiflix from 'notiflix'


const selectEl = document.querySelector('.breed-select')
const optionEl = document.getElementsByTagName('option')
const catInfo = document.querySelector('.cat-info')
const loaderEl = document.querySelector('.loader')
const errorEl = document.querySelector('.error')



options = {
    breed_ids: '',
    order: 'ASC'
}

getBreeds()
.then((cat)=> {
    selectEl.insertAdjacentHTML('beforeend', createSelectOptions(cat))

    selectEl.hidden = false
    loaderEl.hidden = true
})
.catch(error => {
    return Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')})    


// console.log(optionsText.text)
// options[sel].text



selectEl.addEventListener('change', onSelect)
function onSelect(){
    loaderEl.hidden = false
    catInfo.innerHTML = ''
    options.breed_ids = optionEl[selectEl.selectedIndex].value

    if(optionEl[selectEl.selectedIndex].text !== '--choose a cat--'){
        getURL(options)
        .then((cat)=> {
            const getImg = cat[0].url
            const catBreedInfo = cat[0].breeds[0]
            const createCatInfo = `<img src="${getImg}" alt="cat" width=400px" height="300px">
            <div>
            <h2>${catBreedInfo.name}</h2>
            <p>${catBreedInfo.description}</p>
            <p>Temperament: ${catBreedInfo.temperament}</p>
            </div>`
            
            catInfo.innerHTML = createCatInfo
            loaderEl.hidden = true
        })
        .catch(error => {
            return Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')})    
    }
    else{
        loaderEl.hidden = true
        Notiflix.Notify.warning('choose a cat');
    }

}
function createSelectOptions(cat){
    return cat.map(({id, name})=> `<option value="${id}">${name}</option>`).join('')
}
