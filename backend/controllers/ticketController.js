const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc get user tickets
// @route GET/api/tickets
// @access Private
const getTickets = asyncHandler (async (req,res) => {
    //Get user using the id in JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

// @desc get user ticket
// @route GET/api/tickets/:id
// @access Private
const getTicket = asyncHandler (async (req,res) => {
    //Get user using the id in JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    res.status(200).json(ticket)
})

// @desc Create user tickets
// @route POST/api/tickets
// @access Private
const createTicket = asyncHandler (async (req,res) => {
    const{category, description} = req.body

    if(!category || !description) {
        res.status(400)
        throw new Error('Please add a category and description')
    }

    //Get user using the id in JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.create({
        category,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

// @desc Delete user ticket
// @route DELETE/api/tickets/:id
// @access Private
const deleteTicket = asyncHandler (async (req,res) => {
    //Get user using the id in JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    await ticket.deleteOne()

    res.status(200).json({success : true})
})

// @desc Update ticket
// @route Put/api/tickets/:id
// @access Private
const updateTicket = asyncHandler (async (req,res) => {
    //Get user using the id in JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new : true})

    res.status(200).json(updatedTicket)
})



module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}
