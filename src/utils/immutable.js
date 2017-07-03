//smallest i such that value <= array[i], assuming that the first argument is sorted.
function sortedIndex(array, value) {
    let low = 0,
        high = array.length;

    while (low < high) {
        let mid = (low + high) >>> 1;

        if (array[mid] < value) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

export function pushVal(array, value) {
    return [...array, value];
}

export function insVal(array, value) {
    let i = sortedIndex(array,value);
    return [...array.slice(0, i), value, ...array.slice(i)];
}

export function delInd(array, index) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function delVal(array, value) {
    return delInd(array, sortedIndex(array, value));
}

// first argument is a sorted array of natural numbers, all less than length.
// get complement of it from [0,1,..., length-1]
export function complement(array, length) {
    let j = 0, result = new Array(0);

    for (let i = 1; i < length; i++) {
        if (i == array[j]) {
            j++;
        } else {
            Array.prototype.push.call(result, i);
        }
    }

    return result;
}
