const express = require( 'express' )
const app = express()
const session   = require( 'express-session' ),
      passport  = require( 'passport' ),
      Local     = require( 'passport-local' ).Strategy,
      bodyParser= require( 'body-parser' )

const dir  = 'public/'


app.use( express.static(dir) )
app.use( bodyParser.json() )
app.use(passport.initialize())



app.use( function( req, response, next ) {
  console.log( 'url:', req.url )
  next()
})

app.get( '/bookings', function (req, response) {
  sendData( response, appdata );
})

app.post('/submit', function(req, response){
  const booking = req.body;
        //const groomingPrice=
        const price = addingServices(parseInt(booking.massage), parseInt(booking.dogsize));

        const newbooking = {
          'name_id': booking.name_id,
          'pupper_id':booking.pupper_id,
          'groomingDescription': booking.groomingDescription,
          'massage': parseInt(booking.massage),
          'dogsize': parseInt(booking.dogsize),
          'price': price,
        };

        appdata.push(newbooking);

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        response.end();
})

app.post('/update', function(req, response){
  const bookingToUpdate = req.body;
        const editedPrice = addingServices(parseInt(bookingToUpdate.massage),parseInt(bookingToUpdate.dogsize));

        const updatedbooking = {
          'parent_id':bookingToUpdate.parent_id,
          'name_id': bookingToUpdate.name_id,
          'pupper_id': bookingToUpdate.pupper_id,
          'groomingDescription': bookingToUpdate.groomingDescription,
          'massage': parseInt(bookingToUpdate.massage),
          'dogsize': parseInt(bookingToUpdate.dogsize),
          'price': editedPrice,
        };

        appdata.splice(bookingToUpdate.index, 1, updatedbooking);

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
        response.end();

})

app.post('/delete', function(req, response){
  const bookingToDelete = req.body;
        appdata.splice(bookingToDelete.bookingNumber, 1);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
        response.end();
})
  


const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
     mime = require( 'mime' ),
     port = 3000;

const appdata = [
  { 'name_id': 'Emily', 'pupper_id':'Clifford', 'groomingDescription': 'Haircut', 'massage': 0, 'dogsize': 0, 'price': 25},
  { 'name_id': 'Arthur Read', 'pupper_id':'Pal','groomingDescription': 'Nails Done', 'massage': 5, 'dogsize': 0, 'price': 35},
  { 'name_id': 'Sunyukta', 'pupper_id':'Jingle', 'groomingDescription': 'Haircut', 'massage': 0, 'dogsize': 0, 'price': 25},
  { 'name_id': 'DW Read', 'pupper_id':'Pal','groomingDescription': 'Nails Done', 'massage': 5, 'dogsize': 0, 'price': 35}
];

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  } else if ( request.method === 'POST' ){
    handlePost( request, response ) //communicate from HTML to server
  }
});

//use handleGet to display data structure (server) in UI (server to UI)
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 );
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if ( request.url === '/bookings' ){
    sendData( response, appdata );
  } else {
    sendFile( response, filename );
  }
};



const handlePost = function( request, response ) {
  let dataString = request.body;

  request.on( 'end', function() {
    switch ( request.url ) {
               
      case '/submit':
        const booking = JSON.parse( dataString );
        //const groomingPrice=
        const price = addingServices(parseInt(booking.massage), parseInt(booking.dogsize));

        const newbooking = {
          'name_id': booking.name_id,
          'pupper_id':booking.pupper_id,
          'groomingDescription': booking.groomingDescription,
          'massage': parseInt(booking.massage),
          'dogsize': parseInt(booking.dogsize),
          'price': price,
        };

        appdata.push(newbooking);

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        response.end();

        break;

      case '/update':
        const bookingToUpdate = JSON.parse(dataString);

        const editedPrice = addingServices(parseInt(bookingToUpdate.massage),parseInt(bookingToUpdate.dogsize));

        const updatedbooking = {
          'parent_id':bookingToUpdate.parent_id,
          'name_id': bookingToUpdate.name_id,
          'pupper_id': bookingToUpdate.pupper_id,
          'groomingDescription': bookingToUpdate.groomingDescription,
          'massage': parseInt(bookingToUpdate.massage),
          'dogsize': parseInt(bookingToUpdate.dogsize),
          'price': editedPrice,
        };

        appdata.splice(bookingToUpdate.index, 1, updatedbooking);

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
        response.end();

        break;

      case '/delete':
        const bookingToDelete = JSON.parse(dataString);
        appdata.splice(bookingToDelete.bookingNumber, 1);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
        response.end();

        break;

      default:
        response.end('404 Error: File not found');
        break;
    }
  })
};

const sendData = function( response, bookings ) {
  const type = mime.getType( bookings );
  response.writeHeader(200, { 'Content-Type': type });
  response.write(JSON.stringify({ data: bookings }));
  response.end();
};

const addingServices = function (wantsMassage, bigDog) {
  const baseGroomingPrice = 25;
  const price = (baseGroomingPrice + wantsMassage + bigDog);
  return price;
};

const sendFile = function( response, filename ) {
   const type = mime.getType( filename );

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {
       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type });
       response.end( content )

     } else {
       // file not found, error code 404
       response.writeHeader( 404 );
       response.end( '404 Error: File Not Found' );
     }
   })
};

// a simple table to store non-persistent data. for assignment #3
// your data must be persistent between sessions using a database (lowdb)
const users = [
  { username:'charlie', password:'charliee' },
  { username:'bill',    password:'billl' }  
]

// all authentication requests in passwords assume that your client
// is submitting a field named "username" and field named "password".
// these are both passed as arugments to the authentication strategy.
const myLocalStrategy = function( username, password, done ) {
  // find the first item in our users array where the username
  // matches what was sent by the client. nicer to read/write than a for loop!
  const user = users.find( __user => __user.username === username )
  
  // if user is undefined, then there was no match for the submitted username
  if( user === undefined ) {
    /* arguments to done():
     - an error object (usually returned from database requests )
     - authentication status
     - a message / other data to send to client
    */
    return done( null, false, { message:'user not found' })
  }else if( user.password === password ) {
    // we found the user and the password matches!
    // go ahead and send the userdata... this will appear as request.user
    // in all express middleware functions.
    return done( null, { username, password })
  }else{
    // we found the user but the password didn't match...
    return done( null, false, { message: 'incorrect password' })
  }
}

passport.use( new Local( myLocalStrategy ) )
passport.initialize()

app.post( 
  '/login',
  passport.authenticate( 'local' ),
  function( req, response ) {
    console.log( 'user:', req.user )
    response.json({ status:true })
  }
)
passport.serializeUser( ( user, done ) => done( null, user.username ) )

// "name" below refers to whatever piece of info is serialized in seralizeUser,
// in this example we're using the username
passport.deserializeUser( ( username, done ) => {
  const user = users.find( u => u.username === username )
  console.log( 'deserializing:', name )
  
  if( user !== undefined ) {
    done( null, user )
  }else{
    done( null, false, { message:'user not found; session not restored' })
  }
})

app.use( session({ secret:'cats cats cats', resave:false, saveUninitialized:false }) )
app.use( passport.initialize() )
app.use( passport.session() )

app.post('/test', function( req, response ) {
  console.log( 'authenticate with cookie?', req.user )
  response.json({ status:'success' })
})

//server.listen( process.env.PORT || port );
app.listen(process.env.PORT||3000)
