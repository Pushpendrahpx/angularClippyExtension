import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router) {
   }

  ngOnInit(): void {
  }
  
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });
  isFetching = false;
  routerLinkVariable = "/home"
  async loginSubmit(tempForm:FormGroup,event:Event){
    this.isFetching = true;
    event.preventDefault();
    let response = await fetch(environment.login_url,{
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({email:tempForm.value.email,password:tempForm.value.password})
    });
    console.log(response)
    let data = await response.json();
    console.log(data)
    this.isFetching = false
    if(response.status == 200 && response.ok){
      localStorage.setItem("jwtToken",data.jwtToken);
      localStorage.setItem("wholeData",JSON.stringify(data));
      this.route.navigate(["/home"]);
    }else{
      alert("Incorrect")
    }
  }
}
