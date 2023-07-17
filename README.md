## Book Search Engine
## Description

As an avid reader, I want to have a book search engine where I can search for new books to read and keep a list of books to purchase. This book search engine allows users to search for books, save their favorite books, and access their saved books later. Users can also sign up and log in to the site to have a personalized experience.

## Table of Contents
- User Story
- Acceptance Criteria
- Back-End Specifications
- Front-End Specifications
- Installation
- Usage
- Technologies
- Contributing
- License
- Questions

## User Story

As an avid reader, I want to search for new books to read so that I can keep a list of books to purchase.

## Acceptance Criteria
- The book search engine presents a menu with the options "Search for Books" and "Login/Signup."
- Users can search for books using an input field and a submit button.
- When not logged in, users can enter a search term and click the submit button to view search results with book details and a link to the book on the Google Books site.
- Users can click on the "Login/Signup" menu option to see a modal with options to log in or sign up.
- When signing up, users need to provide a username, email address, and password.
- When logging in, users need to provide their email address and password.
- After logging in, the menu options change to "Search for Books," an option to view saved books, and "Logout."
- When logged in, users can search for books and view search results with an option to save a book to their account.
- Users can view all their saved books, each with book details and a link to the Google Books site and an option to remove a book from their account.
- Users can log out of the site.
- Back-End Specifications
- The back-end of the book search engine needs to be implemented with the following tasks in the provided back-end files:

- auth.js: Update the auth middleware function to work with the GraphQL API.
- server.js: Implement the Apollo Server and apply it to the Express server as middleware.
- Schemas directory:
- index.js: Export the typeDefs and resolvers.
- resolvers.js: Define the query and mutation functionality to work with the Mongoose models.
- Front-End Specifications
- The front-end of the book search engine needs to be implemented with the following tasks in the provided front-end files:

- queries.js: Holds the query GET_ME to execute the me query set up using Apollo Server.
- mutations.js: Contains the following mutation functionalities:
- LOGIN_USER: Executes the loginUser mutation set up using Apollo Server.
- ADD_USER: Executes the addUser mutation.
- SAVE_BOOK: Executes the saveBook mutation.
- REMOVE_BOOK: Executes the removeBook mutation.
- App.js: Creates an Apollo Provider to make every request work with the Apollo server.
- SearchBooks.js:
- Uses the Apollo useMutation() Hook to execute the SAVE_BOOK mutation in the handleSaveBook() function.
- Saves the book's ID to state in the try...catch block.
- SavedBooks.js:
- Uses the Apollo useQuery() Hook to execute the GET_ME query on load and saves it to a variable named userData.
- Uses the Apollo useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function.
- SignupForm.js: Replaces the addUser() functionality with the ADD_USER mutation functionality.
- LoginForm.js: Replaces the loginUser() functionality with the LOGIN_USER mutation functionality.

## Installation

To run the book search engine locally, follow these steps:

- Clone the repository.
- Navigate to the root directory of the project in the terminal.
- Install the required dependencies using the command npm install.

## Usage
To start the application locally, run the following command:

npm start

The book search engine will then be accessible at http://localhost:3000 in your web browser.

## Technologies
The book search engine is built using the following technologies:

- Front-End: React, Apollo Client, JavaScript, HTML, CSS
- Back-End: Node.js, Express.js, Apollo Server, GraphQL
- Database: MongoDB

## Contributing
Contributions to the book search engine are welcome! If you want to contribute, please fork the repository and create a pull request.

## License
This project is licensed under the MIT License.

## Questions
If you have any questions or need further assistance, please feel free to contact me.

GitHub: phuongtoVN
Email: toyenphuong10x@gmail.com



