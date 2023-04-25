import { Router} from "express"
import {UploadController} from "../controller/uploadController"
const multer = require('multer')
const uploadController = new UploadController()
const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.post('/', upload.single('image'),  uploadController.uploadImage)

export default router
