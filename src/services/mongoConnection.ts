import mongoose from 'mongoose'

const connectionString =  process.env.MONGOURL

export const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(connectionString, 
            {useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
            })
        console.log('db connection', connection.connection.readyState)
    } catch (error) {
        console.log('error from db', error) //TODO handleError
    }
}

const db = mongoose.connection

export default db