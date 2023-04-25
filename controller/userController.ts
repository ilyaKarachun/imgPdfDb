import {Request, Response} from "express"
import {UserRepository} from "../repositories/userRepository"
import {UserDTO} from "../dto/userDTO"

const userRepository = new UserRepository()

export class UserController {
  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await userRepository.getAll()
      if (!users) {
        return res
          .status(404)
          .json({
          message: 'Users not found'
        })
      }
      res
        .status(200)
        .json(users)
    } catch (err) {
      console.log('Can\'t get users. Err is ', err)
      res
        .status(500)
        .json({
        message: 'Error getting users'
      })
    }
  }
  updateUser = async (req: Request, res: Response) => {
    try {
      const email = req.params.mail
      const { firstname, lastname } = req.body;
      const newUser = new UserDTO(
       email, firstname, lastname
      )
      await userRepository.update(newUser)
      res
        .status(200)
        .send(`User modified with email: ${email}`)
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({message: 'Error updating user.'})
    }
  }
  createUser = async (req: Request, res: Response): Promise<void> => {
    const {
      email,
      firstname,
      lastname
    } = req.body
    const newUser = new UserDTO(
      email, firstname, lastname
    )
    try {
      const user = await userRepository.create(newUser)
      res
        .status(200)
        .json(
          {
            data: user,
            message: `user with name ${firstname} created`
          })
    } catch (err) {
      console.log('Can\'t create users. Err is ', err)
      res.status(500)
        .json({
          message: 'Error in creating user'
        })
    }
  }
  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const mail = req.params.mail
    try {
      await userRepository.delete(mail)
      res
        .status(200)
        .json({
          message: `User with mail ${mail} deleted`
        })
    } catch (err) {
      console.log('Can\'t delete users. Err is ', err)
      res.status(500)
        .json({
          message: 'Error in deleting user'
        })
    }
  }
  getByFilter = async (req: Request, res: Response) => {
    const { filterType, filterValue } = req.params
    try {
      const filteredData = await userRepository.filterByParameter(filterType, filterValue);
      if (!filteredData) {
        return res
          .status(404)
          .json({message: `User(s) by ${filterType} not found`});
      }
      res
        .status(200)
        .json(
          {
            data: filteredData,
            message: `User(s) by ${filterType} founded`
          });
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: `Error getting user by ${filterType}` })
    }
  }
}
