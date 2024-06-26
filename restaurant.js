const menuButton = document.querySelector('.menuBtn');
menuButton.addEventListener('click', function(){
const dropDownDiv = document.querySelector('#hamburgerMenu')
if( dropDownDiv.classList.contains('dropDownHidden')){
dropDownDiv.classList.remove('dropDownHidden')
dropDownDiv.classList.add('dropDown')
}
else{
if(dropDownDiv.classList.contains('dropDown')){
dropDownDiv.classList.remove('dropDown')
dropDownDiv.classList.add('dropDownHidden')}
}
}) 
const submitButton = document.querySelector("#orderSubmit");
submitButton.addEventListener
('click', function(e) 
    {
        e.preventDefault();

        const menuPrices = 
        [
        ["hummusWithPitaBread", 6.99],
        ["babaGanoush", 7.49],
        ["falafel",5.99],
        ["stuffedGrapeLeavesDolma",6.49],
        ["labneh",5.99],
        ["lambShishKebab",16.99],
        ["chickenShawarma",14.99],
        ["adanaKebab",15.99],
        ["beefKofta",15.49],
        ["mixedGrillPlatter",22.99],
        ["vegetarianMoussaka",13.99],
        ["falafelPlate",11.99],
        ["stuffedPeppers",12.99],
        ["ricePilaf",3.99],
        ["bulgurPilaf",4.49],
        ["tabbouleh",4.99],
        ["grilledVegetables",4.99],
        ["baklava",4.99],
        ["kunafa",5.99],
        ["turkishDelight",3.99],
        ["ricePudding",4.49],
        ["turkishCoffee",2.99],
        ["mintTea",2.49],
        ["ayran",2.99],
        ["pomegranateJuice",3.99],
        ["softDrink",1.99]
        ]




        function createInputValuesArray()
        {
            const inputValueArray =[]
            const formElementsLength = document.querySelector("#orderForm").elements.length;
            console.log(formElementsLength)
            for (var i=0; i<formElementsLength; i++)
            {
                inputValueArray.push(document.querySelector("#orderForm").elements[i].value)
            }
            console.log('Input array of all values',inputValueArray)
            return inputValueArray
        }
        const inputArrayCreated = createInputValuesArray()




        function createQuantityInputsOnlyArray(){
            let quantitiesOnlyArray =[]
            for(var i=0; i<26; i++)
                {
                    quantitiesOnlyArray.push(inputArrayCreated[i])
                }
                return quantitiesOnlyArray
        }
        const quantitiesArray = createQuantityInputsOnlyArray();




        function validateCustomerInfoNotEmpty(){
            const customerName = inputArrayCreated[26]
            const nameErrorMessage = document.querySelector('#nameErrorMessage');
            const customerCard = inputArrayCreated[27]
            const cardErrorMessage = document.querySelector('#cardErrorMessage');
            const customerPostalCode = inputArrayCreated[28]
            const addressErrorMessage = document.querySelector('#addressErrorMessage');
            const customerPhone = inputArrayCreated[29]
            const PhoneErrorMessage = document.querySelector('#PhoneErrorMessage');
            console.log('customerName: ', customerName)
            console.log('customerCard: ', customerCard)
            console.log('customerPostalCode: ', customerPostalCode)
            console.log('customerPhone: ', customerPhone)
            if(customerName === ""){
                //Generate a user alert message for empty name field
                nameErrorMessage.innerHTML = `
                 <div class = 'messageToUser' >
                <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                <p>Full name must NOT be empty</p>
                </div>
                `
                nameErrorMessage.classList.add('messageToUser')
                return false
            }
            else
            {
                // clear the error message for name
                nameErrorMessage.innerHTML = ``
                if(customerCard === "")
                {
                    //generate error message for card
                        cardErrorMessage.innerHTML = `
                        <div class = 'messageToUser' >
                        <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                        <p>Card Number must NOT be empty</p>
                        </div>`
                        return false
                }
                else
                {
                    // clear the error message for card
                    cardErrorMessage.innerHTML =``

                    if(customerPostalCode === "")
                        {
                            //generate error message for address
                            addressErrorMessage.innerHTML = `
                             <div class = 'messageToUser' >
                             <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                            <p>Postal Code must NOT be empty</p>
                            </div>`
                            return false
                        }
                    else
                        {
                            // clear the error message for address
                            addressErrorMessage.innerHTML =``

                            if(customerPhone === "")
                                {
                                    PhoneErrorMessage.innerHTML = `
                                    <div class = 'messageToUser' >
                                    <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                                    <p>Phone number must NOT be empty</p>
                                    </div>`
                                    return false
                                }
                            else
                                {
                                    PhoneErrorMessage.innerHTML = ``
                                    return true
                                }
                        }

                }

            }
        }



        function filterEmptyInputsFromInputValuesArray(inputValueArray)
        {
            const filteredArray = inputValueArray.filter(element => element !== "" && parseInt(element) !== 0)
            console.log('Input array filtered to exclude empty and zero fields',filteredArray)
            return filteredArray

        }

        if (validateCustomerInfoNotEmpty())
            {
                if (alertUserEmptyQuantityFields())
                {
                

                const filtereArray = filterEmptyInputsFromInputValuesArray(quantitiesArray)
                const isQuanitiesOnlyDigits = validateQuanitiesOnlyDigits()
                if (isQuanitiesOnlyDigits)
                {
                     validateCustomerName()
                    if(validateCustomerName())
                    {
                        validateCustomerCard()
                        const isValidCustomerCard = validateCustomerCard()
                        if (isValidCustomerCard)
                            {
                                const isValidCustomerPostalCode = validatePostalCodeFormat()
                                if (isValidCustomerPostalCode)
                                    {
                                        const isValidCustomerNumber = validateCustPhoneNumber()
                                        if(isValidCustomerNumber)
                                            {
                                                const itemQuantityAndPriceArray = generateItemQuantityAndPriceArray()
                                                calculateSubtotal()
                                                generateCustomerRecipt()
                                                

                                            }
                                    }

                            }
                    }

                }
                else
                {
                    const noItemsSelectedDiv = document.querySelector('.noItemsSelectedError')

                  
                    noItemsSelectedDiv.innerHTML =
                    `
                    <div class = 'messageToUser' >
                        <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                        <p>Please enter only number digits no other characters allowed for quantity !</p>
                    </div>
                    `
                    noItemsSelectedDiv.style.boxShadow = "5px 5px 5px 2px rgba(109, 122, 126, 0.177)"
                    noItemsSelectedDiv.style.backgroundColor = 'white'
                }
            }
            }





        function alertUserEmptyQuantityFields()
        {
            const filteredArray = filterEmptyInputsFromInputValuesArray(createQuantityInputsOnlyArray())
            const noItemsSelectedDiv = document.querySelector('.noItemsSelectedError')

            if (filteredArray.length === 0)
                {
                    noItemsSelectedDiv.innerHTML =
                    `
                    <div class = 'messageToUser' >
                        <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                        <p>No items Selected, You have to select one item with a quantity of at least '1' !</p>
                    </div>
                    `                  
                    noItemsSelectedDiv.style.boxShadow = "5px 5px 5px 2px rgba(109, 122, 126, 0.177)"
                    noItemsSelectedDiv.style.backgroundColor = 'white'
                    return false
                }
            else
                {
                    noItemsSelectedDiv.innerHTML =``
                    noItemsSelectedDiv.style.boxShadow = ""
                    noItemsSelectedDiv.style.backgroundColor = ''
                    return true
                     
                }

        }




        function isOnlyDigits(string) {
            const stringArray = string.split("")
            let resultArray =[];
                stringArray.forEach
                (element => 
                    {
                        if(element !== '0' && element !== '1'&& element !== '2'&& element !== '3'&& element !== '4'&& element !== '5'&& element !== '6'&& element !== '7'&& element !== '8' && element !== '9')
                            {
                                resultArray.push(false)
                            }
                        else
                            {
                                resultArray.push(true)
                            }
                    }
                )
            console.log(resultArray)
            if (resultArray.some(element => element === false)){
                return false
            }
            else
            return true
        }   
        
        

        `
        <div class = 'messageToUser' >
            <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
            <p>No items Selected, You have to select one item with a quantity of at least '1' !</p>
        </div>
        ` 
        function validateQuanitiesOnlyDigits()
        {
            const onlyDigitsRE = /([0-9]([0-9]*)?)/;
            let resultArray = []
            quantitiesArray.map
            (element=>
                {
                    if (isOnlyDigits(element))
                    {
                        resultArray.push(true)
                    }
                    else
                    {
                        resultArray.push(false)
                    }

                }
            )
            console.log("result array", resultArray)
            if (resultArray.includes(false))
                {
                    return false
                }
            else
                {
                    return true
                }
        }
        console.log('validateQuanitiesOnlyDigits', validateQuanitiesOnlyDigits())




        function validateCustomerName(){
            const customerName = inputArrayCreated[26]
            const nameErrorMessage = document.querySelector('#nameErrorMessage');
            const validNameRE = /^[a-zA-Z\s'-]+$/
            const testResult = validNameRE.test(customerName)
            if (testResult)
            {   
                return true
            }
            else
            {
                nameErrorMessage.innerHTML =                 `
                <div class = 'messageToUser' >
                    <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                    <p>Please enter a valid form full name! Only special characters allowed are - and ' </p>
                </div>
                `
                return false
            }
        }




        function validateCustomerCard(){
            const customerCard = inputArrayCreated[27]
            const cardErrorMessage = document.querySelector('#cardErrorMessage');
            const validCustomerCardRE = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}/;
            const testResult = validCustomerCardRE.test(customerCard)
            if(testResult)
                {
                    return true
                }
            else
                {
                    cardErrorMessage.innerHTML =                 `
                    <div class = 'messageToUser' >
                        <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                        <p>Invalid Card format, please enter card number in this format: 0000-0000-0000-0000 </p>
                    </div>
                    `
                    return false
                }
        }





        function validatePostalCodeFormat(){
            const customerPostalCode = inputArrayCreated[28]
            const allCapscustomerPostalCode = customerPostalCode.toUpperCase()
            const addressErrorMessage = document.querySelector('#addressErrorMessage');
            const postalCodeRE = /[A-Z][0-9][A-Z][0-9][A-Z][0-9]/;
            const testResult = postalCodeRE.test(allCapscustomerPostalCode)
            console.log(testResult)
            if (!testResult && customerPostalCode !=='')
            {
                addressErrorMessage.innerHTML = `
                    <div class = 'messageToUser' >
                        <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                        <p>Postal code format invalid! Please enter postal code in this format (A0A0A0) </p>
                    </div>`
                    return false
            }
            else
            {
                addressErrorMessage.innerHTML =``
                return allCapscustomerPostalCode
            }

        }




        function validateCustPhoneNumber(){
            const customerPhone = inputArrayCreated[29]
            const PhoneErrorMessage = document.querySelector('#PhoneErrorMessage');
            const customerPhoneRE = /\+[0-9]{10}/;
            const testResult = customerPhoneRE.test(customerPhone)
            console.log(testResult)
            if (customerPhone !=="" && customerPhone.length !== 11)
            {
                PhoneErrorMessage.innerHTML = `
                    <div class = 'messageToUser' >
                        <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                        <p>Phone number format invalid! Please ensure there is a '+' sign and 10 digits. </p>
                    </div>`

                    return false
            }
            else
            {
                if (!testResult && customerPhone !=='')
                {
                    PhoneErrorMessage.innerHTML = `
                        <div class = 'messageToUser' >
                            <img src="./images/errorIcon.png" alt="A picture of a danger sign singinfying error">
                            <p>Phone number format invalid! Please enter phone number in this format (+11111111111) </p>
                        </div>`

                        return false
                }
                else
                {
                    addressErrorMessage.innerHTML =``
                    return customerPhone
                }
            }

        }




        function generateItemQuantityAndPriceArray(){
            const quantitiesArray = createQuantityInputsOnlyArray();
            console.log(quantitiesArray)
            let itemQuantityAndPriceArray =[]
            for (var i=0; i < quantitiesArray.length; i++)
            {
                if ( quantitiesArray[i] !== "" && isOnlyDigits(quantitiesArray[i]) &&  parseInt(quantitiesArray[i]) !== 0)
                {
                    const itemQuantParsed = parseInt(quantitiesArray[i])
                    console.log(itemQuantParsed)
                    const itemPricePerItem = menuPrices[i][1]
                    console.log(itemPricePerItem)
                    const itemName = menuPrices[i][0]
                    console.log(itemName)
                    const itemNameFormatted = itemName.replace(/([A-Z])/g, ' $1')
                    console.log(itemNameFormatted)
                    const itemNameFormattedLength = itemNameFormatted.length
                    console.log(itemNameFormattedLength)
                    const itemNameFormattedCapFirstLetter = `${itemNameFormatted[0].toUpperCase()}${itemNameFormatted.substring(1,itemNameFormattedLength+1)}`
                    console.log(itemNameFormattedCapFirstLetter)
                    const itemTotal = itemQuantParsed * itemPricePerItem;
                    itemQuantityAndPriceArray.push({itemNameFormattedCapFirstLetter, itemPricePerItem, itemQuantParsed, itemTotal })
                }

            }
            console.log(itemQuantityAndPriceArray)
            return itemQuantityAndPriceArray
        }



        function calculateSubtotal()
        {
            let subTotal = 0
            const quantitiesArray = createQuantityInputsOnlyArray();
            console.log(quantitiesArray)
            for (var i=0; i < quantitiesArray.length; i++)
            {
                if ( quantitiesArray[i] !== "" && isOnlyDigits(quantitiesArray[i]))
                {
                    console.log(quantitiesArray[i])
                    console.log(menuPrices[i][1])
                    const itemQuantParsed = parseInt(quantitiesArray[i])
                    console.log('itemsQuant', itemQuantParsed)
                    const itemTotal = itemQuantParsed * menuPrices[i][1];
                    console.log(itemTotal)
                    subTotal += itemTotal;
                }
                else
                {
                    subTotal+= 0
                }

            }
            console.log(subTotal)
            return subTotal
        }




        function generateCustomerRecipt()
        {
            const customerName = inputArrayCreated[26]
            const fullNameRE = /^([a-zA-Z\s'-]+)\s([a-zA-Z\s'-]+)$/
            const customerNameLength = customerName.length
            const firstLastNameArray = customerName.match(fullNameRE)
            const firstName = firstLastNameArray[1]
            const firstNamelength = firstName.length
            const firstFirstLetterCap = firstName[0].toUpperCase()
            const lastName = firstLastNameArray[2]
            const lastFirstLetterCap = lastName[0].toUpperCase()
            const lastNameLength = lastName.length

            console.log(firstLastNameArray)

            const formattedCustomerName = `${firstFirstLetterCap}${firstName.substring(1, firstNamelength+1)} ${lastFirstLetterCap}${lastName.substring(1,lastNameLength+1)}`
            const customerCard = inputArrayCreated[27]
            const customerCardFormatted = `xxxxxxxxxxxx${customerCard.substring(15,19)}`

            const form = document.querySelector('.orderForm');
            form.style.display='none'
            const orderDetailsTable = document.querySelector('#orderDetailsTable');
            const submitButton = document.querySelector("#orderSubmit");
            const itemQuantityAndPriceArray = generateItemQuantityAndPriceArray()
            const date = new Date();
            console.log(date)
            const orderDay = date.getDate();
            const orderMonth = date.getMonth();
            const orderYear = date.getFullYear();
            const orderHour = date.getHours();
            const orderMinutes = date.getMinutes();
            const orderSeconds = date.getSeconds();
            console.log(orderHour)
        
            const orderDate = `${orderDay}-${orderMonth}-${orderYear}`
            const orderTime = `${orderHour}:${orderMinutes}:${orderSeconds}`
            console.log(orderDate)
            console.log(orderTime)

            const customerPostalCode = validatePostalCodeFormat()
            const customerPhone = validateCustPhoneNumber()
        
        
        
            submitButton.style.display = 'none'
            // Customer Info section 
                
            orderDetailsTable.innerHTML =`<th class="tableHead">
                                            <h4 class = "toHideInRecipt" >Your Order Details</h4>
                                            <p class = "toHideInRecipt">Please review your order</p>
                                            </th>
                                            <tr class="orderDateTime">
                                                <td><strong>Order Date: </strong>${orderDate}</td>
                                                <td><strong>Order Time: </strong>${orderTime}</td>
                                            </tr>
                                            <tr class="custDisInfo">
                                                <td ><strong>Customer Name: </strong></td>
                                                <td>${formattedCustomerName}</td>
                                            </tr>
                                            <tr class="custDisInfo">
                                                <td><strong>Card Number: </strong></td>
                                                <td>${customerCardFormatted}</td>
                                            </tr> 
                                            <tr class="custDisInfo">
                                                <td><strong>Postal Code: </strong></td>
                                                <td>${customerPostalCode}</td>
                                            </tr>
                                             <tr class="custDisInfo">
                                                <td><strong>Phone Number: </strong></td>
                                                <td>${customerPhone}</td>
                                            </tr>
                                            <tr>
                                                <br>
                                            </tr>
                                            `
            // Items Info secion 
            itemQuantityAndPriceArray.forEach
            (element=>
                {
                    const output = `
                    <tr>
                        <td class="itemName">${element.itemNameFormattedCapFirstLetter}</td>
                        <td class="itemPrice">$${element.itemPricePerItem}</td>
                        <td class="itemQuan">x${element.itemQuantParsed} </td>
                        <td class="itemTotalPrice">$${(element.itemTotal).toFixed(2)}</td>
                    </tr>`
                    orderDetailsTable.innerHTML += output
                }
            )
            
            // Calculations section

            const subTotal =  calculateSubtotal()



            orderDetailsTable.innerHTML +=
         `
        <hr/>
            <tr class = "calc">
                <td>Subtotal</td>
                <td>$${(subTotal).toFixed(2)}</td>
            </tr>
            <tr class = "calc">
                <td>Taxes</td>
                <td>$${(subTotal * 0.15).toFixed(2)}</td>
            </tr>
            <tr class = "calcHr">
                <td class = "hrBottomtd">
                <hr />
                </td>
            </tr>
            <tr class = "calc">
                <td>Total</td>
                <td>$${(subTotal * 1.12).toFixed(2)}</td>
            </tr>
        <div class="buttonsDiv">
            <button class="cancel" onclick="handleCancel()">Cancel</button>
            <button class="edit" onclick="handleEdit()">Edit</button>
            <button class="confirm" onclick="handleConfirm()">Confirm</button>
        </div>
        `                      
        }
    orderDetailsTable.style.boxShadow = "5px 5px 5px 2px rgba(109, 122, 126, 0.177)"
    orderDetailsTable.style.backgroundColor = 'white'



    }
)


