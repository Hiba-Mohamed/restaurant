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
        ["hummus", 6.99],
        ["ghanoush", 7.49],
        ["falafel",5.99],
        ["dolma",6.49],
        ["labneh",5.99],
        ["shish",16.99],
        ["shawarma",14.99],
        ["adana",15.99],
        ["kofta",15.49],
        ["grill",22.99],
        ["moussaka",13.99],
        ["falafelPlate",11.99],
        ["peppers",12.99],
        ["rice",3.99],
        ["bulgur",4.49],
        ["tabbouleh",4.99],
        ["vegGrill",4.99],
        ["baklava",4.99],
        ["kunafa",5.99],
        ["delight",3.99],
        ["pudding",4.49],
        ["coffee",2.99],
        ["tea",2.49],
        ["ayran",2.99],
        ["juice",3.99],
        ["softDrink",1.99]
    ]
            

        const submitButton = document.querySelector("#orderSubmit")
        submitButton.addEventListener('click', function(e){
            e.preventDefault();

            const customerName = document.querySelector('#customerName').value;
            const customerCard = document.querySelector('#customerCard').value;
            const customerAddress = document.querySelector('#customerAddress').value;
            const nameErrorMessage = document.querySelector('#nameErrorMessage');
            const cardErrorMessage = document.querySelector('#cardErrorMessage');
            const addressErrorMessage = document.querySelector('#addressErrorMessage');
            
            

            if (customerName === "" ){
                nameErrorMessage.innerText = 'Full name must NOT be empty'
            }
            else{
                nameErrorMessage.innerText =""
                if (customerCard === "" ){
                    cardErrorMessage.innerText = 'Card number must NOT be empty'
                }
                else{
                    cardErrorMessage.innerText =""
                    if (customerAddress === ""){
                        addressErrorMessage.innerHTML = 'Address must NOT be empty'
                    }
                    else{

                        //items quantities validation and calculation logic

                        addressErrorMessage.innerText=""
                        let orderDetails=[];
                        let subtotal = 0;
                        const priceListLength = menuPrices.length;
                        console.log(priceListLength)
                        const inputFieldsLength = document.querySelector("#orderForm").elements.length;
                        console.log(inputFieldsLength)
                        for (var i=0; i < inputFieldsLength-3; i++)
                            {
                                if(document.querySelector("#orderForm").elements[i].value !== "" 
                                && document.querySelector("#orderForm").elements[i].value !== 0)
                                {
                                    const itemName = document.querySelector("#orderForm").elements[i].name;
                                    const itemQuant = document.querySelector("#orderForm").elements[i].value;
                                    try {
                                        parseInt(itemQuant)
                                    } 
                                    catch (error) {
                                        console.log(error)
                                        const errorMessage = document.createElement('p');
                                        errorMessage.innerText = 'please enter a valid quantity number';
                                        const itemDiv = document.querySelector('.qaunInput')[i];

                                        itemDiv.appendChild(errorMessage)
                                    }
                                    console.log(itemName)
                                    console.log(itemQuant)
                                
                                    for (var j = 0; j < priceListLength; j++) {
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
            
                                }
                            }
            
                            const OrderDetailsTable = document.querySelector('#orderDetailsTable')
                            OrderDetailsTable.innerHTML =`<th class="tableHead">
                                                            <h4>Your Order Details</h4>
                                                          </th>
                                                          <div class="custDispDiv">
                                                          <tr>
                                                            <td class="custDisInfo">${customerName}</td>
                                                          </tr>
                                                          <tr>
                                                            <td class="custDisInfo">${customerCard}</td>
                                                          </tr> 
                                                          <tr>
                                                            <td class="custDisInfo">${customerAddress} </td>
                                                          </tr>
                                                          <tr>
                                                          <br/>
                                                          </tr>
                                                          
                                                          </div>`
                                                          
            
                            orderDetails.forEach(element => {
                                const output = `
                                <tr>
                                    <td>${element.itemName}</td>
                                    <td>$${element.itemPrice}</td>
                                    <td>x${element.itemQuant} </td>
                                    <td>$${element.totalPrice}</td>
                                </tr>`
            
                                OrderDetailsTable.innerHTML += output
                            })

                            OrderDetailsTable.innerHTML += `
                            <hr/>
                            <div class ="calculationDiv">
                                <tr>
                                    <td>Subtotal</td>
                                    <td>$${subtotal}</td>
                                </tr>
                                <tr>
                                    <td>Taxes</td>
                                    <td>$${(subtotal*0.15).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                    <hr/>
                                    </td>
                                </tr>
                                  <tr>
                                    <td>Total</td>
                                    <td>$${(subtotal* 1.12).toFixed(2)}</td>
                                </tr>
                                </div>`                            
            
                    }
                }
               
            }
            
            
        })
    

