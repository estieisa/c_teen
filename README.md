## CTeen
My app is for a teen organization called c teen.

## Description
The application is intended for two uses - the user's side and the administrator's side.
User side - every teenager in the organization can register for the organization's events and view his profile in a personal calendar with the registered events
Admin side - the admin will be able to manage the organization - users, events, statistics, etc

## Installation steps:
client:
1. `cd client`, then - `npm i`
2. run `npm start`
server: 
1. `cd server`, then - `npm i`
2. run `nodemon`

## Firebase Setup
1. Create a Firebase project on the Firebase Console - "https://console.firebase.google.com/".

2. Set up Firebase Authentication:
In your Firebase project dashboard, click on "Authentication" in the left sidebar. Navigate to the "Sign-in method" tab. Enable the "Email/Password" and "Google" sign-in methods.

3. Set Up Firestore:
In your Firebase project dashboard, click on "Firestore" in the left sidebar.
Create a Firestore database for your project, and set up its security rules as needed.

4. Set Up Firebase Storage:
In your Firebase project dashboard, click on "Storage" in the left sidebar.
Follow the on-screen instructions to set up your Firebase Storage bucket.

Client-Side Firebase Setup:

1. Initialize Firebase in your app. You'll find the Firebase configuration object in your Firebase project settings (Project settings > General > Your apps > Firebase SDK snippet > Config). Store this configuration object in your client application's .env file in the client/my-app folder. for safe and secure access. Use the following format in your .env file: REACT_APP_FIREBASE_CONFIG=<your-firebase-config-object>   
Replace <your-firebase-config-object> with the actual configuration object you copied. In one line and in JSON string - {"apiKey": "your-api-key", "authDomain": "your-project.firebaseapp.com", ...}



Server-Side Firebase Setup:
1. In a server-side application, you typically need to authenticate with Firebase using an Admin SDK.
To authenticate your server with Firebase, you'll need a service account key JSON file. Here's how to obtain it:
(Firebase Console > your project > Project Settings > Service accounts > Generate new private key).
This will download a JSON file containing the service account key, which is used to authenticate your server with Firebase. Keep this file safe and never share it publicly.
Add the file in the server folder under the name firebasecreds.json.

2. To set your Firebase Storage bucket URL, you need to obtain the URL for your specific Firebase project's storage bucket from the Firebase Console. Follow these steps:
(Firebase Console > Firebase project > project settings > Storage > Under the "Rules" tab, you can see your Firebase Storage bucket URL. It will look something like this: gs://your-project-id.appspot.com).
Store this URL in your server application's .env file in the server folder. for safe and secure access. Use the following format in your .env file: STORAGE_BUCKET=<gs://your-project-id.appspot.com>   


## Nodemailer Configuration
To set up email functionality using Nodemailer in your application, you need to configure certain environment variables. These environment variables are crucial for securing your sensitive email credentials and should not be hard-coded into your codebase. 
Environment Variable Names:

USER: Your Gmail email address or the email address you want to use for sending emails.
PASS: Your Gmail password or an [App Password](https://support.google.com/accounts/answer/185833?hl=en) if you have two-factor authentication enabled on your Gmail account.

Store this Variable in your server application's .env file in the server folder. for safe and secure access.


## Instagram Token Configuration
To interact with the Instagram platform or access user-specific data, you may need to obtain an Instagram token. Here's how to configure an Instagram token for your application:

1. Create an Instagram Developer Account: If you don't already have one, create an Instagram Developer account. You can do this by visiting the Instagram Graph API page and following the instructions. "https://developers.facebook.com/docs/instagram-api/getting-started"

2. Create an Instagram App: After creating an Instagram Developer account, you'll need to create an Instagram app. This app serves as the connection between your application and Instagram.
Follow the on-screen instructions to create your Instagram app. You'll need to provide some basic information about your app.

3. Configure App Permissions: Depending on the functionalities you need, configure the necessary permissions for your Instagram app. This typically includes read or write access to user data, media, or other specific features.

4. Generate an Instagram Token: Once your app is set up, you can generate an Instagram token. This token is used to authenticate your application and access the Instagram API.
The exact process for generating a token can vary, but it often involves making an API request to Instagram with your app's credentials and permissions. Refer to the official Instagram API documentation for the specific steps.

5. Store the Instagram Token Securely: Store this Instagram Token in your server application's .env file in the server folder. for safe and secure access. Use the following format in your .env file: TOKEN_INSTAGRAM=<your-instagram-token>

Remember that the exact process and requirements for obtaining an Instagram token may change over time, so it's important to refer to the official Instagram Developer documentation or API documentation for the most up-to-date instructions.

## Testing and Usage Examples
You can register as a teenager in the organization on the website on the top left. If you would like to see the admin side - you can log in with the following details: email:esti@isAdmin.com password:770770770. Then an option to enter the dashboard will open for you in the menu