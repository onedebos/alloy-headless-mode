# Alloy Headless Mode App

This repository contains a simple demo application based on the [Alloy Headless Mode docs](https://docs.runalloy.com/docs/headless-mode) and the [Alloy Headless Blog](). This demo provides a quick and easy way for users to get started with Alloy exploring Alloy's headless capabilities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Usage](#usage)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install) package manager

## Setup Instructions

### Backend

The backend for this project is written in JavaScript using the Express framework.

1. **Navigate to the backend directory:**

```sh
cd backend
```

2. **Install dependencies:**

```sh
   npm install
```

# or

```sh
yarn install
```

3. **Set up environment variables:**

```sh
cp .env.example .env
```

Update `YOUR_API_KEY` with your actual `API_KEYS` gotten from the Alloy dashboard.

4. Start the backend server

```sh
npm start
```

### Frontend

The frontend for this project is written in JavaScript using the NextJS framework.

1. **Navigate to the frontend directory:**

```sh
cd frontend
```

2. **Install dependencies:**

```sh
   npm install
```

# or

```sh
yarn install
```

3. Start the frontend server

```sh
npm run dev
```

## Usage

Complete the steps above for the backend and frontend. Make sure both servers are running. Navigate to `localhost:3001` to see the Frontend. The backend server will run on `localhost:3000`. The backend handles API requests and interacts with Alloy's services as per the tutorial.
