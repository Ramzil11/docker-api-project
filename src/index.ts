import { serve } from '@hono/node-server'
import { log } from 'console';
import { Hono } from 'hono'
const mysql = require('mysql2/promise');

const mysqlConfig = {
  host: "mysql_server",
  user: "dan",
  password: "secret",
  database: "test_db",
}

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))

app.get('/users', async (c) => {
    const connection = await mysql.createConnection(mysqlConfig);
         const [rows] = await connection.execute(`SELECT * FROM users`);
    return await c.json(rows)
})

serve(app)
