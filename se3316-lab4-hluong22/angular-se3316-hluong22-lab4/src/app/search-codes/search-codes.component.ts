import { Component, NgModule, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-codes',
  templateUrl: './search-codes.component.html',
  styleUrls: ['./search-codes.component.css']
})

export class SearchCodesComponent implements OnInit {

  allClass:any;
  couCode:any;
  classInfo:any;
  classInfo2:any;

  @Input() subject: String ="";
  @Input() cou: String ="";
  @Input() opti: String ="";
    
  displayInfo: number; // creating a displayInfo member 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  searchAll(){ // Function to display all available classes along with its subject code and class name
    this.http.get("http://localhost:3000/api/courses").subscribe((data:any) =>{ // /get request if user wants to display all existing
      this.displayInfo = 1; // tell the code what to display 
      this.allClass=data;
    })
  }
  searchcode(){ // Function to display course information depending on the user input 
    var alpha=/^[a-zA-Z0-9]+$/;
    var blacklist=/^[!=*^%$<>.#+/?(){};'`]+$/;

    if(this.subject.length>0 && this.subject.match(alpha) && !(this.subject.match(blacklist)))
    {
      this.http.get(`http://localhost:3000/api/courses/${this.subject}`).subscribe((data:any)=>{ // get request if user enters in subject code then display corresponding course code
        this.couCode = data;  
        this.displayInfo=2; // tell the code what to display 
      })
    }
    
    if(this.subject.length>0 && this.subject.match(alpha) && !(this.subject.match(blacklist)) && this.cou.length>0 && this.cou.match(alpha) && !(this.cou.match(blacklist)))
    {
      this.http.get(`http://localhost:3000/api/courses/${this.subject}/${this.cou}`).subscribe((data:any)=>{ // get request to display course info if user enters in subject and course code
        this.classInfo=data;
        this.displayInfo = 3;
      })
    }
  }

  showTimeT(){ 
    var alpha=/^[a-zA-Z0-9]+$/;
    var blacklist=/^[!=*^%$<>.#+/?(){};'`]+$/;

    if(this.subject.length>0 && this.subject.match(alpha) && !(this.subject.match(blacklist)) && this.cou.length>0 && this.cou.match(alpha) && !(this.cou.match(blacklist)) &&
    this.opti.length>0 && this.opti.match(alpha) && !(this.opti.match(blacklist))
    ){
      this.http.get(`http://localhost:3000/api/courses/${this.subject}/${this.cou}/?optionalComp=${this.opti}`).subscribe((data:any)=>{ // get request to display course info if user enters in subject, optional component and course code
        this.displayInfo = 4;
        this.classInfo2=data;
      })
    }
    else{
      this.displayInfo=10;
    } 
}

}
