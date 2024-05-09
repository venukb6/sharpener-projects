document.addEventListener('DOMContentLoaded',()=>{
    const form = document.querySelector('form')
    const amount = document.getElementById('amount')
    const desc = document.getElementById('description')
    const category = document.getElementById('category')
    const ul = document.querySelector('.expenseUl')

    function displayUserOnScreen(details){
        const newLi = document.createElement('li')
        newLi.innerHTML = `${details.amtV} - ${details.desV} - ${details.catV} <button class="dlt">Delete Expense</button>  <button class="edt">Edit Expense</button>`
        newLi.className = "list-group-item"
        
        ul.appendChild(newLi)
    }

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

        displayUserOnScreen(details)
        
        amount.value = ''
        desc.value = ''
        category.value = 'Food'

    })

    

    ul.addEventListener('click', (event)=>{
        const text = event.target.parentElement.textContent
        const textArr = text.split('-').map((item)=> item.trim())
        const storageKey = textArr[1]
        if(event.target.classList.contains('dlt')){
            const listToDlt = event.target.parentElement
            ul.removeChild(listToDlt)
            localStorage.removeItem(storageKey)
            
        }
        else if(event.target.classList.contains('edt')){
            const listToDlt = event.target.parentElement
            ul.removeChild(listToDlt)
            localStorage.removeItem(storageKey)

            amount.value = textArr[0]
            desc.value = textArr[1]
            category.value = textArr[2].split(' ')[0]
        }
    })


})





