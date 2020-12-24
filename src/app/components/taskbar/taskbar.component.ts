import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { wait }        from '../../helpers/helper';
import { DataService } from '../../core/data.service';
import { ISecondMenu, IStartMenu } from  '../../shared/interfaces';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.sass'],
})


export class TaskbarComponent implements OnInit {
  @ViewChild('startMenu') startMenu: any;
  appTime = "";
  appDate=  "";
  cached = "";
  openStart = false;
  openSecond = false;
  menuTop = "";
  secondMenu: ISecondMenu[] = [];
  menuNames : IStartMenu[] = [];

  constructor(private dataService: DataService) {}
  // constructor(private dataService: DataService) { 
  //   // this.dataService = DataService;
  //   // updates date and time every second
  //   // setInterval(() => {         
  //   //   this.setDate();
  //   // }, 1000);
  // }

  ngOnInit(): void {
    this.setDate();
    this.dataService.getStartMenu().subscribe((start: IStartMenu[]) => {
      this.menuNames = start;
    });
  }

  // Adds open-menu when start clicked
  setStartMenuClass() {
    return this.openStart ? 'open-menu' : '';
  }

  setSecondMenuClass() {
    return this.openSecond ? 'open-second' : '';
  }

  // sets date and time for taskbar
  setDate() {
    let  date      = new Date();
    this.appDate = (date.getMonth() + 1) + "/" +date.getDate() + "/" + date.getFullYear();
    this.appTime = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
  }

  startClicked() {
    this.openStart = !this.openStart;
  }


  // opens second menu if needed
  async menuClicked(name:string, option:string) {

    if (this.cached !== name) {
      this.openSecond = false;
      await wait(250);
    }
    this.cached = name;
    if (option === "more") {
      this.menuTop = `${this.getTop()}px`
      this.openSecond = !this.openSecond;
      this.dataService.getSecondMenu(name).subscribe((port: ISecondMenu[]) => {
        this.secondMenu = port;
      });

    }
  
  }

  // gets top for second menu
  getTop() {
    const top = this.startMenu.nativeElement.getBoundingClientRect().y;
    const {innerHeight} = window;
    return innerHeight > 810 ? top - (innerHeight - 810) /2 : top;
  }

  // closes menus when item choosen
  async secondMenuClicked() {
    this.openSecond = false;
    await wait(150);
    this.openStart  = false;
  }

}
