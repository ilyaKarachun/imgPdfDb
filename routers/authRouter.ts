import {Router} from "express"
import {AuthController} from "../controller/authController"

const router = Router()
const authController = new AuthController()

router.post('/registry', authController.registry)
router.post('/login', authController.login)

export default router
