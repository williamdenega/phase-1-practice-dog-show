
let url = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dog-form').addEventListener('submit', (e)=>e.preventDefault())
    fetchDogs(url)

})



function fetchDogs(url){
    fetch(url)
    .then( res => res.json())
    .then( arry => arry.forEach(dog => displayDog(dog)))

}



function displayDog(dog){

    let dogTable = document.querySelector("#table-body")
    //creating a tr for each dog
    let card  = document.createElement('tr')
    //filing the card with each dog's info
    card.innerHTML = 
    `
    <td> ${dog.name} </td>
    <td> ${dog.breed} </td>
    <td>  ${dog.sex} </td>
    <td><button>Edit</button></td>
    
    `

    
    card.id= dog.id
    //adding id to each button
    card.querySelector('button').id = dog.id

    //adding each dog to the table
    dogTable.appendChild(card)



    //adding event listener to each button
    card.querySelector('button').addEventListener('click',handlEdit)


    
}



function handlEdit(evt){
    let form = document.querySelector("#dog-form")
    let name = document.getElementById('dogName')
    let breed = document.getElementById('dogBreed')
    let sex = document.getElementById('dogSex')
    let id  = evt.target.id
    //console.log(id)
    fetch(`http://localhost:3000/dogs/${id}`)
    .then(res => res.json())
    .then(dog => {
        name.setAttribute('value', dog.name)
        breed.setAttribute('value', dog.breed)
        sex.setAttribute('value', dog.sex)
        form.name = id
        form.addEventListener('submit', handleSubmit)
        
    })

}


function handleSubmit(e){
    e.preventDefault()
    
    let dogObj = {
        name:e.target.dogName.value,
        breed:e.target.dogBreed.value,
        sex:e.target.dogSex.value
    }
    document.getElementById('table-body').innerHTML = ''
    document.getElementById('dogName').setAttribute('value', '')
    document.getElementById('dogBreed').setAttribute('value', '')
    document.getElementById('dogSex').setAttribute('value', '')
    //console.log(dogObj)

    let id  = document.getElementById('dog-form').name
    fetch(`http://localhost:3000/dogs/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dogObj)
    })
    .then(res => res.json())
    .then(()=> fetchDogs(url))
    e.target.reset()
}