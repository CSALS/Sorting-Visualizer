import React, { useState, useEffect } from 'react';
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort';
import { getQuickSortAnimations } from '../SortingAlgorithms/QuickSort';
import { getBubbleSortAnimations } from '../SortingAlgorithms/BubbleSort';
import { getInsertionSortAnimations } from '../SortingAlgorithms/InsertionSort';
import { getSelectionSortAnimations } from '../SortingAlgorithms/SelectionSort';

// Constants
let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
let NUMBER_OF_ARRAY_BARS = Math.floor(WINDOW_WIDTH / 8);
const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = '#2db5a3'; // Darker teal color
const SECONDARY_COLOR = '#f43f5e'; // Darker red color
const BACKGROUND_COLOR = '#1e293b'; // Darker background color

const DISABLED_BUTTON = "Currently Disabled";
const ENABLED_BUTTON = {
  nlogn: "O(NlogN) Time Complexity",
  nSquare: "O(N^2) Time Complexity"
};

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
    NUMBER_OF_ARRAY_BARS = Math.floor(WINDOW_WIDTH / 8);
    resetArray();
  };

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, WINDOW_HEIGHT / 2));
    }
    setArray(newArray);
    restoreStoreButtons();
  };

  const disableSortButtons = () => {
    const buttons = ['mergeSort', 'quickSort', 'bubbleSort', 'insertionSort', 'selectionSort'];
    buttons.forEach(id => {
      const button = document.getElementById(id);
      button.disabled = true;
      button.title = DISABLED_BUTTON;
      button.classList.add('opacity-50', 'cursor-not-allowed');
      button.classList.remove('hover:from-teal-500', 'hover:to-blue-600');
    });
  };

  const restoreStoreButtons = () => {
    const buttons = [
      { id: 'mergeSort', title: ENABLED_BUTTON.nlogn },
      { id: 'quickSort', title: ENABLED_BUTTON.nSquare },
      { id: 'bubbleSort', title: ENABLED_BUTTON.nSquare },
      { id: 'insertionSort', title: ENABLED_BUTTON.nSquare },
      { id: 'selectionSort', title: ENABLED_BUTTON.nSquare },
    ];
    buttons.forEach(({ id, title }) => {
      const button = document.getElementById(id);
      button.disabled = false;
      button.title = title;
      button.classList.remove('opacity-50', 'cursor-not-allowed');
      button.classList.add('hover:from-teal-500', 'hover:to-blue-600');
    });
  };

  const mergeSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getMergeSortAnimations(array);
    animateSort(animations);
    const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  const quickSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getQuickSortAnimations(array);
    animateSort(animations);
    const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  const bubbleSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getBubbleSortAnimations(array);
    animateSort(animations);
    const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  const insertionSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getInsertionSortAnimations(array);
    animateSort(animations);
    const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  const selectionSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getSelectionSortAnimations(array);
    animateSort(animations);
    const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  const animateSort = (animations) => {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][0] === "comparision1" || animations[i][0] === "comparision2";
      if (isColorChange) {
        const color = animations[i][0] === "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white p-8 pt-16 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
        Sorting Visualizer
      </h1>
      <div className="mb-12 flex gap-4 flex-wrap justify-center">
        <button
          className="px-6 py-2 rounded-md bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold shadow-lg hover:from-teal-500 hover:to-teal-700 transition-all duration-300"
          onClick={resetArray}
          title="Generates a new random array"
        >
          Generate New Array
        </button>
        <button
          id="mergeSort"
          className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold shadow-lg hover:from-purple-500 hover:to-purple-700 transition-all duration-300"
          onClick={mergeSort}
          title={ENABLED_BUTTON.nlogn}
        >
          Merge Sort
        </button>
        <button
          id="quickSort"
          className="px-6 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
          onClick={quickSort}
          title={ENABLED_BUTTON.nSquare}
        >
          Quick Sort
        </button>
        <button
          id="bubbleSort"
          className="px-6 py-2 rounded-md bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-300"
          onClick={bubbleSort}
          title={ENABLED_BUTTON.nSquare}
        >
          Bubble Sort
        </button>
        <button
          id="insertionSort"
          className="px-6 py-2 rounded-md bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold shadow-lg hover:from-red-500 hover:to-red-700 transition-all duration-300"
          onClick={insertionSort}
          title={ENABLED_BUTTON.nSquare}
        >
          Insertion Sort
        </button>
        <button
          id="selectionSort"
          className="px-6 py-2 rounded-md bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-semibold shadow-lg hover:from-indigo-500 hover:to-indigo-700 transition-all duration-300"
          onClick={selectionSort}
          title={ENABLED_BUTTON.nSquare}
        >
          Selection Sort
        </button>
      </div>
      <div className="w-full h-[calc(100vh-350px)] min-h-[400px] bg-slate-800 rounded-xl p-4 shadow-2xl flex items-end justify-center">
        {array.map((value, idx) => (
          <div
            className="array-bar w-1 mx-px"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;