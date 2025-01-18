# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)





# Smart Gardening

## Description
Smart Gardening is a beginner gardening app that allows users to enter their information in the Input Garden Info form. Once the user clicks search, the app will return 2-3 plants based on the information they provided. The zip code is used to determine the users Plant Hardiness Zone. The other drop down menus are related to what type of plants they want returned. The type of soil they will be using, how much sunlight the plant will get, how much watering needs they are able to provide, and the purpose of the plants ranging from food production to aesthetic. The user will then be able to save those plants and can be viewed by clicking the "My Garden" button. 

The app includes features such as:
- A homepage displaying our app mascot, Plantie, in the form of an animation.
- A form where users can enter their infomation necessary to return plant suggestions.
- A Recommendations section that displays the returned plants with an image and brief description.
- A "Save Plant" button so the users can save a plant to their garden.
- A "My Garden" button where users can view their saved plants from their search or previous searches.
- A button to delete saved plants if the user decides to.

The app is built using React and leverages React Router for navigation. It sends user provided data from the input form to the backend to populate a prompt which is then sent to OpenAI API. Once that response is successful, the returned data is then sent to Google Cloud API via a custom configured search engine. The information returned from the Google Cloud API is displayed for the user with the name of the plant, an image, and a brief description of that plant.

The planning, preparation, and development of this project was completed over the course of 13 days.

## How to Use
1. Visit the deployed site: [Smart Gardening](https://smart-gardening-fe.vercel.app/).
2. Enter your information into the form starting with the zip code then the 5 drop down menus.
3. Once you have entered all of the infomation click the search button below the drop down menus.
4. Under Recommendations the app will return a selection of 2-3 plants based on the information you entered in the form.
5. You can choose to save the plants by clicking the save button.
6. Click the "My Garden" button to view your saved plants. You are given the option to delete a saved plant is desired.
7. Click the "Go Home" at the top right of the page to return to the main page to begin a new search.

## Approaches to Building
- **Component-Driven Development**: The app is structured with reusable components like `MoviesContainer`, `MovieDetails`, and `App` to improve manageability and scalability.
- **React Router**: Implemented for seamless navigation between pages, ensuring a dynamic and user-friendly experience.
- **API Integration**: Data is fetched from a backend API, enabling real-time updates and a responsive voting system.
- **Testing**: End-to-end testing with Cypress ensures the app functions correctly and meets user stories.

## Links
- **Deployed Application**: [Smart Gardening Live Site](https://smart-gardening-fe.vercel.app/)
- **GitHub Back End Repository**: [Smart Gardening Back End Repository](https://github.com/sethverrill/smart-gardening-be)
- **GitHub Front End Repository**: [Smart Gardening Front End Repository](https://github.com/wally-yawn/smart_gardening_fe)
- **GitHub Project Board**: [Project Board](https://github.com/users/sethverrill/projects/5)

## Architecture
![App Architecture Diagram](./architecture.png)

## Team Members
#### Wally Wallace
- [LinkedIn Profile](https://www.linkedin.com/in/wally--wallace)
- [GitHub Profile](https://github.com/wally-yawn)

#### Seth Verrill
- [LinkedIn Profile](https://www.linkedin.com/in/sethverrill)
- [GitHub Profile](https://github.com/sethverrill)

#### Devlin Lynch
- [LinkedIn Profile](https://www.linkedin.com/in/devlin-lynch)
- [GitHub Profile](https://github.com/devklynch)

#### Kaelin Salazar
- [LinkedIn Profile](https://www.linkedin.com/in/kaelin-salazar)
- [GitHub Profile](https://github.com/kaelinpsalazar)

#### Bryan Willett
- [LinkedIn Profile](https://www.linkedin.com/in/bryan--willett)
- [GitHub Profile](https://github.com/bwillett2003)