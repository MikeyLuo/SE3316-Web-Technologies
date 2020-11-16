import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modify-schedule',
  templateUrl: './modify-schedule.component.html',
  styleUrls: ['./modify-schedule.component.css']
})

export class ModifyScheduleComponent implements OnInit {

  constructor(private http: HttpClient) { } // inject the dependency as private variable

  @Input() schedName: String = "";

  displayInfo: number;
  allSched: any;
  allCou: any;
  cresched: any;
  addedcou:any;

  ngOnInit(): void {
  }

  searchCou() { // function to display all schedule names as well as number of courses within a schedule name
    this.http.get("http://localhost:3000/api/schedules").subscribe((data: any) => {
      this.displayInfo = 1;
      this.allSched = data;
    })
  }

  createSched(sched) { // function to create a schedule under a given name
    var alpha = /^[a-zA-Z0-9]+$/;
    var blacklist = /^[!=*^%$<>.#+/?(){};'`]+$/;

    if (this.schedName.length > 0 && this.schedName.match(alpha) && !(this.schedName.match(blacklist))) // input validation
    {
      this.http.post(`http://localhost:3000/api/schedules/${this.schedName}`, sched).subscribe((data: any) => {
        this.cresched = data; // if schedule name does not exist then send the data to the json file
      })
    }
    else {
      this.displayInfo = 10; // if schedule name contains invalid characters
    }

    if (this.schedName.length == 0) // if user has not entered a schedule name 
    {
      this.displayInfo = 10;
    }
  }

  addCou() { // function to add courses to an existing schedule
    var alpha = /^[a-zA-Z0-9]+$/;
    var blacklist = /^[!=*^%$<>.#+/?(){};'`]+$/;
    var allexistingcourses = [];

    if (this.schedName.length > 0 && this.schedName.match(alpha) && !(this.schedName.match(blacklist))) // input validation
    {
      let amountofcourses = prompt("How many courses would you like to add?");
      var parseddata = parseInt(amountofcourses);

        for (let i = 0; i < parseddata; i++) {
          let subcode = prompt(`Subject Code ${i + 1}`);
          let coursecode = prompt(`Course Code ${i + 1}`);

          let courseCreated={
            catalog_nbr: coursecode,
            subject: subcode
          }
          
          if (subcode.match(alpha) && !(subcode.match(blacklist)) && subcode.length > 0 && coursecode.match(alpha) && !(coursecode.match(blacklist)) && coursecode.length > 0) {
            allexistingcourses.push(courseCreated);
            console.log(courseCreated)
            this.http.put(`http://localhost:3000/api/schedules/${this.schedName}`,{classes:[courseCreated]}).subscribe((data: any) => {
              console.log(data);
            })
            this.displayInfo=2;
          }
          else{
            this.displayInfo=10;
          }
        }
    }
    else {
      this.displayInfo = 10;
    }
  }


  showCou() {
    var alpha = /^[a-zA-Z0-9]+$/;
    var blacklist = /^[!=*^%$<>.#+/?(){};'`]+$/;

    if (this.schedName.length > 0 && this.schedName.match(alpha) && !(this.schedName.match(blacklist))) // input validation
    {
      this.http.get(`http://localhost:3000/api/schedules/${this.schedName}`).subscribe((data: any) => { // function to display list of subject code and course code under a given schedule name
        this.allCou = data;
      })
      this.displayInfo = 3; // tell the code to display the information 
    }
    else { // if user does not enter valid character
      this.displayInfo = 10;
    }
    if (this.schedName.length == 0) // if user does not enter anything at all
    {
      this.displayInfo = 10;
    }
  }
}

