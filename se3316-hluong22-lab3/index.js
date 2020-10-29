const express = require('express'); // Importing the express library
const app = express();
const port = 3000;

// Parts store
const parts = [
    {id:100,name:'Belt',colour:'brown'},
    {id:101,name:'Clip',color:'brown'},
    {id:102,name:'Belt',colour:'red'},
    {id:103,name:'Hat',colour:'Purple'}
]

// Setup server front-end code
app.use('/', express.static('static'));


// get list of parts
app.get('/api/parts', (req, res) => 
{
    // logs the message in the format get request and url
    console.log(`GET request for ${req.url}`);
    res.send(parts);
});

// Get details for a given part
app.get('/api/parts/:part_id', (req,res) =>
{
    const id = req.params.part_id; // String value
    console.log(`GET request for ${req.url}`);
    const part = parts.find(p => p.id === parseInt(id)); // Convert the string to an integer
    if (part){
        res.send(part); // Send the part if id was found
    }
    else{
        res.status(404).send(`part ${id} was not found!`);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

