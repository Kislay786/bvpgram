const asyncHandler = require('express-async-handler')
// @ desc Register a new user
// @ routes api/users
// @ access public

const registerUser = asyncHandler (async (req,res) => {
    const {name,email,password} = req.body
    
    // validation

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    
    res.send('reg route')
})

// @ desc Login a user
// @ routes api/users/ogin
// @ access public


const loginUser = asyncHandler (async (req,res) => {
    res.send('login route')
})

module.exports = {
    registerUser,
    loginUser
}