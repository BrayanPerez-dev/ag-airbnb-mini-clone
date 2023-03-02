import { AfterContentChecked, ChangeDetectorRef, Component, DoCheck, OnInit, } from '@angular/core';
import { DataService, Room } from '../services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck, AfterContentChecked {

  rooms: Room[] = []
  city!: string
  guests!: number
  country!: string
  numberResults!: number

  constructor(private readonly dataSvc: DataService,private cdref: ChangeDetectorRef) { }
  ngAfterContentChecked(): void {
    this.dataSvc.roomMetaData$.subscribe(response => {
      this.country = response.country
      this.numberResults = response.numberResults
      this.cdref.detectChanges();
    })
  }


  ngDoCheck(): void {
    this.dataSvc.roomhosting$.subscribe(response => {
      this.city = response.city
      this.guests = response.guestsNumber
    }
    )


  }

  ngOnInit(): void {
    this.dataSvc.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = [...rooms]
    })

  }
}
