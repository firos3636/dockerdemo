const express = require('express');   // Import Express framework
const app = express();                // Create an Express app
const PORT = 3000;                    // Define the port number

// Define a route for the home page
app.get('/', (req, res) => {
  res.send('Hello firos, how are!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
