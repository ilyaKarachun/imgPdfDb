import {Router} from "express"
import {PdfController} from "../controller/pdfController"

const router = Router()
const pdfController = new PdfController()

router.post('/', pdfController.generatePDF)

export default router
