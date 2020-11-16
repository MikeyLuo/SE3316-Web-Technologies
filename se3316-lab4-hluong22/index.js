const express = require("express"); // Importing the express library
const app = express(); // Creating the app object 
const port = 3000; // Defining the web server port number

const courseData = require("./database/Lab3-timetable-data.json"); // Course json file
const schedData = require("./database/Lab3-schedule-data.json"); // Schedule json file
const schedUpdate = "./database/Lab3-schedule-data.json"; // json path
const courseRouter = express.Router(); // Creating the router object
const schedRouter = express.Router(); // Creating the router object
const timetableData = JSON.parse(JSON.stringify(courseData)); // cloning the json file

const fs = require("fs");
const { table } = require("console");

const cors = require("cors"); // importing the cors library

/*var corsOptions = {  // settting the cors object values
    origin: "*", // URL for one local host
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}*/

app.use(cors());

app.use((req, res, next) => { // middleware that is required in order to allow the two local hosts to communicate to each other
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use('/',express.static('static')); // This line of code sets up the front-end code

// This line of code sets up middleware to do the console logging

app.use((req,res,next) => // for all routes
{
    console.log(`${req.method} request for ${req.url}`);
    return next(); // Keep going
});

app.use(express.json());

courseRouter.route('/') // Router function that gets the information of all the available subject and class name
    .get((req,res) =>
    {    
        const subjectAndCode = []; // array
        timetableData.forEach(e=>{ // Iterates through the whole database
            var objarray = 
            { // Object array containing the subject and its respective course number
                subject: e.subject, // gets all the available subjects
                className: e.className, // gets all the available class names
            }
        subjectAndCode.push(objarray); // pushes the found available subjects and class names to the array
        })
        res.send(subjectAndCode); // sends the retrieved information
    })

courseRouter.route('/:subjectcode') // Router function to display all course codes for a given subject code
    // Get details for a given part
    .get((req,res)=>
    {
        const subjectcode = req.params.subjectcode; // Setting subjectcode to the user input
        const coursecode = timetableData.filter(p=> p.subject == subjectcode).map(p=>p.catalog_nbr); // Filters through the database and creates a new array with the found catalog numbers
        if((/^[a-zA-Z0-9]+$/.test(subjectcode)) && subjectcode.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(subjectcode))==false)
        {
            if (coursecode.length==0){
                res.status(404).send(`ERROR - The course code was not found!`);
            }
            else{
                res.send(coursecode);
            }
        }
        else{
            res.status(400).send("ERROR - What you have entered is not valid!")
        }
    })

courseRouter.route('/:subjectcode/:coursecode') // Router function to display the timetable for a given subject code, course code, and additional course component
    .get((req,res)=>
    {
        const subjectcode = req.params.subjectcode;
        const coursecode = req.params.coursecode;
        const optionalComp = req.query.optionalComp; // Sets optionalComp to the URL query parameters that the user enters
        
        let timetableArray=[]; // Creates an array 

        if((/^[a-zA-z0-9]+$/).test(subjectcode) && subjectcode.length>0 && /^[!=*^%$<>.+();{}`']+$/.test(subjectcode)==false)
        {
            if(optionalComp)
            {  
                timetableArray.push(timetableData.find(e=> e.subject == subjectcode && e.catalog_nbr == coursecode && e.course_info[0].ssr_component == optionalComp)); // If the user enters an optional component then push to array
                
                if(optionalComp && timetableArray.length>0 && typeof timetableArray[0]!=="undefined"){ // If the user has entered in an optional component 
                    let array = [];
                    let tableEntry={
                        subject: timetableArray[0].subject,
                        catalog_nbr: timetableArray[0].catalog_nbr,
                        class_sec: timetableArray[0].course_info[0].class_section,
                        facility_ID: timetableArray[0].course_info[0].facility_ID,
                        ssr_component: timetableArray[0].course_info[0].ssr_component,
                        start_time: timetableArray[0].course_info[0].start_time,
                        end_time: timetableArray[0].course_info[0].end_time,
                    }
                    array.push(tableEntry);
                    res.send(array); // Send the components associated with the user input
                }
                else if(timetableArray.length>0 && typeof timetableArray[0]!=="undefined") // If the user has not entered in an optional component
                {
                    let array=[];
                    let tableEntry={
                        subject: timetableArray[0].subject,
                        catalog_nbr: timetableArray[0].catalog_nbr,
                        class_sec: timetableArray[0].course_info[0].class_section,
                        facility_ID: timetableArray[0].course_info[0].facility_ID,
                        ssr_component: timetableArray[0].course_info[0].ssr_component,
                        start_time: timetableArray[0].course_info[0].start_time,
                        end_time: timetableArray[0].course_info[0].end_time,
                    }
                    array.push(tableEntry);
                    res.send(array); // Send the components associated with the user input
                }
                else{
                    res.status(404).send(`Error - That Component you entered does not exist!`) 
                } 
            }
            else if(!optionalComp)
            {
                timetableArray.push(timetableData.find(e=> e.subject == subjectcode && e.catalog_nbr == coursecode)); // If the user does not enter an optional component still push the objects to the array
                
                if(optionalComp && timetableArray.length>0 && typeof timetableArray[0]!=="undefined"){ // If the user has entered in an optional component 
                    let array=[]; // create an empty array
                    let tableEntry={
                        subject: timetableArray[0].subject,
                        catalog_nbr: timetableArray[0].catalog_nbr,
                        class_sec: timetableArray[0].course_info[0].class_section,
                        facility_ID: timetableArray[0].course_info[0].facility_ID,
                        ssr_component: timetableArray[0].course_info[0].ssr_component,
                        start_time: timetableArray[0].course_info[0].start_time,
                        end_time: timetableArray[0].course_info[0].end_time,
                    }
                    array.push(tableEntry); // push the json object into the array so that the back end can send it to the front end
                    res.send(array); // Send the components associated with the user input
                }
                else if(timetableArray.length>0 && typeof timetableArray[0]!=="undefined") // If the user has not entered in an optional component
                {
                    let array=[];
                    let tableEntry={
                        subject: timetableArray[0].subject,
                        catalog_nbr: timetableArray[0].catalog_nbr,
                        class_sec: timetableArray[0].course_info[0].class_section,
                        facility_ID: timetableArray[0].course_info[0].facility_ID,
                        ssr_component: timetableArray[0].course_info[0].ssr_component,
                        start_time: timetableArray[0].course_info[0].start_time,
                        end_time: timetableArray[0].course_info[0].end_time,
                    }
                    array.push(tableEntry);
                    res.send(array); // Send the components associated with the user input
                } 
            }
        }
        else{
            res.status(400).send("ERROR - What have you have entered is not valid!")
        }
    })

schedRouter.route('/:schedName') // Router function to create a new schedule
    .post((req,res)=> // post request to create a new schedule
    {
        const dataSched = JSON.parse(JSON.stringify(schedData)); // parse the json file into a readable string
        const schedinput = req.params.schedName;
        const index = dataSched.findIndex(p=>p.schedName==schedinput); // A way to search through the database

        //let scheduleObj = req.body; // Passed list of classes to the json file 
        if((/^[a-zA-z0-9]+$/).test(schedinput) && schedinput.length>0 && /^[!=*^%$<>.+();{}`']+$/.test(schedinput)==false) // Check for blacklist characters and if what the user entered is valid
        {
            //scheduleObj.schedName=schedName; // Creates the schedule name in the json file
            if(index<0) // If no schedule name exists in the database
            {
                let newschedobj= // create an object with the schedule name component
                {
                    schedName: schedinput,
                }
                    dataSched.push(newschedobj); // Push the components of the found schedule to the database
                    dataArray = JSON.stringify(dataSched); // Turn the object back into a json
                    fs.writeFile(schedUpdate,dataArray,function(err) // Write to the json file with an error callback function
                    { 
                        if(err)
                        {
                            return console.log(err)  
                        }
                    });
                    res.send(dataSched); // Send the schedule 
            }
            else if(index>=0) // If there already exists a schedule name in the database
            {
                res.status(404).send("Error - The schedule name already exists!");
            }
        }
        else { // If the user has entered an invalid input
            res.status(400).send("ERROR - What you have entered is not valid!")
        }
    })
    .put((req,res)=> // put request to add new courses to a given schedule name
    {   
        const dataSched = JSON.parse(JSON.stringify(schedData)); // parse the json file into a readable string
        const schedinput = req.params.schedName;
        const scheduleObj = req.body; // the course and subject code that is passed in the body as json
        const index = dataSched.findIndex(p => p.schedName == schedinput);

        if(/^[a-zA-Z0-9]+$/.test(schedinput) && schedinput.length>0 && /^[!=*^%$<>.+();{}`']+$/.test(schedinput)==false) // Checks to see if what the character has entered is contains characters a-z,A-Z,0-9, and {}, :
        {
            for(i=0;i<=dataSched.length;i++) // For loop to iterate through the whole database
            {  
                if(dataSched.length!=0) // If a schedule name exists 
                {
                    if(dataSched[i].schedName==schedinput)
                    {
                        //console.log(dataSched[1].schedName)
                        dataSched[i].classes=scheduleObj.classes; // Replace the existing schedule info in the database with the new one user has created
                        dataArray = JSON.stringify(dataSched); // Turn the object back into a json
                        fs.writeFile(schedUpdate,dataArray,function(err) // Write to the json file with an error callback function
                        { 
                            if(err)
                            {
                                return console.log(err);
                            }
                        });
                        res.send(dataSched);
                        break; // Break out of the loop once the condition has been satisfied
                    }
                    else{
                        res.status(404).send("Error - The schedule name does not exist!") // Error message if the schedule name does not exist 
                        }
                }
                else{
                    res.status(400).send("Error - There are no existing schedules!") // Error message if the schedule name does not exist 
                    }
            }
        }
        else{
            res.status(400).send("ERROR - What you have entered is not valid!")
        }
    })
    .get((req,res)=> // get request to get the list of subject code and course code under a given schedule name
    {   
        const dataSched = JSON.parse(JSON.stringify(schedData)); // parse the json file into a readable string
        const schedName = req.params.schedName;

        if(/^[a-zA-z0-9]+$/.test(schedName) && schedName.length>0 && /^[!=*^%$<>.+();{}`']+$/.test(schedName)==false)
        {
            let result = (dataSched.find(p=> p.schedName==schedName)); 
            resultArray = JSON.stringify(result)

            if (result) // If the schedule name is found 
            {
                
                res.send(result.classes); // send the respective information 
            }
            else{
                res.status(404).send("Error - The schedule name does not exist!")
            }
        }
        else{
            res.status(400).send("ERROR - What you have entered is not valid!")
        }
    })

schedRouter.route('/:schedName') // router function delete a schedule with a given name
    .delete((req,res)=> // delete request to delete the schedule
    {
        const dataSched = JSON.parse(JSON.stringify(schedData)); // parse the json file into a readable string
        const schedName = req.params.schedName;

        index = dataSched.findIndex(p=>p.schedName===schedName);

        if(/^[a-zA-z0-9]+$/.test(schedName) && schedName.length>0 && /^[!=*^%$<>.+();{}`']+$/.test(schedName)==false)
        {
            if(index<0) // If the schedule name does not exist
            {
                res.status(404).send("Error - The schedule name does not exist!");
            }
            else if(index>=0) // If schedule name exists
            {
                dataSched.splice(index,1); // Delete the object within the database under the given schedule name
                dataArray = JSON.stringify(dataSched); // Turn the object back into a json
                    fs.writeFile(schedUpdate,dataArray,function(err) // Write to the json file with an error callback function
                    { 
                        if(err)
                        {
                            return console.log(err)  
                        }
                    });
                res.status(200).send(`Successfully deleted schedule ${schedName} !`) // status message that displays once the schedule name has been deleted
            }
        }
        else{
            res.status(400).send("ERROR - What you have entered is not valid!")
        }
    })
        
schedRouter.route('/') // router function to get a list of schedule names along with how many courses are within the schedule 
    .get((req,res)=>
    {
        const dataSched = JSON.parse(JSON.stringify(schedData)); // parse the json file into a readable string
        let array = []; // array containing the schedule name and the amount of courses 
            dataSched.forEach((e,i)=>{
                let listArray = {
                    schedName: e.schedName,
                    number_of_courses: dataSched[i].classes.length
                };
                array.push(listArray); // push the schedule name to the array
            });
            res.send((array)); // send the information 
    })

schedRouter.route('/') // router function to delete all of the existing schedules
    .delete((req,res)=>
    {
        let dataSched = JSON.parse(JSON.stringify(schedData)); // make the variable let so we can change it\

        if(dataSched.length>0) // If there are any existing schedules 
        {
            dataSched=[]; // creating the new empty array to be sent to the json file instead of splicing it
            dataArray = JSON.stringify(dataSched); // Turn the object back into a json
            fs.writeFile(schedUpdate,dataArray,function(err) // Write to the json file with an error callback function
            { 
                if(err)
                {
                    return console.log(err)  
                }
            });
            res.status(200).send("Successfully deleted all schedules!") // status to send if the operation was successful
        }
        else if(dataSched.length<=0) // if there are no existing schedules to delete
        {
            res.status(404).send("Error - There are no exisiting schedules to delete!")
        }
    })

app.use("/api/courses",courseRouter) // Installs the router /api/courses
app.use("/api/schedules",schedRouter) // Installs the router /api/schedules

app.listen(port,()=>{ // Listens in on the port number
    console.log(`Listening on port ${port}`);
});
