const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();
//middleware
app.use(cors());
app.use(express.json());

//token function
const verifyJWT = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    console.log('inside verify token', authHeader);
    if (!authHeader) {
        res.status(401).send({message: 'unauthorized! not found token'});
    }
    //convert
    const token = authHeader.split(' ')[1];

    // verifying user token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if (err) {
            return res.status(403).send({message:'Forbidden! something wrong with your token'})
        }
        req.decoded = decoded;
        next();
    })
}

//log 
app.get('/', (req,res)=>{
    res.send('Running Jwt token server...');
});

app.post('/login', (req, res)=>{
    const user = req.body;
    console.log(user);
    // DANGER: Do not check password here for serious application
    // USE proper process for hashing and checking
    // After completing all authentication related verification, issue JWT token
    if (user.email === 'user@gmail.com' && user.password === '12345') {
        // 3part-of-jwt 
        const accessToken = jwt.sign({email: user.email},process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'})
        res.send({
            success:true,
            accessToken: accessToken
        })
    }
    else{
        res.send({'success': false});
    }
    
})

// GET TOKEN 
app.get('/orders', verifyJWT, (req, res)=>{
    res.send([{id:1, item:'chicken'}, {id:2, item: 'meals'}])
})

//log 
app.listen(port,()=>{
    console.log('Listening.....port', port );
})