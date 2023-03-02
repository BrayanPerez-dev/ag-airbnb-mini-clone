import { Component, Input } from '@angular/core';
import { Room } from '../services/data.service';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})

export class RoomCardComponent {
  
   
  
  @Input() room!:Room

}
