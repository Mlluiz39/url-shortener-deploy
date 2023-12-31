import mongoose from 'mongoose'

interface ConnectOptions {
  bufferCommands?: boolean
  dbName?: string
  user?: string
  pass?: string
}

export class MongoConnection {
  public async connect(): Promise<void> {
    try {
      mongoose.connect(process.env.MONGO_CONNECTION || '', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      console.log('MongoDB Connected')
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}
