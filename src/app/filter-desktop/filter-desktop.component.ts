import { Component, Input, OnInit,HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { location } from '../filter-drawer/filter-drawer.component';
import { DataService, Hosting } from '../services/data.service';
@Component({
   selector: 'app-filter-desktop',
   templateUrl: './filter-desktop.component.html',
   styleUrls: ['./filter-desktop.component.scss']
})
export class FilterDesktopComponent implements OnInit {
   
   movilOrDesktop: boolean = false
   roomsForm!: FormGroup;
   visibleSelect!:boolean;
   visibleFilter!:boolean;
   screenWidth!: number;
   @Input() locations!: location[]
   

   constructor(private formBuilder: FormBuilder,private readonly dataSvc:DataService) { }
   
   ngOnInit(): void {
      this.visibleSelect = true
      this.roomsForm = this.formBuilder.group({
         location: [''],
         guests: [''],
         adults: [0],
         childrem:[0]
      })
      if (window.innerWidth < 768) {
         this.movilOrDesktop = true
       }

       if (window.innerWidth > 768) {
         this.movilOrDesktop = false
       }
   }

   @HostListener('window:resize', ['$event'])
   onResize() {
     this.screenWidth = window.innerWidth;
     this.checkWidth()
 
   }
 
   checkWidth(): void {
     if (this.screenWidth < 768) {
       this.movilOrDesktop = true
     }
     if (this.screenWidth > 768) {
       this.movilOrDesktop = false
     }
   }
 
   showFilter(){
      this.visibleFilter = true
      this.visibleSelect = false

   }

   showList(){
      this.visibleSelect = true
      this.visibleFilter = false
   }

   
   onSubmit(): void {
      
      const guestsNumber = this.roomsForm.get('adults')?.value + this.roomsForm.get('childrem')?.value
      const city = this.roomsForm.get('location')?.value.split(',')[0]
      const hosting:Hosting= {
         city,
         location:this.roomsForm.get('location')?.value,
         guestsLabel:this.roomsForm.get('guests')?.value,
         guestsNumber
      }
      this.dataSvc.setHosting$(hosting)
   }

   updateLocation(location: location) {
      this.roomsForm.patchValue({location:`${location.city}, ${location.country}`})
   }

   updateAdultsPlusGuests(adults: number) {
      let maxAdults = adults+1
      this.roomsForm.patchValue({guests:`${maxAdults+this.roomsForm.get('childrem')?.value} guests`,adults:maxAdults})
   }

   updateAdultsLessGuests(adults: number) {
      let mimAdults = --adults
      if (mimAdults < 0) return
      this.roomsForm.patchValue({guests:`${mimAdults+this.roomsForm.get('childrem')?.value} guests`,adults:mimAdults})
   }
   
   updateChildremPlusGuests(childrem: number) {
      let maxChildrem = childrem+1
      this.roomsForm.patchValue({guests:`${maxChildrem+this.roomsForm.get('adults')?.value} guests`,childrem:maxChildrem})
   }

   updateChildremLessGuests(childrem: number) {
      let mimChildrem = --childrem
      if (mimChildrem < 0) return
      this.roomsForm.patchValue({guests:`${mimChildrem+this.roomsForm.get('adults')?.value} guests`,childrem:mimChildrem})
   }


}
