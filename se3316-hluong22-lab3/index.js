const express = require('express'); // Importing the express library
const app = express();
const port = 3000;
const router = express.Router(); // Create the route object

// Parts store
const parts = [
    {id:100,name:'Belt',colour:'brown',stock:0},
    {id:101,name:'Clip',color:'brown',stock:0},
    {id:102,name:'Belt',colour:'red',stock:0},
    {id:103,name:'Hat',colour:'Purple',stock:0}
]

// Setup server front-end code
app.use('/', express.static('static'));

// Setup middleware to do logging
app.use((req,res,next) => // for all routes
{
    console.log(`${req.method} request for ${req.url}`);
    next(); // Keep going
});

// Parse data in body as JSON
router.use(express.json());

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

// Create/replace part data for a given ID
router.put('/:id', (req,res)=>
{
    const newpart = req.body;
    console.log("Part: ", newpart);
    // Add ID field
    newpart.id = parseInt(req.params.id);

    // Replace the part with the new one
    const part = parts.findIndex(p => p.id === newpart.id);
    if (part < 0) // Not found
    { 
        console.log("Creating new part");
        parts.push(newpart);
    }
    else
    {
        console.log("Modifying part ", req.params.id);
        parts[part] = newpart;
    }
    
    res.send(newpart);
});

// Update stock level
router.post('/:id', (req, res) => 
{
    const newpart = req.body;
    console.log("Part: ", newpart);

    // Find the part
    const part = parts.findIndex(p => p.id === parseInt(req.params.id));

    if (part<0) // not found
    {
        res.status(404).send(`Part ${req.params.id} not found`);
    }
    else // If the part is found change the stock property
    {
        console.log("Changing stock for ", req.params.id);
        parts[part].stock += parseInt(req.body.stock); // Stock property must exist in order for this line to work 
        res.send(req.body);
    }
});


app.use('/api/parts', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

