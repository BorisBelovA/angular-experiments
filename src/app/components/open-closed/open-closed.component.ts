import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

const openedState = {
  height: '200px',
  opacity: 1,
  backgroundColor: 'yellow'
};

const closedState = {
  height: '100px',
  opacity: 0.5,
  backgroundColor: 'green'
}

@Component({
  selector: 'app-open-closed',
  templateUrl: './open-closed.component.html',
  styleUrls: ['./open-closed.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style(openedState)),
      state('closed', style(closedState)),
      transition('open=>closed', [
        animate('100ms 100ms ease-out'),
      ]),
      transition('closed=>open', [
        animate('100ms 100ms ease-out')
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1000ms', style({opacity: 1}))
      ])
    ])
  ]
})
export class OpenClosedComponent implements OnInit {

  public isOpen = true;

  public isShown = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.isShown = true;
    }, 1500);
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

}
