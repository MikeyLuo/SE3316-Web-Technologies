document.getElementById("searchAll").addEventListener("click",searchAll)
document.getElementById("searchAllsched").addEventListener("click",searchAllsched)
document.getElementById("searchSubject").addEventListener("click",searchSubject)
document.getElementById("searchTimetable").addEventListener("click",searchTimetable)
document.getElementById("searchCourseInSched").addEventListener("click",searchCourseInSched)
document.getElementById("addCourses").addEventListener("click",addCourses)
document.getElementById("create").addEventListener("click",createSched)
document.getElementById("deleteSched").addEventListener("click",deleteSched)
document.getElementById("deleteAll").addEventListener("click",deleteAll)
let allExisting, allSched, sCourse,sTimetable,sCourseInSched,aCourse,cSched,dSched,dAllSched,occupied = false;

resultlist = document.getElementById("result");

function searchAll() // Function to display every available class 
{   
    clearlist();
    var ulist = document.createElement('ul'); // create un ordered list
    ulist.id = "scheduleList" // Give the unordered list an id tag
    fetch("/api/courses")
    .then(res=>res.json()
    .then(data=>{
        data.forEach(e => {
            var olist = document.createElement('li'); // Create the ordered list 
            resultlist.appendChild(ulist) // append the un ordered list to the html div tag
            olist.appendChild(document.createTextNode(`Subject: ${e.subject}, Class Name: ${e.className}`)); // Append the properties to the list
            ulist.appendChild(olist); // append the ordered list to the u list
        }); 
    })
    )
}

function searchSubject()
{
    clearlist();

    const subjectCode = document.getElementById("subjecttext").value.toUpperCase(); // get current input from user as a value
        if((/^[a-zA-Z]+$/.test(subjectCode)) && subjectCode.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(subjectCode))==false) // Check to see if what the user has entered is valis!
        {
            var ulist = document.createElement('ul'); // Create a ul list
            ulist.id = "scheduleList" // Give the ul list an id
            fetch('/api/courses/'+subjectCode) // Fetch data from back end with the route '/api/courses/'+subjectCode
            .then(res => res.json() // reads json 
            .then(data => { // Iterates through the whole data
                data.forEach(e => { // send found data in an array format
                    var olist = document.createElement('li'); // create li list
                    resultlist.appendChild(ulist) // append the ul list to the div tag in html
                    olist.appendChild(document.createTextNode(`${e}`)); // create text node with each element and append it to the li list
                    ulist.appendChild(olist); // append the li list to the ul one
                    });
            })
            )
        }
        else
        {
            alert("ERROR - What you have entered is not valid!") // If the user has not entered a valid input
        }
}

function searchTimetable()
{
    clearlist();

    let subjectCode = document.getElementById("subjecttext").value.toUpperCase();
    let courseCode = document.getElementById("coursetext").value.toUpperCase();
    let optionalComp = document.getElementById('comptext').value.toUpperCase();

    if((/^[a-zA-Z0-9]+$/.test(subjectCode)) && subjectCode.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(subjectCode)==false)
    && (/^[a-zA-Z0-9]+$/.test(courseCode)) && courseCode.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(courseCode)==false))
    {
        var ulist = document.createElement('ul'); // create un ordered list
        ulist.id = "scheduleList"
        resultlist.appendChild(ulist); // appends un ordered list to the div id in html

        fetch('/api/courses/'+subjectCode+'/'+courseCode+((optionalComp == "")? "": "?optionalComp="+optionalComp)) // fetches the router function from back end with the special query URL
        .then(res => {
        if(res.ok){
            res.json()
            .then(data=>{
                data.forEach(e=>{
                    let colorpercomp; // sets colors
                            if(e.ssr_component === "TUT") colorpercomp = "tutorial"; // if the component found is TUT then set the color by setting the atrribute to TUT
                            else if(e.ssr_component === "LAB") colorpercomp = "lab"; // if the component found is LAB then set the color by setting the atrribute to LAB
                            else if(e.ssr_component === "LEC") colorpercomp = "lecture"; // if the component found is LEC then set the color by setting the atrribute to LEC

                            const olist = document.createElement('li');
                            olist.appendChild(document.createTextNode(`Subject: ${e.subject} Course code: ${e.catalog_nbr}`));
                            olist.setAttribute('class', colorpercomp); // Sets list attributes
                            ulist.appendChild(olist);
                            //creating the class section text node
                            const classsect = document.createElement('li');
                            classsect.appendChild(document.createTextNode(`Section: ${e.class_sec}`));
                            classsect.setAttribute('class', colorpercomp);
                            //creating the class component text node
                            const ssr_comp = document.createElement('li');
                            ssr_comp.appendChild(document.createTextNode(`Component: ${e.ssr_component}`));
                            ssr_comp.setAttribute('class', colorpercomp);
                            //creating the class start time text node
                            const starttime = document.createElement('li');
                            starttime.appendChild(document.createTextNode(`Start time: ${e.start_time}`));
                            starttime.setAttribute('class', colorpercomp);
                            //creating the class end time text node
                            const endtime = document.createElement('li');
                            endtime.appendChild(document.createTextNode(`End Time${e.end_time}`));
                            endtime.setAttribute('class', colorpercomp);
                            const newline = document.createElement("br");
                            
                            olist.appendChild(classsect); // Append the created list elements above to the li list
                            olist.appendChild(ssr_comp);
                            olist.appendChild(starttime);
                            olist.appendChild(endtime);
                            olist.appendChild(newline);
                            ulist.appendChild(olist); // Append everything above to the ul list
                });     
            })
        }
        else{
            res.text()
            .then(data=>{
                alert(data); // error message if what the back end sends is not valid
            })
        }
    })
         
    }
    else{
        alert("ERROR - What you have entered is not valid!")
    }      
}

