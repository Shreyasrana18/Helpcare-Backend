# HELPCARE Backend

This repository contains the backend code for the HELPCARE project. HELPCARE is a healthcare management system that aims to streamline various aspects of healthcare operations and improve patient care.

### [Documentation](https://documenter.getpostman.com/view/20628687/2s93zH1Jas)

## Technologies Used

- Node.js: A JavaScript runtime environment for executing server-side code.
- Express.js: A web application framework for building APIs and handling HTTP requests.
- MongoDB: A NoSQL database for storing healthcare-related data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- Other libraries and tools as needed.

## Getting Started

To run the HELPCARE backend locally or deploy it to a server, follow the steps below:

1. Clone the repository:

```shell
git clone https://github.com/your-username/helpcare-backend.git
```

2. Install the dependencies:

```shell
cd helpcare-backend
npm install
```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Define the required environment variables in the `.env` file. For example:

     ```
     PORT=5001
     CONNECTION_STRING=mongodb://localhost/helpcare
     ```

4. Start the development server:

```shell
npm start
```

This will start the backend server on the specified port, connecting to the MongoDB database using the provided URI.

## Folder Structure

The repository's folder structure is organized as follows:

- `controllers`: Contains the controller functions for handling different API routes.
- `models`: Defines the Mongoose schemas for the data models.
- `routes`: Contains the route definitions for different API endpoints.
- `middlewares`: Custom middleware functions.
- `config`: Configuration files or modules.
- `utils`: Utility functions or modules.
- `tests`: Test files for automated testing.
- `index.js`: The entry point of the application.

## Contributing

We welcome contributions to the HELPCARE backend. If you want to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Write tests for your changes (if applicable).
5. Run the existing tests and ensure they pass.
6. Commit your changes and push them to your forked repository.
7. Submit a pull request to the main repository.

Please make sure to follow the code style guidelines and provide a clear description of your changes in the pull request.

Thank you for your interest in the HELPCARE project!
