const express = require('express'); // Importing the express library
const app = express();
const port = 3000;

// Creates basic route 
// When a get request ask for the prefix '/' then execute function 
app.get('/', (req, res) => 
{
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

