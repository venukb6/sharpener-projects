
document.addEventListener('DOMContentLoaded',()=>{
    const form = document.querySelector('form')
    const username = document.getElementById('username')
    const number = document.getElementById('number')
    const email = document.getElementById('email')
    const ul = document.querySelector('.appointmentUl')
    const formField = document.getElementById('formfield')
    const body = document.querySelector('body')

    const serverUrl = 'http://localhost:3000/user'
    


    axios
    .get(`${serverUrl}/get-user`)
    .then((response)=>{
        for(let i=0; i<response.data.length; i++){
            displayUserOnScreen(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err)
        const errorMessage = err.response.data.error
        displayError(errorMessage)
    })


    function displayUserOnScreen(details){
        const newLi = document.createElement('li')
        newLi.dataset.itemId = details.id
        newLi.innerHTML = `${details.name} - ${details.phoneNumber} - ${details.email} <button class="dlt btn btn-danger">Delete</button>  <button class="edt btn btn-warning">Edit</button>`
        newLi.className = "list-group-item"
        
        ul.appendChild(newLi)
    }

    function displayError(message){
    //     body.innerHTML = `<div class="alert alert-primary" role="alert">
    //     ${message}
    //   </div>`
      const errorBody = document.createElement('div')
      errorBody.className = "alert alert-primary"
      errorBody.role = "alert"
      errorBody.innerText = message
      body.appendChild(errorBody)
    }

    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        const usernameVal = username.value 
        const numberVal = number.value 
        const emailVal = email.value 

        const details = {
            usernameV : usernameVal,
            numberV : numberVal,
            emailV : emailVal
        }

        axios
        .post(`${serverUrl}/add-user`, details)
        .then((response) => {
            console.log(response.data)
            displayUserOnScreen(response.data.newUserData)
            console.log('got response')
        })
        .catch((err)=>{
            console.log('error occured')
            const errorMessage = err.response.data.error
            displayError(errorMessage)
        })
        
        username.value = ''
        number.value = ''
        email.value = ''

    })

    

    ul.addEventListener('click', (event)=>{
        const text = event.target.parentElement.textContent
        const textArr = text.split('-').map((item)=> item.trim())
        // console.log(textArr)
        if(event.target.classList.contains('dlt')){
            const listToDlt = event.target.parentElement
            const itemId = listToDlt.dataset.itemId
            console.log(itemId)
            ul.removeChild(listToDlt)
            axios
            .delete(`${serverUrl}/delete-user/${itemId}`)
            .then((response)=>{
                console.log(response)
            })
            .catch((err)=>{
                console.log(err)
                const errorMessage = err.response.data.error
                displayError(errorMessage)
            })
            
        }
        else if(event.target.classList.contains('edt')){
            const listToDlt = event.target.parentElement
            const itemId = listToDlt.dataset.itemId
            console.log(itemId)
            ul.removeChild(listToDlt)

            username.value = textArr[0]
            number.value = textArr[1]
            email.value = textArr[2].split(' ')[0]

            const saveBtn = document.createElement('button')
            saveBtn.innerText = 'Save'
            saveBtn.className = 'btn btn-success'
            saveBtn.type = 'submit'
            saveBtn.id = 'btn'
            formField.appendChild(saveBtn)

            // formField.innerHTML = `<button type="submit" id="btn" class="btn btn-primary">Save</button>`

            saveBtn.addEventListener('click', (event) =>{
                const usernameVal = username.value 
                const numberVal = number.value 
                const emailVal = email.value 

                const details = {
                    usernameV : usernameVal,
                    numberV : numberVal,
                    emailV : emailVal
                }

                formField.removeChild(saveBtn)

                axios
                .put(`${serverUrl}/edit-user/${itemId}`, details)
                .then((response)=>{
                    console.log(response.data)
                    displayUserOnScreen(response.data.updatedUserData)
                    console.log('got response')
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





