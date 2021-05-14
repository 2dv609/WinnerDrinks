import mongoose from 'mongoose';
/**
 * Establishes a connection to a database.
 */
export const connectDB = async () => {
    // Set run validators global
    mongoose.set('runValidators', true);
    // Bind connection to events (to get notifications).
    // Doc: https://mongoosejs.com/docs/connections.html#connection-events
    mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'));
    mongoose.connection.on('error', err => console.error(`Mongoose connection error has occurred: ${err}`));
    mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'));
    // If the Node process ends, close the Mongoose connection.
    // Doc: https://nodejs.org/api/process.html#process_signal_events
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose connection is disconnected due to application termination.');
            process.exit(0);
        });
    });
    const dbConnectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
    // Connect to the server.
    // Doc: https://mongoosejs.com/docs/connections.html
    if (typeof dbConnectionString !== 'string') {
        return;
    }
    mongoose.connect(dbConnectionString, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false // Add to supress deprecation warning https://mongoosejs.com/docs/deprecations.html
    });
};
