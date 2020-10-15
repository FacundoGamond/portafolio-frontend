import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('enterState', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(400, style({transform: 'translateY(-5%)'})),
        animate(500, style({transform: 'translateY(0%)'}))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
