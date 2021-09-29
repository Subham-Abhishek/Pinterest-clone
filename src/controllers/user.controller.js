const {Router}=require('express')
const User = require('../models/user.model')

const router=Router()

router.post("",(req, res) => {
    console.log(req.body,"req body")
    const user=User.create(req.body)
    res.status(201).json({data:user})
})
module.exports =router