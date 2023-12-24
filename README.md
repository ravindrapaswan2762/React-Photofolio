# Description
This React app allows users to manage and view photo albums. Users can create new albums, add images to them, and update or delete images within an album. 
The app uses Firebase Firestore for data storage.

## [Hosted Link](https://react-photo-folio.netlify.app/) 👈

# Features

- **Create New Albums**: Users can create new photo albums to organize their images.

- **Add Images to Albums**: Easily upload and add images to specific albums.

- **Update and Delete Images**: Modify image details or remove images from an album.

- **View Slideshow**: Enjoy a slideshow view of images within an album.

- **Search Functionality**: Quickly find images by using the search functionality based on image text.

# Prerequisites

Before running the app, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- Firebase account (for Firestore setup)

# Installation

1. **Clone the repository:**
  > git clone https://github.com/your-username/photo-album-app.git

2. Change into the project directory:
  > cd photo-album-app

3. Install dependencies:
  > npm install

# Usage
1. Set up Firebase Firestore:
  > Create a project on the Firebase Console.

2. Create a .env file:
  > Add your Firebase configuration to the .env file in the project root:
   >> REACT_APP_FIREBASE_API_KEY=your-api-key
   >> REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   >> REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   >> REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   >> REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   >> REACT_APP_FIREBASE_APP_ID=your-app-id

3. Run the app:
  > npm start

4. Open your browser:
  > Visit http://localhost:3000.

# Firebase Setup
Make sure to set up a Firebase project and Firestore database for the app to work correctly. Update the .env file with your Firebase configuration.

# Contributing
Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.
