const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
    // to save all errorm in { error.log } file //
    level : "error",
    format : winston.format.json(),
    defualt : { service : "user-service" },
    transports : [
        new winston.transports.File({
            filename : "error.log" ,
            level : "error" ,
            format : winston.format.combine(winston.format.timestamp() , winston.format.json())
        }),

        // new winston.transports.Console({level : "info"})

        // to saving in database //

        new winston.transports.MongoDB({
            level : "error" ,
            options : { useUnifiedTopology: true },
            db : 'mongodb://127.0.0.1:27017/rami',
        }),
    ]
});

module.exports = logger;