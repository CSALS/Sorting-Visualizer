# Sorting Visualizer
A visualization for various sorting algorithms like merge sort, heap sort, quick sort, insertion sort, bubble sort and selection sort.<br>
Access it using this link https://csals.github.io/Sorting-Visualizer/.
![](sorting_visualizer.gif)


## NOTES
- in every sorting algo I am returning two comparisions.
- that's because when I am comparing 2 bars first I will change their color to red and again need to change to original color
- for that reason every time 2 bars are compared we need 2 comparisions


## To Be Implemented
- Add a dropdown menu to all sort and submit button to sort.
- Update NUMBER_OF_ARRAY_BARS every time window size is changed
- Find a way to add hover background color to buttons in react (in restore functions)
- Update with sorted array after visualization
- Generalize disableSort,resetSort functions
- Implement heap sort
- Stop the algorithm when reset button is pressed
- Huge thanks to [Clément Mihailescu](https://github.com/clementmihailescu) for this project idea.

## 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
