import { Request, Response } from "express"
import PDFDocument from "pdfkit"
import { UserRepository } from "../repositories/userRepository"
import { UserDTO } from "../dto/userDTO"
import streamBuffers from "stream-buffers"
import fs  from "fs";

const userRepository = new UserRepository()

export class PdfController {
  generatePDF = async (req: Request<{},{},{emailValue: string}>, res: Response): Promise<void> => {
    const emailValue = req.body.emailValue
    if (!emailValue) {
      res.status(400).json({message: `email value must be received`})
      return;
    }
    let email = 'email'
    try {
      const user: UserDTO[] = await userRepository.filterByParameter(email, emailValue)
      if (!user) {
        res.status(404).json({message: `user by email not found`})
        return;
      }
      const firstName = user[0].firstname
      const lastName = user[0].lastname
      // @ts-ignore
      const image = Buffer.from(user[0].image, 'base64')
      const pdfStream = new streamBuffers.WritableStreamBuffer({
        initialSize: (100 * 1024),
        incrementAmount: (10 * 1024)
      })
      const doc = new PDFDocument()
      doc.pipe(fs.createWriteStream('example.pdf'))
      doc.pipe(pdfStream)
      doc.fontSize(24).text(firstName + ' ' + lastName)
      if (image) {
        doc.image(image, 100, 100, {width: 200})
      }
      doc.end();
      const pdfBuffer = pdfStream.getContents()
      const newUser = new UserDTO(emailValue, firstName, lastName, user[0].image, pdfBuffer.toString('base64'))
      await userRepository.update(newUser)
      res
        .status(200)
        .json({
          success: true,
          message: `user with email ${emailValue} was updated`
        })
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({
          success: false,
          message: `something go wrong with err ${err}`
        })
    }
  }
}
