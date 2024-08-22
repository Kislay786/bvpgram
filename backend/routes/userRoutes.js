const express = require('express') ;
const router = express.Router() ;

router.post('/', (req,res) => {
    res.send('register router')
})

router.post('/login', (req,res) => {
    res.send('login router')
})

module.exports = router ;
