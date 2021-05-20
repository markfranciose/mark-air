## Mark's Airline Scheduling App

### Test Flying
The basic `create-react-app` scripts are available.
### `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`
Launches the test runner in the interactive watch mode.\

### `yarn build`
Builds the app for production to the `build` folder.\

### Libraries I used
- Axios: basic data fetching
- ESLint: code linting, easy formatting
- Material UI: Base component lib, make styling better out of the box and easier
- Typescript: Take some load in documentation, enforce data requirements in additional to typing
- idx: handle nesting and nullability
- react-beautiful-dnd: List-based HTML5 drag and drop, core UX use
- react-horizontal-stacked-bar-chart: The quickest and dirtiest viz option

### Assumptions
- The 20 minutes downtime in between flights is a minimum, not an exact amount of time
- The 'one airplane one day' simplifying assumption allows for a really simple representation of application state
- It's better to show a user an error than put them in 'validation hell', in re: to business requirements
- Users like drag and drop and can intuatively use such a UX

### Testing Strategy
- Use basic react-testing-lib unit tests
- Use meaningful stubs to test application logic
- Assume the drag and drop and bar chart libs do their job correctly
- If more time was available integration test the functionality that is wrapped up with the 2 above libraries

### Reflections
- Using MUI was helpful for utilizing components, but the styling requirements were simple enough not to use the more complex styling hooks
- processing 1300+ flights requires a more robust design -- eg. filtering, searching
- The drag and drop functionality (and the complexities of sharing Context) required a unit testing pivot
- This was really fun

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