function createSched(){ // Function to create a schedule under a given name so long as the name does not already exist
    let schedname = document.getElementById('schednameText').value; 

    if((/^[a-zA-Z0-9]+$/.test(schedname)) && schedname.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(schedname)==false))
    {
        fetch('/api/schedules/'+schedname, 
        {
            method: "POST" // What action/method the system will perform
        })
        .then(res => {
            if(res.ok){ // If the status message from back end is OK, then send the data
                res.json();
                alert(`The schedule ${schedname} has been sucessfully created`);
            }
            else{ // If status message is not OK, do not send the data
                res.text()
                .then(data => {
                    alert(data)
                });
            }
        })
    }
    else{
        alert("ERROR - What you entered is not valid!")
    }
}

function addCourses(){ // add courses to schedule
    let schedname = document.getElementById('schednameText').value;
    let allexistingcourses = [];
    if((/^[a-zA-Z]+$/.test(schedname)) && schedname.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(schedname)==false))
    {
        let amountofcourses = prompt("How many courses would you like?");
        if((/^[0-9]+$/.test(amountofcourses)) && amountofcourses.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(amountofcourses)==false)) // Checks to see if what the user entered was valid
        {
            for(let i=0;i<amountofcourses;i++){
                let subcode = prompt(`Subject code ${i+1} `);
                let courseCode = prompt(`Course code ${i+1}`);
                    
                let courseCreated = { // create the object array that contains the new courses and subject codes user has entered
                    catalog_nbr: courseCode,
                    subject: subcode
                }

                if((/^[a-zA-Z]+$/.test(subcode)) && subcode.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(subcode)==false) &&  // Checks to see if what the user entered was valid
                (/^[a-zA-Z0-9]+$/.test(courseCode)) && courseCode.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(courseCode)==false))
                {
                    allexistingcourses.push(courseCreated); // If what the user entered is valid then push the user input into an array
                }
                else{
                    alert(`ERROR - What you have entered is not correct! Schedule was not saved!`);
                }
            }
        }
    }
    else{
        alert("ERROR - What you have entered is not correct!")
    }

    if((/^[a-zA-Z]+$/.test(schedname)) && schedname.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(schedname)==false))
    {
        fetch('/api/schedules/'+schedname, {
            method: "PUT", // specifies the request type
            headers: {"Content-type": "application/json"}, // Specifiy the content type
            body: JSON.stringify(allexistingcourses) // convert to a readible string 
        })
        .then(res => {
            if(res.ok){
                res.json();
                alert("Successfully added the course and subject to the schedule!");
            }
            else{
                res.text().then(data => {
                    alert(data);
                });
            }
        })
    }
    
}

