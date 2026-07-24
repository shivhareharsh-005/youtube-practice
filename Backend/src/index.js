
import 'dotenv/config'
import app from './app.js'
import connectDB from './db/database.js'


connectDB()
.then(() => {
     console.log("mongodb connected successfully")
     app.listen(process.env.PORT, ()=>{
        console.log(`server is running on ${process.env.PORT}`)
     })
})
.catch((error) => {
     console.log("mongodb connection error ", error )
})
