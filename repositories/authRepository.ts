import {query} from "../db";
import {UserDTO} from "../dto/userDTO";

export class AuthRepository{
  create = async (newUser: UserDTO): Promise<void> => {
    const queryText = `INSERT INTO public.user ( email, firstname, lastname, password )
                        VALUES ($1, $2, $3, $4)`;
    const values = [newUser.email, newUser.firstname, newUser.lastname, newUser.password]
    try {
      await query(queryText, values)
      console.log(`User registered`)
    } catch (err) {
      throw new Error(`Unable to registry user cause err ${err}`)
    }
  }

}
