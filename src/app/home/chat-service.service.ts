import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
interface dataToSend {
  jwtToken:String
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io.io(environment.ws_url)
  constructor() {
    
   }
   

  setSocketWithEmail = (qdata:any)=>{
    let dataFromStore = localStorage.getItem("wholeData");
    
    dataFromStore = JSON.parse(String(dataFromStore))
    console.log(dataFromStore)
    this.socket.emit("Clippy_setSocketsEmail",dataFromStore);

    this.socket.on("mainRoomData",(data:any)=>{
      alert("SDF")
      console.log(data)
    })

  }

  sendMessageToAll = (data:any)=>{
    this.socket.emit("messageFromClientToAll",{data})
  }

  
  onNewMessage = ()=> {
      
     return Observable.create((observer:any)=>{
       
      this.socket.on("messageToAllFromOneClient",((messageFromOneClient:any,sourceSocketId:any)=>{
        if(!localStorage.getItem("messageStream")){
          localStorage.setItem("messageStream",JSON.stringify([{data:messageFromOneClient,source:sourceSocketId}]))
          
        }else{
          let getOld = JSON.parse(String(localStorage.getItem("messageStream")));
          console.log(getOld)
          getOld.push({data:messageFromOneClient,source:sourceSocketId});
          localStorage.setItem("messageStream",JSON.stringify(getOld))
        }
        observer.next(messageFromOneClient)
      }))
     })
  }

}
