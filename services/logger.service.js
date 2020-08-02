export default class Logger {
    static log(event, message) {
        const time = new Date().toLocaleString();

        // Green time with cyan event and white message
        console.log(`\x1b[32m[${time}] \x1b[36m${event}\x1b[0m ${message}`);
    }

    //TODO: Middleware
}