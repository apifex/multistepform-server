import mongoose from 'mongoose'

const connectionString =  process.env.MONGOURL || 'blabla'

try {
    mongoose.connect(connectionString, 
        {useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
        })
} catch (error) {
    console.log(error) //TODO handleError
}

const db = mongoose.connection

export default db