
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function uniqueAlphabetEntrySetFromString(stringData) {
    const dataAlphabetEntrySet = new Set();
    for (let pos = 0, strLength = stringData.length; pos < strLength; pos += 1) {
        const charAtPos = stringData[pos].toLowerCase();
        if (alphabet.indexOf(charAtPos) !== -1) {
            dataAlphabetEntrySet.add(charAtPos);
        }
    }
    return dataAlphabetEntrySet;
}

// helper function taken from Mozilla
function IsSuperset(subset) {
    for (const elem of subset) {
        if (!this.has(elem)) {
            return false;
        }
    }
    return true;
}

/**
 * It creates a smaller or equal array
 * removing strings that are contained in bigger strings
 */
function trimSubSets(dataRows) {
    return dataRows.filter((row, index) => {
        for (let i = 0, len = dataRows.length; i < len; i += 1) {
            if (i !== index
                && dataRows[i].length > row.length
                && IsSuperset.call(
                uniqueAlphabetEntrySetFromString(dataRows[i]),
                uniqueAlphabetEntrySetFromString(row)
            )) {
                return false;
            }
        }
        return true;
    });
}

/**
 * Returns one array containing one of the possible sets of subsets
 * considered solution to the problem.
 * In this implementation is considered solution the array which covers
 * the alphabet universe with the minimum amount of strings.
 * In this implementation the sets having supersets are discarded.
 */
function processData(dataRowsOrig) {
    let result = [];

    // first step I remove all the sets that are subsets
    const dataRows = trimSubSets(dataRowsOrig);

    // checking the presence of the biggest set covering
    let min = dataRows.reduce((acc, row, rowIndex) => {
        // add all the unique chars
        uniqueAlphabetEntrySetFromString(row)
            .forEach(char => acc.set.add(char));
        // add all the indexes
        acc.rowIndexes.push(rowIndex);
        return acc;
    }, { set: new Set(), rowIndexes: [], });

    // if there's at least a set that covers the alphabet universe
    if (min.set.size === alphabet.length) {
        const dataRowsLength = dataRows.length;
        for (let i = 0; i < dataRowsLength; i += 1) {
            const curr = {
                set: uniqueAlphabetEntrySetFromString(dataRows[i]), // initial set
                rowIndexes: [], // initial array
            };
            curr.rowIndexes.push(i);
            for (let j = 0; j < dataRowsLength; j += 1) {
                if (j !== i) {
                    uniqueAlphabetEntrySetFromString(dataRows[j])
                        .forEach(char => curr.set.add(char));
                    curr.rowIndexes.push(j);
                    // if a min sub set is found we keep it
                    if (curr.set.size === alphabet.length
                        && curr.rowIndexes.length < min.rowIndexes.length) {
                        min = {
                            set: new Set(Array.from(curr.set)),
                            rowIndexes: curr.rowIndexes.slice(0),
                        };
                    }
                }
            }
        }
        result = min.rowIndexes.map(index => dataRows[index]);
    }

    return result;
}

function createProcessDataPromise(dataViewPromise) {
    return new Promise((resolve, reject) => {
        dataViewPromise.then(
            data => resolve(processData(data)),
            err => reject(err)
        );
    });
}

module.exports = {
    uniqueAlphabetEntrySetFromString,
    processData,
    createProcessDataPromise,
};
