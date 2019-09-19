## Assignment 3 - Persistence: Two-Tier Web Application with Flat File Database, Express server, and CSS template

mmdanke-Manasi Danke

## Puppy Pals!
My glitch link: https://a3-manasidanke.glitch.me/

### The goal of the application:

The application allows user, tester, and dogowner, Charlie, to book appointments with Puppy Palls so that he able to book appointments for his dogs to get pampered. He is able to log into his personal account, which saves and displays only his personal information and past booking informatiom. Once he fills out the booking form and specifies what kind of pampering session he wants the pupper to have, that booking is added to his past bookings table. He is even able to update his booking to his satisfaction and can delete it as well. Charlie is able to log out of his account as well.

In this particular situation, Charlie is the only user since Pupply Palls would love to hear his feedback on their prototype before they continue to develop the website.

### Challenges you faced in creating the application:

Although the database does work, I faced a lot of challenges implementing lowdb because I was unsure whether it was saving data in my db.json and db1.json. I was able to use lowdb to achieve the minimal technical requirements of this assignment, but it became increasingly harder to debug when I could not find where my newly registered users were being saved. 

# For that reason, I will assume that Charlie is our only current user with username: charlie and password: charliee 

Besides that, I chose to attempt add, update, and delete booking the last assignment and has a bug with deleting entries since multiple entires would delete at times. I had to spend a while debugging that before I could be fully invested in implementing express, passport, and lowdb as a database.

### What authentication strategy / database you chose to use and why:

I chose to implement lowdb for this particular project since I was not storing too much information in the database. This database is a "slim alternative to a heavyweight" database such as Firebase and made the most sense to use for this particular project,assignment, and time. If Pupper Palls were to get incredibly popular, I would look to switch to Firebase in the future.


### What CSS framework you used and why:

I chose to use Bootstrap for this assignment since it makes the application appear organized and clean.

I only used Bootstrap for the login page, but designed my own template for everything after the inital login page I chose to display with display.style.

### Modifications to the CSS framework I made via custom CSS I authored:

I only used Bootstrap for the login page, deleted the sign in/sing up tab, deleted the forgotted password footer, added my own div container with the Puppy Palls banner to add consistency to the application, added a dog picture, added text, added my own letter animation to "Log In Below", and added a register button, and added a register form.


### The five Express middleware packages I used and a summary of what each one does:

   - Express: a middleware and routing web framework with minimal functionality that listens for requests and calls the appropriate functions.
 - Cookie-parser: "parses cookies attached to the client request object."
 - Passport: authenticates requests through strategies such as the Local strategy(in this example).
 - Helmet: automatically sets various HTTP headers and prevents "sensitive information from unintentially being passed between the server and client."
 - Express.static: serves static files from the path where files are being drawn from by the application
 - Body-parser: parses incoming http request bodies before handlers.
 

## Technical Achievements
- **Tech Achievement 1**: Implemented error checking for username and password, which does not give access to the user if this person inputs the incorrect account details. Please note that the username is charlie and and password is charliee
- **Tech Achievement 2**: Implemented a log out button that signs the user off and returns to the log in page. For increased security, the application automatically signs the user off and returns the user to the login page if the user has the application open to logged when they are signed in.
- **Tech Achievement 3**: I chose to play with style.display to add this new login screen and chose to show it and make it disappear when needed, while not showing the main application page unless the username and password are correct.
- **Note**: I attempted to implement a registration button for another technical achievement, but I am have having difficulties with my database in implementing that.

### Design/Evaluation Achievements
- **Design Achievement 1**: I received a lot of feedback from my friends regarding the login page as I implemented different versions of it. Using this input and suggestions, I chose to hide the main page until the user Login Page, chose to incorporate the Pupper Palls banner to keep the consistency in the application, and added the picture of a dog getting pampered to describe the purpose of the application without too many words.
- **Design Achievement 2**: I added animation to the login page so that the login page slides from above and the username and password entry boxes appear soon after one would read the "Log In Below" heading.

### Resources Used:
 - Similar to last week's assignment, I was able to reference github, w3schools, bootsnip, and formal documentation on passport, lowdb, express, and bootstrap.

