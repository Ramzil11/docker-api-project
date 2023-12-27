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
function hasProperty(obj:Object,props:String[]){
  for(const prop of props){
    if(!Object.prototype.hasOwnProperty.call(obj,prop)){
      return false;
    }
  }
  return true;
}

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))

app.get('/users', async (c) => {
    const connection = await mysql.createConnection(mysqlConfig);
    const query=c.req.query()
    if(hasProperty(query,["id"])){
      const [rows] = await connection.execute(`SELECT * FROM users where id=${query["id"]}`);
      connection.end();
      return await c.json({response:200,message:"OK",user:rows[0]},200)
    }
    return c.json({response: 400,message:"Не правильный запрос"}, 400)
})

serve(app)
