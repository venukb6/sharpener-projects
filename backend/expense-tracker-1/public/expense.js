
document.addEventListener('DOMContentLoaded',()=>{
    const form = document.querySelector('form')
    const amount = document.getElementById('amount')
    const desc = document.getElementById('description')
    const category = document.getElementById('category')
    const ul = document.querySelector('.expenseUl')
    const formField = document.getElementById('formfield')
    const body = document.querySelector('body')
    const submitButton = document.getElementById('submitBtn')

    const serverUrl = 'http://localhost:3000'


    axios
    .get(`${serverUrl}/admin/get-items`)
    .then((response)=>{
        console.log('got response')
        console.log(response.data)
        for(let i=0; i<response.data.length; i++){
            console.log(i)
            displayUserOnScreen(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err)
    })


    function displayUserOnScreen(details){
        const newLi = document.createElement('li')
        newLi.dataset.itemId = details.id
        newLi.innerHTML = `${details.amount} - ${details.description} - ${details.category} <button class="dlt btn btn-danger">Delete</button>  <button class="edt btn btn-warning">Edit</button>`
        newLi.className = "list-group-item"
        
        ul.appendChild(newLi)
    }

    function displayError(message){
          const errorBody = document.createElement('div')
          errorBody.className = "alert alert-primary"
          errorBody.role = "alert"
          errorBody.innerText = message
          body.appendChild(errorBody)
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

        axios
        .post(`${serverUrl}/admin/post-item`,
            details
        )
        .then((response) => {
            console.log(response.data)
            displayUserOnScreen(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        
        amount.value = ''
        desc.value = ''
        category.value = 'Food'

    })

    

    ul.addEventListener('click', (event)=>{
        const text = event.target.parentElement.textContent
        const textArr = text.split('-').map((item)=> item.trim())
        if(event.target.classList.contains('dlt')){
            const listToDlt = event.target.parentElement
            const itemId = listToDlt.dataset.itemId
            ul.removeChild(listToDlt)
            axios
            .delete(`${serverUrl}/admin/delete-item/${itemId}`)
            .then((response)=>{
                console.log(response)
            })
            .catch((err)=>{
                console.log(err)
            })
            
        }
        else if(event.target.classList.contains('edt')){
            const listToDlt = event.target.parentElement
            const itemId = listToDlt.dataset.itemId
            ul.removeChild(listToDlt)

            amount.value = textArr[0]
            desc.value = textArr[1]
            category.value = textArr[2].split(' ')[0]

            const saveBtn = document.createElement('button')
            saveBtn.innerText = 'Save'
            saveBtn.className = 'btn btn-success'
            saveBtn.type = 'submit'
            saveBtn.id = 'btn'

            formField.removeChild(submitButton)
            formField.appendChild(saveBtn)

            saveBtn.addEventListener('click', (event) =>{
                event.preventDefault()

                const details = {
                    amount : amount.value,
                    description : desc.value,
                    category : category.value
                }
                console.log(details)

                formField.removeChild(saveBtn)
                formField.appendChild(submitButton)

                amount.value = ''
                desc.value = ''
                category.value = 'Food'

                axios
                .put(`${serverUrl}/admin/edit-item/${itemId}`, details)
                .then((response)=>{
                    console.log('response: ',response)
                    console.log('response data: ',response.data)
                    console.log('got response')
                    displayUserOnScreen(response.data)
                })
                .catch((err)=>{
                    console.log(err)
                    const errorMessage = err.response.data.error
                    displayError(errorMessage)
                })
            })
        }
    })


})





