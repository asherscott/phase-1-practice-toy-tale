let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



const toyCollecDiv = document.querySelector('#toy-collection')



const url = 'http://localhost:3000/toys'
let toys;


fetch(url)
.then(res => res.json())
.then(toysArray => {
  toys = toysArray
  renderToys(toys)
})



// DELIVERABLE 1
function renderToys(toys) {
  toys.forEach(toy => makeCard(toy))
}



function makeCard(toy) {
  const div = document.createElement('div')
  div.className = 'card'

  const h2 = document.createElement('h2')
  h2.textContent = toy.name

  const img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'

  const p = document.createElement('p')
  p.textContent = `${toy.likes} Likes`

  const btn = document.createElement('button')
  btn.textContent = 'Like ❤️'
  btn.className = 'like-btn'
  btn.id = toy.id



  btn.addEventListener('click', () => increaseLike(p, toy))

  
  toyCollecDiv.append(div)

  div.append(h2)
  div.append(img)
  div.append(p)
  div.append(btn)
}



// DELIVERABLE 2
const inputs = document.querySelectorAll('input')
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  newToys()
})
function newToys() {
  const newToy = {
    image: inputs[1].value,
    likes: 0,
    name: inputs[0].value,
  }
  
  fetch(url, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newToy)
  })

  makeCard(newToy)
}



// DELIVERABLE 3
function increaseLike(p, toy) {
  toy.likes = parseInt(p.innerText) + 1
  p.textContent = `${toy.likes} Likes`



  fetch(url + '/' + toy.id, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(toy)
  })
}
