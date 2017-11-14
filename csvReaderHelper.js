const fs = require("fs");
const parser = require("csv-parse");

/**
 * Opens a file read stream from filename
 * and pipes into the csv parser with error handling
 */
function parse(filename, onDataCallback, errCallback) {
    const fileReadStream = fs.createReadStream(
        filename,
        { encoding: "utf8", }
    );

    if (typeof errCallback === "function") {
        fileReadStream.on("error", errCallback);
    }

    fileReadStream.on("open", () => {
        const defParserOptions = {
            columns: true, // auto discover cols from fist line
            skip_empty_lines: true,
            ltrim: true, // remove prefix spaces
            rtrim: true, // remove suffix spaces
        };
        fileReadStream.pipe(parser(defParserOptions, onDataCallback));
    });
}

/**
 * Returns a promise that once consumed will resolve
 * parsed csv data ready for being processed.
 */
function createPromise(filename) {
    return new Promise((resolve, reject) => {
        parse(filename, (parserError, csvRows) => {
            if (parserError) {
                reject(parserError);
            } else {
                resolve(csvRows);
            }
        }, err => reject(err));
    });
}

/**
 * Returns a promise that once consumed will resolve
 * a view of the data modified by input callback
 */
function createViewPromise(dataProviderPromise, callback) {
    return new Promise((resolve, reject) => {
        dataProviderPromise.then(
            data => resolve(callback(data)),
            err => reject(err)
        ).catch(err => reject(err));
    });
}

module.exports = {
    parse,
    createPromise,
    createViewPromise,
};
