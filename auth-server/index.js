// all these require things are just import statements but in a different syntax

const express = require('express'); 
const dotenv = require('dotenv'); 
const jwt = require('jsonwebtoken'); 
const cors = require('cors');


//creates the express server
const app = express(); 


//this cors library helps mitigate the cors error, no need to know too much but if wanna read more > https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// so this is app (the express server) implementing the cors library
app.use(cors())

/* Set up Global configuration access 

dotenv is a library that allows you to load variables from a .env file into the server's properties
basically just allows you to instantiate variables in a secure manner, can go see what's inthe .env file of the project
*/
dotenv.config(); 

/* 
	let the variable PORT = an env variable called PORT if it exists, if not it'll default to 5000
		can try add a PORT variable in .env with another port number and it'll use that instead if you wanna check it out
*/
let PORT = process.env.PORT || 5000; 

//starts the server on the PORT number, then write out to console to indicate the server is up and running
app.listen(PORT, () => { 
console.log(`Server is up and running on ${PORT} ...`); 
}); 


/*
the two methods below is basically express creating HTTP endpoints

app.post for a POST endpoint

app.get for a GET endpoint

In general, the methods take in 2 arguments; a string, and another method
1. the url
2. a method with request and response as arguments
	- the request is the request that it is sent to the endpoint
	- the response object that the endpoint will return
*/



// This method generates the JWT token
app.post("/user/generateToken", (req, res) => { 
	/* Validate User Here so can check for username/password or smth
		
				so example if user credentials is sent with the request it will be validated here
				e.g. check if user exists, check if password correct
	*/

	// Then generate JWT Token 


	// takes the secret key from the .env file
	let jwtSecretKey = process.env.JWT_SECRET_KEY; 

    /*
	can use this data or even the username/pw to sign the token, you can even use a string to sign it like
		let data = "hello"
	*/
	let data = { 
		time: Date(), 
		userId: 1, 
	} 

	// uses the jwt library imported above to sign the token, dont need to know what its doing under the hood, but good to know how JWT works https://jwt.io/introduction
	const token = jwt.sign(data, jwtSecretKey); 


	/* 
	most response methods will be the last thing the endpoint does and typically sends some data back to whoever sent the request
	in this case i just send the raw token back, but can really send anything,like so
		res.send(token, "extra random data", {"more data": "extra stuff"}); 
	*/
	res.send(token); 
}); 

// Verification of JWT with a random endpoint 
app.get("/user/validateToken", (req, res) => { 

    //Authorize by sending requests with Header key: Authorization, Value: Bearer: {token}
	

	// need this to decrypt the jwt token
	let jwtSecretKey = process.env.JWT_SECRET_KEY; 

	try { 

		/*
			the token will come as a key-value pair looking like this 
				authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiV2VkIEZlYiAyNCAyMDIxIDIxOjIzOjQ5IEdNVCswODAwIChTaW5nYXBvcmUgU3RhbmRhcmQgVGltZSkiLCJ1c2VySWQiOjEsImlhdCI6MTYxNDE3MzAyOX0.aDwnnWK-t2m3Q99Qd_MSIWS-BlAHrJCTdx-_shCRgLM


				so i get the value of the header with key "authorization",
				split the value by ' ',
				and take the second object which is the token

		*/
		const token = req.header('Authorization').split(' ')[1]; 
        console.log(token)


		// the jwt library helps verify the token against the secret key
		const verified = jwt.verify(token, jwtSecretKey); 

		// if verified, send success message, else send error
		if(verified){ 
			return res.send("Successfully Verified"); 
		}else{ 
			// Access Denied 
			return res.status(401).send(error); 
		} 
	} catch (error) { 
		// Access Denied 
		return res.status(401).send(error); 
	} 
});
