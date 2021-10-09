import colors from 'colors'
import mongoose from 'mongoose'
import to from 'await-to-js'

const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_CUSTERNAME } = require('./_variables')

const connectionString = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_CUSTERNAME}.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`

const connectionOptions: mongoose.ConnectOptions = {
  // useCreateIndex: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}

const databaseText =
  DATABASE_NAME === 'productionDB'
    ? colors.red(DATABASE_NAME)
    : colors.blue(DATABASE_NAME)

const connectToDatabase = async () => {
  const [error, connection] = await to(
    mongoose.connect(connectionString, connectionOptions)
  )
  if (error)
    console.warn(
      `[DATABASE] Failed to connect to the ${databaseText} database: ${error.message}`
    )
  if (connection)
    console.log(
      `[DATABASE] Connected ${colors.green(
        'successfully'
      )} to the ${databaseText} database!`
    )
  return connection
}

export default connectToDatabase