function searchCourseInSched(){ // Function to display a specific course in a given schedule
    clearlist();

    let schedname = document.getElementById('schednameText').value;

        if((/^[a-zA-Z0-9]+$/.test(schedname)) && schedname.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(schedname)==false)){
            fetch('/api/schedules/'+schedname, { // specifiying a GET request
                method: "GET"
            })
            .then( res => {
                if(res.ok){ // if the back end sends an OK message
                    res.json()
                    .then(data => {
                        var ulist = document.createElement("ul"); // create ul list and append to the div element on the html side
                        resultlist.appendChild(ulist);
                        data.forEach( (e,i) => { // iterate through the whole data with an index
                            const number = document.createElement('li');
                            coursenum.appendChild(document.createTextNode(`Pair ${i+1}:`)); // creates the text then appends it to the li list
                            const subjcode = document.createElement('li');
                            scode.appendChild(document.createTextNode(`Subject Code: ${e.subject}`)); // creates the text then appends it to the li list
                            const coucode = document.createElement('li');
                            ccode.appendChild(document.createTextNode(`Course Code: ${e.catalog_nbr}`)); // creates the text then appends it to the li list
        
                            ulist.appendChild(number);
                            ulist.appendChild(scode);
                            ulist.appendChild(ccode);
                        });
                    })
                }
                else{
                    res.text().then(data => {
                        alert(data);
                    });
                }
            })
        }
        else{
            alert("ERROR - What you have entered is not valid!")
        }
        
}

function deleteSched(){ // Function to delete a schedule under a given name
    let schedname = document.getElementById('schednameText').value;
    const deleteMethod=
    {
        method: "DELETE",
        headers: {'Content-type': 'application/json; charset=UTF-8'} // Object that declares the delete request, and the content type
    }
 
     if((/^[a-zA-Z0-9]+$/.test(schedname)) && schedname.length>0 && (/^[!=*^%$<>.#+/?(){};'`]+$/.test(schedname)==false))
     {
        fetch('/api/schedules/'+schedname,deleteMethod) // the route function
        .then( res =>
        {
            if(res.ok) // if the back end sends an OK status
            {
                res.json();
                alert(` The Schedule ${schedname} was deleted!`) 
            }
            else{ // If the backend does not send an OK status
                res.text()
                .then(data=>{ // send the error code
                    alert("Error - The schedule name does not exist!")
                })
            }
        })
    }
    else{
        alert("Error - What you have entered is not valid!")
    } 
}

function searchAllsched() // Function to display all existing schedules
{ 
    clearlist();

    var ulist = document.createElement("ul");
    resultlist.appendChild(ulist);
    
    fetch('api/schedules/')
    .then(res => 
        {
        if(res.ok) // make sure the back end sends an OK status
        {
            res.json()
            .then(data => 
            { 
                data.forEach(e => // iterate through the whole database
                {
                let schednamelist = document.createElement('li');
                schednamelist.appendChild(document.createTextNode(`Schedule name: ${e.schedName}`));
                let totalcourse = document.createElement('li');
                totalcourse.appendChild(document.createTextNode(`Number of courses: ${e.number_of_courses}`));
                ulist.appendChild(schednamelist);
                ulist.appendChild(totalcourse);
                });
        
            }) 
        }
        else{
            res.text()
            .then(data=>{
                alert("Error - There are no existing schedules to display!");
            });
        }
    })
    
}

function deleteAll()
{ // Function to delete all schedules 
    const deleteMethod= // Creating an object that contains information on the delete
    {
        method: "DELETE", // Method
        headers: {'Content-type': 'application/json; charset=UTF-8'} // Indicates the content and type
    }
        fetch('/api/schedules',deleteMethod) 
        .then( res =>{
            if(res.ok) // The system checks to make sure that the status message is 200 from back end
            {
                res.json(); 
                alert(` Successfully deleted all schedules!`) // Alert message telling the user that all schedules have been deleted
                .catch(err=>alert("Error - There exists no schedules to delete!")) // Error message
            }
            else{ // If status message is not OK, alert the user of the error
                res.text()
                .then(data=>{
                    alert("There are no existing schedules to delete!");
                })
            }
        })
    
}

function clearlist(){ // Function that removes everything in the existing list 
    while(resultlist.firstChild) // While there is something in the first element 
    resultlist.firstChild.remove();
}
