import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Drawer{
  visible:boolean
}
const drawer ={
  visible:false
}

export interface Room {
  id: number;
  city: string;
  country: string;
  superHost: boolean;
  title: string;
  rating: number;
  maxGuests: number;
  type: string;
  beds: number;
  photo: string;
}

export interface Hosting {
  city:string,
  location:string
  guestsLabel:string,
  guestsNumber:number
}

export interface resultRoomMetaData{
  country:string,
  numberResults:number
}

@Injectable({
  providedIn: 'root'
})


export class DataService {
  private readonly API = 'http://localhost:3005/response'
  private drawer$ = new BehaviorSubject<Drawer>(drawer)
  private hosting$ = new Subject<Hosting>()
  private resultRoomMetaData$ = new Subject<resultRoomMetaData>()
  constructor(private readonly http:HttpClient) { }
  
  get modeDrawer$():Observable<Drawer>{
    return this.drawer$.asObservable()
  }
  
  setMode$(drawer:Drawer):void{
    this.drawer$.next(drawer)
  }

  get roomMetaData$():Observable<resultRoomMetaData>{
   return this.resultRoomMetaData$.asObservable()
  }
  
  setRoomMetaData$(metaData:resultRoomMetaData):void{
   return this.resultRoomMetaData$.next(metaData)
  }

  get roomhosting$():Observable<Hosting>{
    return this.hosting$.asObservable()
  }

  setHosting$(hosting:Hosting):void{
    return this.hosting$.next(hosting)
  }

  getRooms():Observable<Room[]>{
    return this.http.get<Room[]>(this.API)
  }
}
