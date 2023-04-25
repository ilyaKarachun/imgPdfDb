import {query} from "../db"
import {UserDTO} from "../dto/userDTO"

export class UserRepository{
  async getAll() {
    const queryText = `SELECT email, firstname, lastname, image, pdf
                       FROM public.user
                       ORDER BY email`;
    try {
      const result = await query(queryText)
      return result.rows.map(row => new UserDTO(
        row.email,
        row.firstname,
        row.lastname,
        row.image,
        row.pdf
      ))
    } catch (err) {
      throw new Error(`Unable to get all users cause err ${err}`)
    }
  }
  create = async (newUser: UserDTO): Promise<void> => {
    const queryText = `INSERT INTO public.user ( email, firstname, lastname ) VALUES ($1, $2, $3)`;
    const values = [newUser.email, newUser.firstname, newUser.lastname]
    try {
      await query(queryText, values)
      console.log(`User created`)
    } catch (err) {
      throw new Error(`Unable to create user cause err ${err}`)
    }
  }
  delete = async (mail: string): Promise<void> => {
    const queryText = `DELETE FROM public.user WHERE email = $1`;
    const values = [mail]
    try {
      await query(queryText, values)
      console.log(`User deleted`)
    } catch (err) {
      throw new Error(`Unable to find user by err ${err}`)
    }
  }
  async filterByParameter(type: string, value: string | number): Promise<UserDTO[]> {
    const queryText = `SELECT email, firstname, lastname, image, password FROM public.user WHERE ${type} = $1`;
    const values = [value];
    try {
      const result = await query(queryText, values);
      return result.rows.map(row => new UserDTO(
        row.email, row.firstname, row.lastname, row.image, row.password
      ));
    } catch (err) {
      throw new Error(`Unable to get products by ${type} by err ${err}`);
    }
  }
  async update(newUser: UserDTO) {
    const queryText = `UPDATE public.user
        SET firstname = $1, lastname = $2, pdf = $3  WHERE email = $4`;
    const values = [
      newUser.firstname, newUser.lastname,newUser.pdf, newUser.email
    ]
    try {
      await query(queryText, values)
    } catch (err) {
      throw new Error(`Unable to update user with email ${newUser.email} because: ${err}`)
    }
  }
}
