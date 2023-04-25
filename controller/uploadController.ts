import {Request, Response} from "express"
import {UploadRepository} from "../repositories/uploadRepository";

const uploadRepository = new UploadRepository()

export class UploadController {
  uploadImage = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const file = req.file //ts resolve by new file types but ts-node don't wanna work
      if (!file) {
        res.status(400).send('No file uploaded.')
        return;
      }
      const email = req.body.email
      if (!email) {
        res.status(400).send('Plz! send email')
        return;
      }
        const image = file.buffer.toString('base64')
        await uploadRepository.update(email, image);
        res.status(201).json(`image uploaded to user with email ${email}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving image to database.');
    }
  }
}
