import { Injectable } from '@angular/core';
//importing the httpclient
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

// adding the url of the localhost
uri="http://localhost:4000";


  //injection httpclient in the constructor
  constructor(private http:HttpClient) { }

  //now, creating the service to get issues from the database

  //creating service to get all the list of issues
  getIssues(){
    return this.http.get(`${this.uri}/issues`);
  }

  //creating service to get particular issue from the list of issues
  getIssueById(id){
    return this.http.get(`${this.uri}/issues/${id}`); 
  }

  //creating service to add issue to the list of issues
  addIssue(title,responsible,description,severity){
    const issue={
      title:title,
      responsible:responsible,
      description:description,
      severity:severity
    };
     return this.http.post(`${this.uri}/issues/create`,issue);
  }

  //creating service to Update particular issue to the list of issues
  updateIssue(id,title,responsible,description,severity,status){
    const issue={
      title:title,
      responsible:responsible,
      description:description,
      severity:severity,
      status:status
    };
     return this.http.post(`${this.uri}/issues/update/${id}`,issue);
  }


  //creating service to delete particular issue from the list of issues
  deleteIssue(id){
    return this.http.get(`${this.uri}/issues/delete/${id}`); 
  }



}
