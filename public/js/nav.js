const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if(scrollY >= 180){
        navbar.classList.add('bg');
    }else{
        navbar.classList.remove('bg');
    }
})

let product_page_link = "product.html"
let login_page_link = "login.html"
let cart_page_link="cart.html"
const createNavbar = () => {
    let navbar = document.querySelector('.navbar');
  
    navbar.innerHTML += `
    <ul class="links-container">
            <li class="link-item"><a href="#" class="link active">home</a></li>
            <li class="link-item"><a href=${product_page_link} class="link">product</a></li>
            <li class="link-item"><a href="#" class="link">about</a></li>
            <li class="link-item"><a href="#" class="link">contact</a></li>

    </ul>;
    <div class="user-interactions">
        <div class="cart">
            <a href="${cart_page_link}"><img src="img/cart.png" class="cart-icon"></a>
            <span class="cart-item-count">00</span>
        </div>
        <div class="user">
        <a href="${login_page_link}"><img src="img/user.png" class="user-icon"></a>
            <div class="user-icon-popup">
                <p>login to your account</p>
                <a>login</a>
            </div>
        </div>
    </div>
    `
     }
    createNavbar();

    // logout pending
    let userIcon = document.querySelector('.user-icon');
    let userPopupIcon = document.querySelector('.user-icon-popup');

    userIcon.addEventListener('click', () => userPopupIcon.classList.toggle('active'))

    let text = userPopupIcon.querySelector('p');
    let actionBtn = userPopupIcon.querySelector('a');
    let user = JSON.parse(sessionStorage.user || null);

    if(user != null){
        text.innerHTML = `log in as ${user.name}`;
        actionBtn.innerHTML = 'log out';
        actionBtn.addEventListener('click',() => logout());
    }
    else{
        text.innerHTML = 'login to your account';
        actionBtn.innerHTML = 'login'
        actionBtn.addEventListener('click', () => location.href = '/login');
    }

    const logout = () => {
        sessionStorage.clear()
        location.reload();
    }