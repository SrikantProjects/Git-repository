import { Component, OnInit } from '@angular/core';
import{ FormGroup,FormBuilder,Validators} from '@angular/forms';
import{Router} from '@angular/router'; 

//making issues service available 
import{ IssueService } from '../../issue.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

createForm:FormGroup;

  //injecting IssuesService,FormBuilder,Router service to constructor
  constructor(private issueService:IssueService,private fb:FormBuilder, private router:Router) { 
    this.createForm=this.fb.group({
      title:['',Validators.required],
      responsible:'',
      description:'',
      severity:''
    });
  }

  addIssue(title,responsible,description,severity){
    this.issueService
    .addIssue(title,responsible,description,severity)
    .subscribe(()=>{
       this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }


}
