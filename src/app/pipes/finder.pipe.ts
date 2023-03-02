import { Pipe, PipeTransform } from '@angular/core';
import { DataService, Room } from '../services/data.service';

@Pipe({
  name: 'finder'
})
export class FinderPipe implements PipeTransform {
  
  constructor(private readonly dataSvc:DataService){}

  transform(rooms: Room[], ...arg: any): Room[] {
    
 

    if(!arg[0] || !arg[1]) return rooms
    let roomsFound:Room[] = []
     rooms.map(room=>{
      if(room.city === arg[0] && room.maxGuests <= arg[1] ){
         roomsFound.push(room)
      }
    })
    const metaData ={
      country : roomsFound[0].country,
      numberResults: roomsFound.length
    }
    this.dataSvc.setRoomMetaData$(metaData)
    
    return roomsFound
  }

}
