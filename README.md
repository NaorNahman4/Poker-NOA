# Poker NOA (Naor Or Adar)

## Description

This project is a multiplayer online poker game implemented in JavaScript, utilizing Node.js, Express.js, socket.io for real-time communication, and a client-side interface built with React.
Also, players can add an AI bot connected to Gemini API to play against.


## Features

- **Login and Registration:** Users can create accounts and log into the system.
- **Leaderboard:** Displays rankings of players based on their performance.
- **Add Money:** Allows players to add virtual currency to their accounts.
- **Add Table:** Enables players to create new tables for gameplay.
- **Statistics:** Provides insights into gameplay metrics and player statistics.
- **Gameplay:** Implements classic Texas Hold'em rules for gameplay.
- **Spectator Mode:** Allows users to watch ongoing games without participating.
- **Add Bot Player**: Human players can add an AI bot player to a table.
  The AI bot player interacts with the server as normal player, using the API


## Bot Player Integration

### Gemini API Integration

The poker game features an AI bot player connected to the Gemini API,
allowing human players to play against intelligent AI opponents.


## Project Structure

The project is structured with a client-server architecture:


## Server

Located in the `server` folder, it uses Express.js with two main routes:
- `/users`: Handles user authentication and registration.
- `/table`: Manages table operations such as creating, joining, and spectating games.
Real-time communication (during an active game) with clients is managed through socket.io in the server. 


## Client

Includes various pages:
- **Login:** Allows users to log into their accounts.
- **Register:** Enables new users to create accounts.
- **Leaderboard:** Displays rankings of players, sorted by number of all time money won.
- **Add Money:** Facilitates adding virtual currency to the user's account.
- **Add Table:** Allows users to create new tables for gameplay.
- **Statistics:** Provides the connected player's statistics.
- **GamePage:** Implements the Texas Hold'em game interface, this is where the game is played.


## Libraries to Install

1. **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
   - Install: `npm install express`

2. **http**: Provides HTTP server and client functionality.
   - Installed by default with Node.js.

3. **path**: Provides utilities for working with file and directory paths.
   - Installed by default with Node.js.

4. **socket.io**: Enables real-time bidirectional event-based communication.
   - Install: `npm install socket.io`

5. **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
   - Install: `npm install cors`

6. **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
   - Install: `npm install mongoose`


## Getting Started

To run the server:
1. Install Node.js and npm.
2. Navigate to the `server` directory.
3. Install dependencies: `npm install`.
4. Start the server: `node App.js`.

To run the client:
1. Install Node.js and npm.
2. Navigate to the client directory.
3. Install dependencies: `npm install`.
4. Start the client application: `npm start`.

Ensure both server and client are running concurrently for full functionality.


## Technologies Used

- **Backend:** Node.js, Express.js, socket.io
- **Frontend:** React, HTML, CSS
- **Database:** MongoDB (Mongoose)

