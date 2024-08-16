export function getHeapSortAnimations(array) {
    let animations = [];
    let auxillaryArray = array.slice();
    heapSort(auxillaryArray, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("sort works correctly? ", arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    return [animations, auxillaryArray];
}

function heapSort(auxillaryArray, animations) {
    const N = auxillaryArray.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
        heapify(auxillaryArray, N, i, animations);
    }

    // One by one extract an element from heap
    for (let i = N - 1; i > 0; i--) {
        animations.push(["comparision1", 0, i]); // Color change for comparison
        animations.push(["comparision2", 0, i]); // Color change for comparison
        animations.push(["swap", 0, auxillaryArray[i]]);
        animations.push(["swap", i, auxillaryArray[0]]);
        swap(auxillaryArray, 0, i);
        heapify(auxillaryArray, i, 0, animations);
    }
}

function heapify(auxillaryArray, N, i, animations) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // left = 2*i + 1
    let right = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (left < N && auxillaryArray[left] > auxillaryArray[largest]) {
        animations.push(["comparision1", left, largest]); // Color change for comparison
        animations.push(["comparision2", left, largest]); // Color change for comparison
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < N && auxillaryArray[right] > auxillaryArray[largest]) {
        animations.push(["comparision1", right, largest]); // Color change for comparison
        animations.push(["comparision2", right, largest]); // Color change for comparison
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        animations.push(["swap", i, auxillaryArray[largest]]);
        animations.push(["swap", largest, auxillaryArray[i]]);
        swap(auxillaryArray, i, largest);
        heapify(auxillaryArray, N, largest, animations);
    }
}

function swap(auxillaryArray, firstIndex, secondIndex) {
    let temp = auxillaryArray[firstIndex];
    auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
    auxillaryArray[secondIndex] = temp;
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