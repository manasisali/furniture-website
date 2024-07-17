        let product = null;
        let cart = [];
        let listproduct = [];
        let productId = null;
        let listproductHTML = document.querySelector('.detail');
        let listCartHTML = document.querySelector('.listCart');
        let iconCartSpan = document.querySelector('.cart span');

      let thisProductValue = null;
        fetch('../product.json')
            .then(response => response.json())
            .then(data => {
                // console.log("p",data)
                product = data;
                showDetail();
               
                if(localStorage.getItem('cart')){
                   
                    cart = JSON.parse(localStorage.getItem('cart'));
                    addCartToHTML();
                    console.log("cart123",cart)
                }

            })

        function showDetail() {

            let detail = document.querySelector('.detail');
            productId = new URLSearchParams(window.location.search).get('id');
            let thisProduct = product.filter(value => {
                return value.id == productId
            })[0];
            thisProductValue = thisProduct;
            // console.log("thisProduct",thisProduct)
            // if (!thisProduct) {
            //     window.location.href = "./";
            // }

            detail.querySelector('.image img').src = thisProduct.image;
            detail.querySelector('.name').innerText = thisProduct.name;
            detail.querySelector('.price').innerText = 'Rs.' + thisProduct.price;

            
            let listproduct = document.querySelector('.listproduct');
            (product.filter(value => value.id != productId))
                .forEach(product => {
                    let newProduct = document.createElement('a');
                    newProduct.href = './detail.html?id=' + product.id;
                    newProduct.classList.add('item');
                    newProduct.dataset.id = product.id
                    // console.log("pid",newProduct.href )
                    newProduct.innerHTML = `
                        <img src ="${product.image}">
                        <h2>${product.name}</h2>
                        
                        <div class="price">${product.price}</div>
                      
                  
                    `;
                    listproduct.appendChild(newProduct);
                })
        }

    function addToCart() { 
        let positionThisProductInCart = cart.findIndex((value) => value.productId == productId);
        // productId = new URLSearchParams(window.location.search).get('id'); // Assign value to productId here
        console.log("cart.length",cart.length)//6
        if (cart.length <= 0) {
            cart = [{
                productId: thisProductValue.id,
                quantity: 1
            }]
        } else if (positionThisProductInCart < 0) {
            cart.push({
                productId: thisProductValue.id,
                quantity: 1
            });
        } else {
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
        }
        console.log("cart values",cart.length)
                addCartToHTML();
                addCartToMemory();
    }

    const addCartToMemory = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const addCartToHTML = () => {
            
            listCartHTML.innerHTML = '';
            let totalQuantity = 0;
            

            if(cart.length > 0){
                cart.forEach(cart => {
                    totalQuantity = totalQuantity + cart.quantity;
                    let newCart = document.createElement('div');
                    newCart.classList.add('item');
                    newCart.dataset.id = cart.productId;
                    let positionProduct = product.findIndex((value) => value.id == cart.productId);
                    let info = product[positionProduct];
                   
                    newCart.innerHTML = `
                    <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalPrice">
                       ${info.price}
                    </div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                    `;
                    listCartHTML.appendChild(newCart);
                   
                })
            }
            iconCartSpan.innerText = totalQuantity;
    }

    listCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
             let productId  = positionClick.parentElement.parentElement.dataset.id;
             let type = 'minus';
             if(positionClick.classList.contains('plus')){
                type = 'plus';
             }
             changeQuantity(productId, type);
        }
    })

    const changeQuantity = (productId, type) => {
        let positionItemCart = cart.findIndex((value) => value.productId == productId)
        if(positionItemCart >= 0){
            switch (type) {
                case 'plus':
                     cart[positionItemCart].quantity = cart[positionItemCart].quantity + 1;
                break;

            default:
                let valueChange = cart[positionItemCart].quantity - 1;
                if(valueChange > 0){
                    cart[positionItemCart].quantity = valueChange;
                }
                else{
                    cart.splice(positionItemCart, 1);
                }
                break;    
            }
        }
        addCartToMemory();
        addCartToHTML();
    }
let iconcart = document.querySelector('.cart-icon');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

iconcart.addEventListener('click', () => {
    
    body.classList.toggle('showCart')
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})


listproductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    // console.log(positionClick.parentElement.dataset)
    if(positionClick.classList.contains('cart-btn')){
        addToCart(thisProductValue);
        // alert(thisProductValue.id);
    }


})

// const addToCart =(thisProductValue) => {
//     let positionThisProductInCart = cart.findIndex((value) => value.thisProductValue == thisProductValue);
//     console.log(positionThisProductInCart);
//     if(cart.length <= 0){
//         cart = [{
//             thisProductValue: thisProductValue.id,
//             quantity: 1
//         }]
//     }
//     else if(positionThisProductInCart < 0){
//         cart.push({
//             thisProductValue: thisProductValue.id,
//             quantity:1
//         });
//     }
//     else{
//         cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
//     }

//      console.log(cart);
// }