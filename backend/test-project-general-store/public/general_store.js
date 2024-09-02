document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('item-form');
    const itemName = document.getElementById('item-name')
    const description = document.getElementById('description')
    const price = document.getElementById('price')
    const quantity = document.getElementById('quantity')
    const tableBody = document.getElementById('table-body')
    const submitBtn = document.getElementById('submit-btn')

    const serverUrl = 'http://localhost:5000/store'

    function createTableRow (item) {
        const newRow = document.createElement('tr');
        newRow.dataset.id = item.id;
            newRow.innerHTML = `
                <th scope="row">${item.itemName}</th>
                <td>${item.description}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>
                    <input class="qty-input list-input" type="number" placeholder="Qty">
                    <button class="btn btn-warning buy-btn list-btn" type="submit">Buy</button>
                    <button class="btn btn-success add-btn list-btn" type="submit">Add</button>
                    <button class="btn btn-info edit-btn list-btn" type="submit">Edit</button>
                    <button class="btn btn-danger delete-btn list-btn" type="submit">Delete</button>
                </td>
            `;
                
            tableBody.appendChild(newRow)

            const buyBtn = newRow.querySelector('.buy-btn');
            const addBtn = newRow.querySelector('.add-btn');
            const editBtn = newRow.querySelector('.edit-btn');
            const deleteBtn = newRow.querySelector('.delete-btn');

            //handle the buy button click
            buyBtn.addEventListener('click', (event) => {
                // console.log('buy button clicked:', item.id, newRow.querySelector('.qty-input').value)
                const inputQty = newRow.querySelector('.qty-input').value;
                console.log(`buy button clicked - id: ${item.id}, input-quantity: ${inputQty}`)
                if (inputQty && inputQty > 0){
                    axios.put(`${serverUrl}/update-quantity/${item.id}`, { quantityChange: -inputQty})
                        .then(response => {
                            console.log('Quantity decreased', response.data);
                            newRow.querySelector('td:nth-child(4)').innerText = response.data.data.quantity;
                            newRow.querySelector('.qty-input').value = ''
                        })
                        .catch(err => {
                            console.log('Error buying item');
                        })
                } else {
                    alert('please enter a valid quantity for buy');
                }
            })

            addBtn.addEventListener('click', (event) => {
                // console.log('buy button clicked:', item.id, newRow.querySelector('.qty-input').value)
                const inputQty = newRow.querySelector('.qty-input').value;
                console.log(`add button clicked - id: ${item.id}, input-quantity: ${inputQty}`)
                if (inputQty && inputQty > 0){
                    axios.put(`${serverUrl}/update-quantity/${item.id}`, { quantityChange: +inputQty})
                        .then(response => {
                            console.log('Quantity decreased', response.data);
                            newRow.querySelector('td:nth-child(4)').innerText = response.data.data.quantity;
                            newRow.querySelector('.qty-input').value = ''
                        })
                        .catch(err => {
                            console.log('Error adding item');
                        })
                } else {
                    alert('please enter a valid quantity for add');
                }
            })

            // Handle the Edit button click
            editBtn.addEventListener('click', () => {

                submitBtn.innerText = 'Save';

                itemForm.dataset.editId = item.id;
                itemName.value = item.itemName;
                description.value = item.description;
                price.value = item.price;
                quantity.value = item.quantity;
                newRow.remove(); // Remove the item from the UI list
            });

            deleteBtn.addEventListener('click', (event) => {
                const delId = event.target.parentElement.parentElement.dataset.id
                axios
                .delete(`${serverUrl}/delete-item/${delId}`)
                .then(response => {
                    console.log('deleted the item', response)
                    displayItems()
                })
                .catch(err => console.log('error deleting item', err))
            })
    }

    function displayItems() {
        axios
        .get(`${serverUrl}/items`)
        .then(response => {
            tableBody.innerHTML = ''
            for (const item of response.data.items){
                createTableRow(item)
            }
        })
        .catch(err => console.log('error while fetching all items in js file', err))
    }


    itemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const itemNameVal = itemName.value 
        const descriptionVal = description.value
        const priceVal = price.value
        const quantityVal = quantity.value

        const formData = {
            itemNameVal: itemNameVal,
            descriptionVal: descriptionVal,
            priceVal: priceVal,
            quantityVal: quantityVal
        }

        if (itemForm.dataset.editId) {
            // Editing an existing item
            const editId = itemForm.dataset.editId;
            axios.put(`${serverUrl}/edit-item/${editId}`, formData)
                .then((response) => {
                    console.log('Item updated', response.data);
                    createTableRow(response.data.data);
                    itemForm.dataset.editId = ''; // Clear edit mode
                    submitBtn.innerText = 'Add Item';
                })
                .catch(error => {
                    console.log('error occurred while updating item', error);
                });
        } else {
            // Adding a new item
            axios
            .post(`${serverUrl}/add-item`, formData)
            .then((response) => {
                console.log(response.data)
                console.log('form data submitted and response received')
                createTableRow(response.data.data)
            })
            .catch(error => {
                console.log('error occured', error)
            })
        }

        // Reset form fields
        itemName.value = '';
        description.value = '';
        price.value = '';
        quantity.value = '';

    })

    displayItems()
})