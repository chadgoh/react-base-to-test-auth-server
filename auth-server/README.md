1. run `npm install`
2. start the server with `node index.js`
3. send POST request to http://localhost:5000/user/generateToken to get a jwt token in the response
4. add token to Authorization header and test against http://localhost:5000/user/validateToken with a GET request
   - should return "Successfuly Verified"
