import {Pool} from 'pg'

const pool = new Pool({
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  host: process.env.HOST_DB,
  port: Number(process.env.PORT_DB),
  database: process.env.NAME_DB
})

export const query = (text: string, params?: any) => pool.query(text,params)
