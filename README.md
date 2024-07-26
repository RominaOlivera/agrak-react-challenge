# My User Panel

My User Panel is a web application designed to efficiently manage users. It allows for creating, editing, deleting, and viewing users.


## Facility

Make sure you have Node.js and npm (Node Package Manager) installed on your system.

1. Clone this repository to your computer:
   git clone https://github.com/RominaOlivera/agrak-react-challenge.git

2. Navigate to the project directory:
   cd agrak-react-challenge

3. Install the necessary dependencies:
   npm install

## Use

1. To run the application in development mode, use the following command:
   npm run start

2. Open your browser and navigate to the address http://localhost:3000/

3. Interact with the application to efficiently manage users.

## Project Structure

- `src/`: Contains the source code of the application.
  - `components/`: Contains reusable UI components.
    - `Home.tsx`: Displays the home view, including user list and navigation buttons.
    - `UpdateUser.tsx`: Allows updating user details.
    - `CreateUser.tsx`: Provides a form for creating a new user.
    - `UserCard.tsx`: Represents a user card that displays user details.
    - `Modal.tsx`: Handles confirmation modals and other dialogs.
    - `Pagination.tsx`: Manages pagination for the user list.
  - `hooks/`: Contains custom React hooks.
    - `useFormValidation.tsx`: Provides form validation logic and rules.
    - `useForm.tsx`: Manages form state and interactions.
  - `styles/`: Contains the styling for the project.
    - `main.scss`: Sass file with global styles and imports, including variables, mixins, and component styles.
  - `App.tsx`: Main component that sets up routing and renders the application.
  - `index.tsx`: Entry point of the application that renders the `App` component.


## Create User View / Update User View

The Create User and Update User views include the following elements:

- **Form**: A form to create a new user or update an existing user with the following fields:
  - `first_name`: Field to input the user's first name.
  - `second_name`: Field to input the user's second name.
  - `email`: Field to input the user's email address.
  - `avatar`: Field to input the URL of the user's avatar image.

- **Save Button**: 
  - Action: Saves the user (whether new or updated).
  - Behavior: Redirects to the home view upon saving.

- **Cancel Button**: 
  - Action: Cancels the current action.
  - Behavior: Redirects to the home view. A confirmation prompt is shown if there are unsaved changes.

- **Delete Button** (Available only in the Update User view):
  - Action: Deletes the user.
  - Behavior: Redirects to the home view after deletion.

- **Back to Home Button**:
  - Action: Redirects to the home view.
  - Behavior: Returns to the home view without saving changes.

## Technical details

- **Used technology**:
  - **TypeScript**: For safer and more robust programming.
  - **React Query**: For managing the state of the data and handling HTTP requests.
  - **React Router**: For route management and navigation between views.
  - **Axios**: For making HTTP requests.
  - **Bootstrap** and **Sass**: For the design and stylization of the application.


## Api

  - [Api user](https://635017b9df22c2af7b630c3e.mockapi.io/api/v1/users) for user management (create, read, update, delete).



## Deploy
My user panel is available online. You can access it through the following link: [My user panel](https://myuserpanel.vercel.app/)


