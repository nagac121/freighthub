This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installed packages

```
npm i sass --save-dev
npm install react-router-dom
npm install json-server --save-dev
```

# Start project

```
yarn start
yarn server
yarn test
yarn build
```

# NPM

```
npm start
npm run server
```

# Project features

**An application which enables the user to view and manage shipments.**

# Contents

- [Business need](#business-need)
- [Use cases](#use-cases)
- [How to run API server](#how-to-run-api-server)

## Business need

The main goal is for the user to check the shipments at a glance. This allows users to take faster decisions and plan ahead of time.

Providing information to the customer increases transparency and reduces communication issues.

## Use cases

- The user shall be able to:
  - See shipments in pages of 20 elements per page
  - Search by shipment id
  - Sort by different fields (e.g. id, name) in ascending/descending order
  - View the shipment information on a separate shipment details page
  - Update the shipment name (should persist when the page is reloaded)

The interactions should not refresh the page.

# Run API server

The project includes a small service for data fetching. The file `db.json` includes all the necessary data to achieve the goal. follow the steps below to start the server:

```
yarn or npm install .
yarn server or npm run server
```

Check [json-server](https://github.com/typicode/json-server) for more information.
