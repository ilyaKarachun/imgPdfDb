import {Request, Response} from "express"
import {UserRepository} from "../repositories/userRepository"
import {AuthRepository} from "../repositories/authRepository"
import {UserDTO} from "../dto/userDTO"
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const secretKey = 'mysecretkey'

const userRepository = new UserRepository()
const authRepository = new AuthRepository()

export class AuthController {
  registry = async (req: Request, res: Response) => {
    const { emailValue, firstname, lastname, password } = req.body
    const email = 'email'
    try {
      const existingUser = await userRepository.filterByParameter(email, emailValue)
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = new UserDTO(emailValue, firstname, lastname, null, null, hashedPassword  )
      await authRepository.create(user)
      res
        .status(201)
        .json(
          { message: 'User created' }
        )
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: 'Server error' }
        )
    }
  }
  login = async (req: Request, res: Response) => {
    const {emailValue, password} = req.body
    const email = 'email'
    try {
      const existingUser = await userRepository.filterByParameter(email, emailValue)
      if (!existingUser) {
        return res.status(400).json({message: 'Invalid credentials'})
      }
      const isMatch = await bcrypt.compare(password, existingUser[0].password)
      if (!isMatch) {
        return res.status(400).json({message: 'Invalid credentials'})
      }
      const token = jwt.sign({userEmail: existingUser[0].email}, secretKey, {expiresIn: '1h'})
      res
        .status(200)
        .json({token})
    } catch (err) {
      console.error(err)
      res.status(500).json({message: 'Server error'})
    }
  }
}
