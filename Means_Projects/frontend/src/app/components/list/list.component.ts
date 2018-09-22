import { Component, OnInit } from '@angular/core';
//importing router for routing
import{Router} from '@angular/router';
import{ MatTableDataSource} from '@angular/material'; 


//importing the interface for models
import{Issue} from '../../issue.model';
//making issues service available 
import{ IssueService } from '../../issue.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

 //get all th issues from service 
  issues:Issue[];

  //diplaying column using mattable from database

  displayedColumns=['title','responsible','severity','status','actions'];

  //injecting issues service and router service to constructor
  constructor(private issueService:IssueService,private router: Router) { }

  ngOnInit() {
     this.fetchIssues();
  }


  //fetching issues from the database using service method 
  fetchIssues(){
    this.issueService
    .getIssues()
    .subscribe((data:Issue[])=>{
      this.issues=data;
      console.log("Data requested...");
      console.log(this.issues);
    });
  }

  //event handlers method for editing the issues
  editIssue(id){
    this.router.navigate([`/edit/${id}`])
  }

  //event handlers method for deleting the issues
  deleteIssue(id){
    this.issueService
    .deleteIssue(id)
    .subscribe(()=>{
      this.fetchIssues();
    });
  }

}
