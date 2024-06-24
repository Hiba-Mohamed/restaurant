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


//handle submission 
let orderDetails=[];
let subtotal = 0;
const OrderDetailsTable = document.querySelector('#orderDetailsTable');
const orderOutputSection = document.querySelector('.orderOutputSection')
const submitButton = document.querySelector("#orderSubmit")
submitButton.addEventListener('click', function(e){
e.preventDefault();



const customerName = document.querySelector('#customerName').value;
const customerCard = document.querySelector('#customerCard').value;
const customerAddress = document.querySelector('#customerAddress').value;
const nameErrorMessage = document.querySelector('#nameErrorMessage');
const cardErrorMessage = document.querySelector('#cardErrorMessage');
const addressErrorMessage = document.querySelector('#addressErrorMessage');
const noItemsSelectedErrorParag = document.querySelector('.noItemsSelectedError')


    if (customerName === "" )
    {
        generateErrorForEmptyNameField()
    }

    else
    {
        clearNameErrorDiv()
        if (customerCard === "" )
        {
            generateErrorForEmptyCardField()
        }

        else
        {
            clearCardErrorDiv()
            if (customerAddress === "")
            {
                generateErrorForEmptyAddressField()
            }

            else
            {
                clearAddressErrorDiv()
                

                if (validateItemQuantitiesAndCalculateSubtotal())
                {
                        generateClientReceipt()

                }
            }
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





function generateErrorForEmptyNameField(){
    nameErrorMessage.innerHTML = `<img src="./images/errorIcon.png" alt="">
    <p>Full name must NOT be empty</p>`
    nameErrorMessage.classList.add('messageToUser')
}

function clearNameErrorDiv(){
    nameErrorMessage.classList.remove('messageToUser')
    nameErrorMessage.innerText =""
}

function generateErrorForEmptyCardField(){
    cardErrorMessage.innerHTML = `<img src="./images/errorIcon.png" alt="">
    <p>Card number must NOT be empty</p>`
    cardErrorMessage.classList.add('messageToUser')
}

function clearCardErrorDiv(){
    cardErrorMessage.classList.remove('messageToUser')
    cardErrorMessage.innerText =""
}

function generateErrorForEmptyAddressField(){
    addressErrorMessage.innerHTML = `<img src="./images/errorIcon.png" alt="">
    <p>Address must NOT be empty</p>`
    addressErrorMessage.classList.add('messageToUser')
}

function clearAddressErrorDiv(){
    addressErrorMessage.innerText =""
    addressErrorMessage.classList.remove('messageToUser')
}


// function validateItemQuantNotAllEmpty(){
//     if(subtotal === 0){
//         noItemsSelectedErrorParag.innerHTML = `
//                             <div class = 'messageToUser' >
//                                 <img src="./images/errorIcon.png" alt="">
//                                 <p>No items Selected, You have to select one item with a quantity of at least'1'!</p>
//                             </div>`
//                             return false
//     }
//     else return true
// }

function validateItemQuantitiesAndCalculateSubtotal()
{
    //items quantities validation and calculation logic

    const priceListLength = menuPrices.length;
    console.log(priceListLength)
    const inputFieldsLength = document.querySelector("#orderForm").elements.length;
    console.log(inputFieldsLength)
    let validationArrayOnlyDigits =[];

    for (var i=0; i < inputFieldsLength-4; i++){
        if(document.querySelector("#orderForm").elements[i].value !== "" 
        && parseInt(document.querySelector("#orderForm").elements[i].value) !== 0){
            console.log(document.querySelector("#orderForm").elements[i].value)
        const singleValidation = isOnlyDigits(document.querySelector("#orderForm").elements[i].value)
        validationArrayOnlyDigits.push(singleValidation)
        }

        console.log(validationArrayOnlyDigits) 
    }
    if (validationArrayOnlyDigits.some(element => element === false))
    {
        noItemsSelectedErrorParag.innerHTML = `
        <div class = 'messageToUser' >
            <img src="./images/errorIcon.png" alt="">
            <p>Please ensure you only type digits, no other characters allowed!</p>
        </div>`   
    }

    else
    {

        for (var i=0; i < inputFieldsLength-3; i++)
        {
            if(document.querySelector("#orderForm").elements[i].value !== "" 
            && parseInt(document.querySelector("#orderForm").elements[i].value) !== 0)
            {
            

                    const itemName = document.querySelector("#orderForm").elements[i].name;
                    const itemQuant = document.querySelector("#orderForm").elements[i].value;
                    parseInt(itemQuant)
                    console.log(itemName)
                    console.log(itemQuant)
                
                    for (var j = 0; j < priceListLength; j++) 
                    {
                        if (menuPrices[j][0] === itemName)
                            {
                                const itemPrice =  menuPrices[j][1];
                                console.log(itemPrice)
                                const totalPrice = itemPrice * itemQuant
                                subtotal += totalPrice
                                orderDetails.push({itemName,itemQuant,itemPrice,totalPrice})
                                console.log(orderDetails)
                            }
                    }
                    console.log(subtotal)
                    if(subtotal === 0){
                        noItemsSelectedErrorParag.innerHTML = `
                                            <div class = 'messageToUser' >
                                                <img src="./images/errorIcon.png" alt="">
                                                <p>No items Selected, You have to select one item with a quantity of at least'1'!</p>
                                            </div>`
                                            return false
                    }
                    else return true
            }
            
        }
    }
} 


function generateClientReceipt(){


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


    // const orderDate = date.today()

    submitButton.style.display = 'none'

    noItemsSelectedErrorParag.innerHTML = ""

    OrderDetailsTable.innerHTML =`<th class="tableHead">
                                    <h4 class = "toHideInRecipt" >Your Order Details</h4>
                                    <p class = "toHideInRecipt">Please review your order</p>
                                    </th>
                                    <tr class="orderDateTime">
                                        <td><strong>Order Date: </strong>${orderDate}</td>
                                        <td><strong>Order Time: </strong>${orderTime}</td>
                                    </tr>
                                    <tr class="custDisInfo">
                                        <td ><strong>Customer Name: </strong></td>
                                        <td>${customerName}</td>
                                    </tr>
                                    <tr class="custDisInfo">
                                        <td><strong>Card Number: </strong></td>
                                        <td>${customerCard}</td>
                                    </tr> 
                                    <tr class="custDisInfo">
                                        <td><strong>Customer Address: </strong></td>
                                        <td>${customerAddress}</td>
                                    </tr>
                                    <tr>
                                        <br>
                                    </tr>
                                    `
                                    

    orderDetails.forEach(element => {
        const itemNameRE = /([a-z]+|[A-Z][a-z]*)/g;
        console.log(itemNameRE.test(element.itemName));
        console.log((element.itemName).match(itemNameRE));
        const matchedItemName = (element.itemName).match(itemNameRE)
        const upperCaseArray = matchedItemName.map(element =>{
            const firstletter = element[0].toUpperCase()
            const remainingChar = element.substring(1, element.length+1)
            element = `${firstletter}${remainingChar}`
            return element
        })
        console.log(upperCaseArray)
        const itemNameStringWithComma = upperCaseArray.join(" ")
        const formattedItemName = itemNameStringWithComma.replace(",","")



        const output = `
        <tr>
            <td class="itemName">${formattedItemName}</td>
            <td class="itemPrice">$${element.itemPrice}</td>
            <td class="itemQuan">x${element.itemQuant} </td>
            <td class="itemTotalPrice">$${element.totalPrice}</td>
        </tr>`

        OrderDetailsTable.innerHTML += output
        OrderDetailsTable.style.backgroundColor = "white";
        OrderDetailsTable.style.boxShadow = "5px 5px 5px 2px rgba(109, 122, 126, 0.177)"
    })

    OrderDetailsTable.innerHTML += `
    <hr/>
    <div class ="calculationDiv">
        <tr class = "calc">
            <td>Subtotal</td>
            <td>$${(subtotal).toFixed(2)}</td>
        </tr>
        <tr class = "calc">
            <td>Taxes</td>
            <td>$${(subtotal*0.15).toFixed(2)}</td>
        </tr>
        <tr class = "calc">
            <td colspan="2">
            <hr/>
            </td>
        </tr>
        <tr class = "calc">
            <td>Total</td>
            <td>$${(subtotal* 1.12).toFixed(2)}</td>
        </tr>
        </div>
        <div class="buttonsDiv">
            <button class="cancel" onclick="handleCancel()">Cancel</button>
            <button class="edit" onclick="handleEdit()">Edit</button>
            <button class="confirm" onclick="handleConfirm()">Confirm</button>
        </div>`   
    }



})


// handle confirmation
function handleConfirm(){
    const form = document.querySelector('.orderForm');
    form.style.display = 'none';
    const clientReciptDiv = document.querySelector('.clientReciptDiv');
    const toHideInRecipt = document.querySelectorAll('.toHideInRecipt');
    clientReciptDiv.innerHTML += `<h1>Thank you for your order!</h1> `
    clientReciptDiv.appendChild(OrderDetailsTable);
    const buttonsDiv = document.querySelector('.buttonsDiv')
    buttonsDiv.style.display = 'none'
    toHideInRecipt.forEach(element => element.style.display = 'none')
    OrderDetailsTable.innerHTML += `<div class = 'messageToUser' >
                                    <img src="./images/successIcon.png" alt="">
                                    <p>Order confirmed! Your meal will be prepared shortly!</p>
                                    </div>
                                <a class="anotherOrder" href="order.html">Place Another Order</a>
`
    
}

// handle confirmation
function handleEdit(){
    submitButton.style.display = 'initial'
    orderDetails=[];
    subtotal = 0;
    console.log(orderDetails)
    console.log(subtotal)
    
    OrderDetailsTable.innerHTML = `<p>You can edit your order from the above menu</p>`

    setTimeout(() => {
    OrderDetailsTable.style.backgroundColor = "";
    OrderDetailsTable.style.boxShadow = ""
    OrderDetailsTable.innerHTML =``
    }, 3000);
}

// handle cancellation
function handleCancel(){
    submitButton.style.display = 'initial'
    orderDetails=[];
    subtotal = 0;
    const form = document.querySelector('.orderForm')
    form.reset()
    OrderDetailsTable.style.backgroundColor = "";
    OrderDetailsTable.style.boxShadow = ""
    OrderDetailsTable.innerHTML = `<div class = 'messageToUser' ><img src="./images/successIcon.png" alt="">
                <p>Your order was successfully cancelled!</p></div>`
                setTimeout(() => {
                    OrderDetailsTable.innerHTML = `<table id="orderDetailsTable" >
                    </table>`
                }, 3000);
}
