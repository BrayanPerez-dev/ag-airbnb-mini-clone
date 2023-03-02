import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RoomCardComponent } from './room-card/room-card.component';
import { FilterDrawerComponent } from './filter-drawer/filter-drawer.component'
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FilterDesktopComponent } from './filter-desktop/filter-desktop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FinderPipe } from './pipes/finder.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    InputSearchComponent,
    RoomCardComponent,
    FilterDrawerComponent,
    FilterDesktopComponent,
    FinderPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzIconModule,
    NzDividerModule,
    NzDrawerModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
