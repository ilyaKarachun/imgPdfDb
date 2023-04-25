import {query} from "../db";

export class UploadRepository{
  update = async (email: string, image: string): Promise<void> => {
    const queryText = `UPDATE public.user
                       SET image = $1
                       WHERE email = $2`;
    const values = [image, email]
    try {
      await query(queryText, values)
      console.log(`User updated by new image`)
    } catch (err) {
      throw new Error(`Unable to update user cause err ${err}`)
    }
  }
}
