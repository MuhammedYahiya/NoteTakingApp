import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../model/userModel.js"

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("user already exists")
  } else {
    const Users = await User.create({
      name,
      email,
      password,
    })
    if(Users) {
        res.status(201).json({
            _id: User._id,
            name: User.name,
            email: User.email,
            isAdmin: User.isAdmin,
            token : generateToken(User.id)
        })
    }else{
        res.status(400)
        throw new Error("Error occured!")
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const Users = await User.findOne({email})

    if(Users && (await Users.matchPassword(password))){
        res.json({Users, token: generateToken(Users)})
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password")
    }
})

export {registerUser,authUser}
