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
                        
                        addressErrorMessage.innerText=""
                        let orderDetails=[];
                        let subtotal = 0;
                        const priceListLength = menuPrices.length;
                        console.log(priceListLength)
                        const inputFieldsLength = document.querySelector("#orderForm").elements.length;
                        console.log(inputFieldsLength)
                        for (var i=0; i < inputFieldsLength; i++)
                            {
                                if(document.querySelector("#orderForm").elements[i].value !== "" 
                                && document.querySelector("#orderForm").elements[i].value !== 0)
                                {
                                    const itemName = document.querySelector("#orderForm").elements[i].name;
                                    const itemQuant = document.querySelector("#orderForm").elements[i].value;
                                    parseInt(itemQuant)
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
            
                            orderDetails.forEach(element => {
                                const output = `
                                <tr>
                                    <td>${element.itemName}</td>
                                    <td>${element.itemPrice}$</td>
                                    <td>X</td>
                                    <td>${element.itemQuant} = </td>
                                    <td>${element.totalPrice}$</td>
                                </tr>`
            
                                OrderDetailsTable.innerHTML += output
                            })
            
                    }
                }
               
            }
            
            
        })
    

