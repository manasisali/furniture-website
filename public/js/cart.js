
let bill = 0;
let product = null;
const placeOrderBtn = document.querySelector('.place-order-btn');
let CartHTML = document.querySelector('.cart-container');
let cart=[]
let cartPrice = document.querySelector('.bill');
// console.log("placeOrderBtn",placeOrderBtn)
placeOrderBtn.addEventListener('click',() => {
    let address = getAddress();

    console.log(address);
})
fetch('../product.json')
.then(response => response.json())
.then(data => {
    // console.log("p",data)
    product = data;
    
   
    cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart)
    CartToHTML();
    cartPrice.innerHTML = bill
})
const getAddress = () => {
   
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let pincode = document.querySelector('#pincode').value;

    if(!address.length || !street.length || !city.length || !state.length || !pincode.length){
        return showFormError("Fill all the inputs");
    }
}





// window.onload=()=>{
   
// }

const CartToHTML = () => {
            
    CartHTML.innerHTML == '';
    let totalQuantity = 0;
    //7
    if(cart.length > 0){
        cart.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.productId;
            let positionProduct = product.findIndex((value) => value.id == cart.productId);
            let info = product[positionProduct];
            bill+=info.price
            newCart.innerHTML = `
            <div class ="cart_checkout_container">
            <div class="cart_image">
                <img src="${info.image}" width=100px height =100px>
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">
               ${info.price}
            </div>
            <div class="quantity">
              
                <span>${cart.quantity}</span>
               
            </div>
            </div>
            `;
            CartHTML.appendChild(newCart);
            
        })
    }
    
}

// const placeOrderBtn = document.querySelector('.place-order-btn');
placeOrderBtn.addEventListener('click',()=>{

    
    // let address=getAddress();
    // if(address){
    //     fetch('/order',{
    //         method:'post',
    //         headers: new Headers({'Content-Type':'application/json'}),
    //         body: JSON.stringify({
    //             order:JSON.parse(localStorage.cart),
    //             email:JSON.parse(sessionStorage.user).email,
    //             add: address,
    //         })
    //     }).then(res=>res.json())
    //     .then(data=>{
          
    //         if(data == 'Your order has been placed'){
    //             showAlert(data,'success');
    //             delete localStorage.cart;
    //             location.replace('/mail.html')
    //         }else{
    //             showAlert(data.alert);

    //         }
    //     })
    // }
})

// const getAddress=()=>{
//     //validation
//     let address=document.querySelector('#address').value;
//     let street=document.querySelector('#street').value;
//     let city=document.querySelector('#city').value;
//     let state=document.querySelector('#state').value;
//     let pincode=document.querySelector('#pincode').value;

//     if(!address.length ||!street.length ||!city.length ||!state.length ||!pincode.length ){
//         return showAlert('fill all the inputs');
//     }else{
//         return {address,street,city,state,pincode}
//     }
// }