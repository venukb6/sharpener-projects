document.addEventListener('DOMContentLoaded',()=>{
    const form = document.querySelector('form')
    const amount = document.getElementById('amount')
    const desc = document.getElementById('description')
    const category = document.getElementById('category')
    const ul = document.getElementById('ul')
    const ulc = document.getElementsByClassName('expenseUl')
    console.log(ulc)

    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        const amountVal = amount.value 
        const descVal = desc.value 
        const categoryVal = category.value 

        const details = {
            amtV : amountVal,
            desV : descVal,
            catV : categoryVal
        }

        const detailsReady = JSON.stringify(details)

        localStorage.setItem(descVal, detailsReady)

        const newLi = document.createElement('li')
        newLi.innerHTML = `${amountVal} - ${descVal} - ${categoryVal} <button id="dlt">Delete Expense</button>  <button id="edt">Edit Expense</button>`
        newLi.className = "list-group-item"
        
        ulc.appendChild(newLi)

        


    })


})





