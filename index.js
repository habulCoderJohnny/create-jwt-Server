const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();
//middleware
app.use(cors());
app.use(express.json());
//log 
app.get('/', (req,res)=>{
    res.send('Running Jwt token server...');
});

app.post('/login', (req, res)=>{
    const user = req.body;
    console.log(user);
    // DANGER: Do not check password here for serious application
    // USE proper process for hashing and checking
    res.send({'success': true});
})

//log 
app.listen(port,()=>{
    console.log('Listening.....port', port );
})