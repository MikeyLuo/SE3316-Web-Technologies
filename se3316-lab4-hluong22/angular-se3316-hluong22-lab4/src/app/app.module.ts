import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DeleteSchedulesComponent } from './delete-schedules/delete-schedules.component';
import { SearchCodesComponent } from './search-codes/search-codes.component';
import { ModifyScheduleComponent } from './modify-schedule/modify-schedule.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Imports the http client module 
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DeleteSchedulesComponent,
    SearchCodesComponent,
    ModifyScheduleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
