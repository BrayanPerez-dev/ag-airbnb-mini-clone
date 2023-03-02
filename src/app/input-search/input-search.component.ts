import { Component, DoCheck, } from '@angular/core';
import { DataService, Drawer } from '../services/data.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent  implements DoCheck{

  guests:string = 'Add guests'
  location:string = 'Everywhere'
  constructor(private readonly dataSvc: DataService) { }
  ngDoCheck(): void {
    this.dataSvc.roomhosting$.subscribe(response => {
      this.guests = response.guestsLabel
      this.location = response.location
    })

  }


  
  openDrawer() {
    const drawer: Drawer = {
      visible: true
    }
    this.dataSvc.setMode$(drawer)
    
  }



}
