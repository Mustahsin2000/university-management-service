import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.join(process.cwd(),'.env')});
//pass:5u3gj4MwABZ2ju4v
export default {
    port:process.env.PORT,
    database_url:process.env.DATABASE_URL,
}