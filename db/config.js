const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}.prf8o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
let connectionAttempts = 0;
const MAX_CONNECTION_ATTEMPTS = 5;

async function connectToDb() {
  // Attempt to connect to database
  while(connectionAttempts < MAX_CONNECTION_ATTEMPTS) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
  
      connectionAttempts = MAX_CONNECTION_ATTEMPTS + 1;
      console.log('Connected to database successfully ...')
      return;
    } catch (error) {
      // TODO: handle error
      connectionAttempts += 1;
    }
  }

  // ERROR: couldn't connect
  console.log('Could not connect to database, attempted connection: ', connectionAttempts)
;}

connectToDb();

mongoose.connection.on('error', (error) => {
  // TODO: LOG ERROR
});

module.exports = mongoose;
