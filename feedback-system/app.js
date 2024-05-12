document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector('form')
    const name = document.getElementById('name')
    const rating = document.getElementById('rating')
    const ul = document.querySelector('ul')
    const submitBtn = document.getElementById('submitBtn')
    const oneStarCount = document.querySelector('.one-star')
    const twoStarCount = document.querySelector('.two-star')
    const threeStarCount = document.querySelector('.three-star')
    const fourStarCount = document.querySelector('.four-star')
    const fiveStarCount = document.querySelector('.five-star')

    function updateOverallRatings(counts) {
        oneStarCount.textContent = counts.star1;
        twoStarCount.textContent = counts.star2;
        threeStarCount.textContent = counts.star3;
        fourStarCount.textContent = counts.star4;
        fiveStarCount.textContent = counts.star5;
    }

    let totalRatingCount = {
        star1 : 0,
        star2 : 0,
        star3 : 0,
        star4 : 0,
        star5 : 0
    }

    function displayUserOnScreen(details){
        const newLi = document.createElement('li')
        newLi.dataset.itemId = details._id
        newLi.innerHTML = `${details.nameVal}-${details.ratingVal} <button id="dlt" class="dlt">Delete</button><button id="edit" class="edit">Edit</button>`
        ul.appendChild(newLi)
    }

    axios
    .get("https://crudcrud.com/api/522bc9dd5dc74a748cdbe85c45ef629b/ratingDetails")
    .then((response)=>{
        for(let i = 0; i<response.data.length; i++){
            displayUserOnScreen(response.data[i])
            const ratingVal = response.data[i].ratingVal
            totalRatingCount[`star${ratingVal}`]++
        }
        updateOverallRatings(totalRatingCount)
    })
    .catch((err)=> console.log(err))

    form.addEventListener('submit', (event)=>{
        event.preventDefault()

        submitBtn.textContent = "Submit"
        const nameVal = name.value
        const ratingVal = rating.value 

        const details  = {
            nameVal : nameVal,
            ratingVal : ratingVal
        }

        axios
        .post("https://crudcrud.com/api/522bc9dd5dc74a748cdbe85c45ef629b/ratingDetails", details)
        .then((response)=>{
            displayUserOnScreen(response.data)
            const ratingVal = response.data.ratingVal
            totalRatingCount[`star${ratingVal}`]++
            updateOverallRatings(totalRatingCount)
        })
        .catch((err)=> console.log(err))

        name.value = ""
        rating.value = 1

    })


    ul.addEventListener('click', (event)=>{
        const text = event.target.parentElement.textContent
        const textArr = text.split('-')

        if(event.target.classList.contains('dlt')){
            const listTodlt = event.target.parentElement
            const dltId = listTodlt.dataset.itemId

            ul.removeChild(listTodlt)
            axios
            .delete(`https://crudcrud.com/api/522bc9dd5dc74a748cdbe85c45ef629b/ratingDetails/${dltId}`)
            .then((response)=> console.log(response))
            .catch((err)=> console.log(err))

            const ratingVal = textArr[1]
            totalRatingCount[`star${ratingVal}`]--
            updateOverallRatings(totalRatingCount)

        }

        else if(event.target.classList.contains('edit')){
            submitBtn.textContent = "Edit Rating"
            const listTodlt = event.target.parentElement
            const dltId = listTodlt.dataset.itemId

            name.value = textArr[0]
            rating.value = textArr[1].split(' ')[0]

            ul.removeChild(listTodlt)
            axios
            .delete(`https://crudcrud.com/api/522bc9dd5dc74a748cdbe85c45ef629b/ratingDetails/${dltId}`)
            .then((response)=> console.log(response))
            .catch((err)=> console.log(err))

            const ratingVal = textArr[1].split(' ')[0]
            totalRatingCount[`star${ratingVal}`]--
            updateOverallRatings(totalRatingCount)

        }

    })


})