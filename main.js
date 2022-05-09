//cart working js
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}


//making functions
function ready(){
    //remove items from cart
    var removeCartButtons = document.getElementsByClassName('removeItems');
    console.log(removeCartButtons);
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]; 
        button.addEventListener('click',removeCartItem);
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    } 
    //add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}





//remove cart items
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quantity Changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

//add to cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}
function addProductToCart(title,price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert('You have already added this item to the cart');
            return;
        }
    }
    var cartBoxContent = `
                <tr class="cart-box">
                    <td>
                        <img src="RedStore_Img/images/buy-1.jpg" >
                        <div class="cart-info">
                            <p class="cart-product-title">Red Printed Tshirt</p>
                            <br>
                            <i class="fa fa-trash removeItems" >Remove</i>
                        </div>
                    </td>
                    <td><input type="number" value="1" min="1" class="cart-quantity"></td>
                    <td class="cart-price">399</td>
                </tr>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('removeItems')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
}
//Update total
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);

        document.getElementsByClassName('total-Price')[0].innerText = total;
    }
}