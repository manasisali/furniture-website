import express from "express";
import bcrypt from "bcrypt";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDk7DR0gPG--Nw6OsC2HcIq5NARDflSBNc",
  authDomain: "ecom-website-clg.firebaseapp.com",
  projectId: "ecom-website-clg",
  storageBucket: "ecom-website-clg.appspot.com",
  messagingSenderId: "544916852217",
  appId: "1:544916852217:web:78bcd58277bb8ba3060128",
  measurementId: "G-XEC87P1TVT"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
// const analytics = getAnalytics(firebase);

const app = express();

app.use(express.static("public"));
app.use(express.json())

app.get('/',(req,res) => {
    res.sendFile("index.html",{ root : "public" })
})

app.get('/signup', (req, res) => {
    res.sendFile("signup.html",{ root : "public" })
})

app.post("/signup", (req, res) => {
     const{ name, email, password, number, tac} = req.body;

     if(name.length <3 ){
        res.json({'alert':'name must be 3 letters long.'});
    }
    else if(!email.length){
        res.json({'alert':'enter your email.'});
    }
    else if(password.length < 8){
        res.json({'alert':'password must contain 8 letters long.'});
    }
    else if(!Number(number) || number.length < 10){
        res.json({'alert':'invalid number please enter valid one.'});
    }
    // else if(!tac.checked){
    //     res.json({'alert':'you must agree to our term.'});
    // }
    else{

        const users = collection(db, "users");
        getDoc(doc(users,email)).then(user => {
            if(user.exists()){
                return res.json({'alert':'email already exists'})
            }
            else{
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err,hash) => {
                        req.body.password = hash;
                        req.body.seller = false;

                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
                            })
                        }) 
                    })
                })
            }
        })
    }
})

app.get('/login', (req, res) => {
    res.sendFile("login.html", { root : "public"})
})

app.post('/login', (req, res) => {
    let {email, password } = req.body;

    if(!email.length || !password.length){
        res.json({ 'alert' :'fill all the inputs'})
    }

    const users = collection(db, "users");
    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()){
            return res.json({'alert': 'email does not exists'});
        }
        else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                }
                else{
                    return res.json({ 'alert': 'password is incorrect'});
                }
            })
        }
    })
})

app.get('/add-product',(req, res) => {
    res.sendFile('add-product.html', { root: "public"})
})
app.get('/cart',(req, res) => {
    res.sendFile('cart.html', { root: "public"})
})
app.get('/detail',(req, res) => {
    res.sendFile('detail.html', { root: "public"})
})
app.get('/product',(req, res) => {
    res.sendFile('product.html', { root: "public"})
})
// app.get('/checkout',(req, res) => {
//     res.sendFile('checkout.html', { root: "public"})
// })


// let srtipwGateway = stripe(process.env.stripe_key);
// let DOMAIN = process.env.DOMAIN;

// app.post('/stripe-checkout', async(req, res) => {
//     // const sess
// })

app.listen(5500, () => {
    console.log('listening on port 5500');
})

