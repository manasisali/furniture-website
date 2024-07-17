const collageImages = [...document.querySelectorAll('.collage-img')]

collageImages.map((item,i) => {
    item.addEventListener('mouseover',() => {
        collageImages.map((image, index) => {
            if(index != i){
                image.style.filter = 'blur(10px)';
                item.style.zIndex = 2;
            }
        })
    })

    item.addEventListener('mouseleave',() => {
        collageImages.map((image, index) => {
            image.style = null
        })

    })  
})


// //cart function

// const add_product_to_cart = product => {
//     let cart = JSON.parse(localStorage.getItem('cart'));

//     if(cart == null){
//         cart = []
//     }

//     product = {
//         item: 1,
//         name: product.name,
//         price: product.price,
//         image: product.image
//     }

//     cart.push(product);
//     localStorage.setItem('cart',JSON.stringify(cart));
//     return 'added';
// }