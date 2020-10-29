const express = require('express'); // Importing the express library
const app = express();
const port = 3000;
const router = express.Router(); // Create the route object

// Parts store
const parts = [
    {id:100,name:'Belt',colour:'brown'},
    {id:101,name:'Clip',color:'brown'},
    {id:102,name:'Belt',colour:'red'},
    {id:103,name:'Hat',colour:'Purple'}
]

// Setup server front-end code
app.use('/', express.static('static'));

// Setup middleware to do logging
app.use((req,res,next) => // for all routes
{
    console.log(`${req.method} request for ${req.url}`);
    next(); // Keep going
});

// get list of parts
router.get('/', (req, res) => 
{
    // logs the message in the format get request and url
    //console.log(`GET request for ${req.url}`);
    res.send(parts);
});

// Get details for a given part
router.get('/:part_id', (req,res) =>
{
    const id = req.params.part_id; // String value
    //console.log(`GET request for ${req.url}`);
    const part = parts.find(p => p.id === parseInt(id)); // Convert the string to an integer
    if (part){
        res.send(part); // Send the part id if the id was found
    }
    else{
        res.status(404).send(`part ${id} was not found!`);
    }
});

app.use('/api/parts', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

