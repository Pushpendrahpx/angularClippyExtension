import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as env from './../../environments/environment';
import { Subject } from 'rxjs/Rx';
import {ChatService} from './chat-service.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[ChatService]
})

export class HomeComponent implements OnInit {
  constructor(private _chatService:ChatService) {
    this._chatService.setSocketWithEmail({name:"Popu"})
    // this.recievedMessages
    let storage = localStorage.getItem("messageStream");
    
    this.RequestPermission()
  } 
  RequestPermission = async ()=>{
    
    Notification.requestPermission(function(result) {
      if(result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification('Notification with ServiceWorker');
        });
      }
    });
    let DataFromLocalStore = JSON.parse(String(localStorage.getItem("messageStream")));
      this.recieveStream = DataFromLocalStore;
  }


  recieveStream:any[] = []  
  messageToSend:String = "";
  ngOnInit() {
    this._chatService.onNewMessage().subscribe((message:any)=>{
      new Notification("Clippy, New Message Clip from "+message.from,{body:message.data.data.data});
      // console.log(" got a message ",message);
      
       
      
      let DataFromLocalStore = JSON.parse(String(localStorage.getItem("messageStream")));
      this.recieveStream = DataFromLocalStore;


    })
  }
  onChangeInput = (e:any)=>{
    // console.log(e.target.value)
    this.messageToSend = e.target.value;
  }
  onSend = ()=>{
    if(this.messageToSend.length > 0){

      this._chatService.sendMessageToAll(this.messageToSend);

    }else{
      alert("Please Type Something !")
    }
    // alert("Clicked")
  }

}
