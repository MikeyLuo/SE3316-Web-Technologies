import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-delete-schedules',
  templateUrl: './delete-schedules.component.html',
  styleUrls: ['./delete-schedules.component.css']
})
export class DeleteSchedulesComponent implements OnInit {

  constructor(private http: HttpClient) {}


  @Input() schedName: String ="";
  
  displayInfo: number;

  

  ngOnInit(): void {
  }

  deleteSched(){ // function to delete a schedule for a given name
    var alpha=/^[a-zA-Z]+$/;
    var blacklist=/^[!=*^%$<>.#+/?(){};'`]+$/;

    if(this.schedName.length>0 && (this.schedName.match(alpha)) && !(this.schedName.match(blacklist)))
    {
      this.http.delete(`http://localhost:3000/api/schedules/${this.schedName}`).subscribe((data:any)=>{
      })
      this.displayInfo = 1;
    }
    else{
      this.displayInfo=10;
    }
  }

  deleteAll(){ // function to delete all existing schedules
    this.http.delete("http://localhost:3000/api/schedules").subscribe((data:any)=>{
      })
      this.displayInfo = 2;
  }
}
