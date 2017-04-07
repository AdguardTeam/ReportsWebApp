//smallest i such that value <= array[i], assuming that the first argument is sorted.
function sortedIndex(array, value) {
    var low = 0,
        high = array.length;
    while (low < high) {
        var mid = (low + high) >>> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}

export function immutableInsert(array, value) {
    var i = sortedIndex(array,value);
    return [...array.slice(0, i), value, ...array.slice(i)];
}

export function immutableDelete(array, value) {
    var i = sortedIndex(array,value);
    return [...array.slice(0,i), ...array.slice(i+1)];
}

// first argument is a sorted array of natural numbers, all less than length.
// get complement of it from [0,1,..., length-1]
export function complement(array, length) {
    var j = 0, result = new Array(0);
    for(var i = 1; i < length; i++) {
        if(i == array[j]) {
            j++
        }
        else {
            Array.prototype.push.call(result, i);
        }
    }
    return result;
}