// handle confirmation
function handleConfirm(){
    const form = document.querySelector('.orderForm');
    form.style.display = 'none';
    const clientReciptDiv = document.querySelector('.clientReciptDiv');
    const toHideInRecipt = document.querySelectorAll('.toHideInRecipt');
    clientReciptDiv.innerHTML += `<h1>Thank you for your order!</h1> `
    clientReciptDiv.appendChild(orderDetailsTable);
    const buttonsDiv = document.querySelector('.buttonsDiv')
    buttonsDiv.style.display = 'none'
    toHideInRecipt.forEach(element => element.style.display = 'none')
    orderDetailsTable.innerHTML += `<div class = 'messageToUser' >
                                    <img src="./images/successIcon.png" alt="A picture of a green check mark icon">
                                    <p>Order confirmed! Your meal will be prepared shortly!</p>
                                    </div>
                                <a class="anotherOrder" href="order.html">Place Another Order</a>
`
    orderDetailsTable.style.boxShadow = "5px 5px 5px 2px rgba(109, 122, 126, 0.177)"
    orderDetailsTable.style.backgroundColor = 'white'
}


const orderDetailsTable = document.querySelector('#orderDetailsTable');

// handle Edit
function handleEdit(){

    const form = document.querySelector('.orderForm');

    form.style.display = 'flex'

    submitButton.style.display = 'initial'
    orderDetails=[];
    subtotal = 0;
    console.log(orderDetails)
    console.log(subtotal)
    
    orderDetailsTable.innerHTML = `<p>You can edit your order from the above form!</p>`

    setTimeout(() => {
    orderDetailsTable.style.backgroundColor = "";
    orderDetailsTable.style.boxShadow = ""
    orderDetailsTable.innerHTML =``
    }, 3000);
}

// handle cancellation
function handleCancel(){
    const form = document.querySelector('.orderForm');
    form.style.display = 'flex'
    submitButton.style.display = 'initial'
    orderDetails=[];
    subtotal = 0;
    form.reset()

    orderDetailsTable.innerHTML = `<div class = 'messageToUser' ><img src="./images/successIcon.png" alt="A picture of a danger sign singinfying error">
                <p>Your order was successfully cancelled!</p></div>`
                setTimeout(() => {
                    orderDetailsTable.innerHTML = `<table id="orderDetailsTable" >
                    </table>`
                        orderDetailsTable.style.backgroundColor = "";
    orderDetailsTable.style.boxShadow = ""
                }, 5000);
}

