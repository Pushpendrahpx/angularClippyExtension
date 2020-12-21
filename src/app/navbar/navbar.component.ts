import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  NavbarTitle:String = "Clippy"
  NavbarOptions = [
    {name:"Send",link:"/send"},
    {name:"Profile",link:"/profile"},
    {name:"Settings",link:"/settings"},
    {name:"About",link:"/about"}
  ]
}
