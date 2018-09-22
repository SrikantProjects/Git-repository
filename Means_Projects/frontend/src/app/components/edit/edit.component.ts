import { Component, OnInit } from '@angular/core';
import{ FormGroup,FormBuilder,Validators} from '@angular/forms';
import{Router,ActivatedRoute} from '@angular/router'; 

import{ MatSnackBar} from '@angular/material';

//making issues service available 
import{ IssueService } from '../../issue.service';
import{Issue} from '../../issue.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

//adding class member
 id:String;
 issue:any={};
 updateForm:FormGroup;

  //injecting issues,FormBuilder,Router service to constructor
  constructor(private issueService:IssueService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute, private snackbar : MatSnackBar) { 
     this.createForm();

  }

  createForm(){
    this.updateForm=this.fb.group({
      title:['',Validators.required],
      responsible:'',
      description:'',
      severity:'',
      status:''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
     this.id=params.id;
     this.issueService.getIssueById(this.id).subscribe(res=>{
       this.issue=res;
       this.updateForm.get('title').setValue(this.issue.title);
       this.updateForm.get('responsible').setValue(this.issue.responsible);
       this.updateForm.get('description').setValue(this.issue.description);
       this.updateForm.get('severity').setValue(this.issue.severity);
       this.updateForm.get('status').setValue(this.issue.status);
     });
    });
  }

  updateIssue(title,responsible,description,severity,status){
    this.issueService.updateIssue(this.id,title,responsible,description,severity,status)
    .subscribe(()=>{
      this.snackbar.open('Issue Updated Successfully','Ok',{
        duration:3000
      });
    });
  }

}
