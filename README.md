# Players

An app where users can post a football session when you need a player last minute and other users on this app can chat and join in on the session. Allowing the football session to continue and this way the session isn't cancelled.

Created as I am passionate about football, and the main problem I faced when playing football weekly was people dropping out last minute.

## Demo

<p align="center"><img src="/players.gif" width="260" height="520"></p>

## Remote Hosting

- API is hosted on heroku in https://players-api-final.herokuapp.com/
- Website is deployed on netlify in https://players.netlify.app

## Installation

- Clone or download the repo
- Open terminal and navigate to server folder
- Input `cd server` in terminal to navigate to folder with `Pipfile` file
- Run `pipenv shell` in terminal then `pipenv install` to install dependencies
- Return to lowest directory by inputting `cd ..` in terminal
- Navigate to client folder
- Input `cd client` in terminal to navigate to folder with `package.json` file
- Run npm install to install dependencies

### Usage

- Open a new terminal and navigate to server folder with command `cd server`
- To run the server then input `python manage.py runserver` or `python3 manage.py runserver` in terminal
- Return to base directory with input `cd ..`
- Navigate to client folder with input `cd client`
- Input `npm run start` this command will open client side to http://localhost:3000
- To kill server input `ctrl c` in the live terminal

## Technologies

### Frontend

- React
- CSS
- Firebase

### Backend

- Python
- Django
- SQLite
- JWT

## Wins

- User account creation with Django including authentication & authorisation
- Django REST framework to allow usage with a React frontend
- Well designed UX/UI with alot of own logos
- User profiles having default images, and allowing users to change their profile image and bio on app
- User allowed to create and delete (only if the created the session) sessions
- Filtering through sessions based on 'area' and 'difficulty'
- Using React's conditional rendering to allow different renders depending on who is on the session
- Conditional rendering on image buttons to allow for different images to be used and different classes
- Utilising Firebase as a chat host and conditional rendering to make a dynamic chat (active users messages on the right)

## Challenges

- Chat based functionality using WebSockets
- Deploying images with Django

## Future Features

- Email confirmation
- Use GoogleAPI to use map location of the session
- Allow users to see who has joined their session
- Notifications when a user joins a session, and that chatroom is updated
