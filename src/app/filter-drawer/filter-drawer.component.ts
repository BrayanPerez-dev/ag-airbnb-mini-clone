import { Component, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { DataService, Drawer, Room } from '../services/data.service';


export interface location {
  city: string,
  country: string,
}

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnInit {


  visible = false;
  placement: NzDrawerPlacement = 'top';
  rooms: Room[] = []
  locations: location[] = []
  
  constructor(private readonly dataSvc: DataService) { }
  ngOnInit(): void {
    this.dataSvc.modeDrawer$.subscribe((drawer: Drawer) => this.visible = drawer.visible)
   
    this.dataSvc.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = [...rooms]
      this.setLocations()
    })
  }

  setLocations() {
     
    const locations = []
    for (const { city, country } of this.rooms) {
      const location: location = {
        city,
        country
      };
      locations.push(location)
    }
    this.locations = locations.filter((location, index, self) =>
      index === self.findIndex((l) => l.city === location.city)
    ).splice(0,5)

  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
