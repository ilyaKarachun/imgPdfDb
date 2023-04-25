const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

const absolutePath = path.resolve(__dirname, 'database.sql')
const pool = new Pool({
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  database: process.env.NAME_DB
})

fs.readFile(absolutePath, 'utf-8', (err: any, sqlQuery: string) => {
  if (err) throw err;

  pool.query(sqlQuery, (err: any, res: any) => {
    console.log(err)
    if (err) throw err;
    console.log('Script executed successfully')
    pool.end()
  })
})


