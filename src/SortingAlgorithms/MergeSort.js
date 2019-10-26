export function getMergeSortAnimations(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    mergeSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log(arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function mergeSort(auxillaryArray, startIndex, endIndex, animations) {
    if(startIndex === endIndex)
        return;
    const middleIndex = Math.floor((startIndex + endIndex)/2);
    mergeSort(auxillaryArray, startIndex, middleIndex, animations);
    mergeSort(auxillaryArray, middleIndex + 1, endIndex, animations);
    merge(auxillaryArray, startIndex, middleIndex, endIndex, animations);
}

function merge(auxillaryArray, startIndex, middleIndex, endIndex, animations) {
    let sortArray = [];
    let i = startIndex;
    let j = middleIndex + 1;
    while(i <= middleIndex && j <= endIndex) {
        //Comparing value at ith and jth index so push them to change their color
        animations.push([i, j]);
        //By changing color we imply that we are comparing those two values and then again we should revert back to their original color so push them again
        animations.push([i, j]);
        if(auxillaryArray[i] <= auxillaryArray[j]) {
            //We should overwrite the value at (i+startIndex)th index with ith index so push them to highlight swap their heights
            animations.push([sortArray.length + startIndex, auxillaryArray[i]]);
            sortArray.push(auxillaryArray[i++]);
        }
        else {
            //We should overwrite the value at (i+startIndex)th index with jth index so push them to highlight swap their heights
            animations.push([sortArray.length + startIndex, auxillaryArray[j]]);
            sortArray.push(auxillaryArray[j++]);
        }
    }
    while(i <= middleIndex) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([sortArray.length + startIndex, auxillaryArray[i]]);
        sortArray.push(auxillaryArray[i++]);
    }
    while(j <= endIndex) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([sortArray.length + startIndex, auxillaryArray[j]]);
        sortArray.push(auxillaryArray[j++]);
    }
    for (let i = startIndex; i <= endIndex; i++) {
        auxillaryArray[i] = sortArray[i - startIndex];
    }
}

function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
    return true;
}