import {Router} from "express"
import {UserController} from "../controller/userController"

const router = Router()
const userController = new UserController()

router.post('/', userController.createUser)
router.get('/', userController.getUsers)
router.get('/:filterType/:filterValue', userController.getByFilter)
router.delete('/:mail', userController.deleteUser)
router.put('/:mail', userController.updateUser)

export default router
