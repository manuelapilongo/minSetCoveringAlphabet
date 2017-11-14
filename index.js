const console = require("console");

const {
    createPromise: createCsvReaderPromise,
    createViewPromise: createCsvDataViewPromise,
} = require("./csvReaderHelper.js");

const minSetCoveringAlphabet = require("./minSetCoveringAlphabet.js");


const csvDataProviderPromise = createCsvReaderPromise("./londonStations.csv");
const csvDataViewPromise = createCsvDataViewPromise(
    csvDataProviderPromise,
    csvRows => csvRows.map(csvRow => csvRow.Station) // strategy to build the data view from the csv
);

// start processing the data offered by the data provider (csv in this case)
// reduced to a view containing only data returned by the defined strategy.
minSetCoveringAlphabet
    .createProcessDataPromise(csvDataViewPromise)
    .then(resultArray => console.log(resultArray), err => console.error(err))
    .catch(err => console.error(err));
