# Bike Rental

A Node.js based backend project to facilitate renting bikes on an hourly basis. Users can choose their preferred bike and rent it for a specified period.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contact](#contact)

## Project Overview

The main objective of this project is to provide a system where users can rent bikes on an hourly contract. Users can browse available bikes and rent the one they prefer.

## Features

- User registration and authentication
- Bike listing with availability status
- Hourly bike rental system
- Secure password handling using bcrypt

## Technology Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling tool
- **TypeScript**: Typed superset of JavaScript
- **cors**: Middleware for enabling CORS
- **dotenv**: Module to load environment variables
- **http-status**: Constants enumerating HTTP status codes
- **zod**: TypeScript-first schema declaration and validation library
- **bcrypt**: Library to hash and verify passwords

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Mohibbulla-MMM/l2-assignment-3.git
   cd bike-rental
   ```

2. Install the required packages::

   ```bash
    npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add your MongoDB URL and other secrets:

2. Ensure you have a `.env `file in your root directory with the following environment variables:

DB_URL=your_mongodb_url
JWT_ACCESS_SECRET=your_secret_key

## Usage

To run the project locally, use the following command:

```bash
npm run server
```

## Testing

There are no testing frameworks implemented yet. To run the server locally, you can use the following script defined in package.json:

```bash
npm run server
```

## Deployment

Currently, there are no specific deployment guidelines. You can deploy this project on any platform that supports Node.js applications.

## Contact

For any questions or support, you can contact me at: <i>rockychain1020@gmail.com</i>

<hr />

## Project Related link

- [Project Live Server](https://bikerental-coffees-projects.vercel.app/)
- [Project ER Diagram](https://lucid.app/lucidchart/413210ab-44ba-45ac-ba9b-9d5300c6f0fb/edit?viewport_loc=-5981%2C-2561%2C10907%2C4864%2C0_0&invitationId=inv_02fad337-b525-4810-bb10-4c70b2f50314)
- [Project APIs Video](https://bikerental-coffees-projects.vercel.app/)

<hr />
Thank you for using the Bike Rental system. We hope it meets your needs and provides a smooth experience for renting bikes.
