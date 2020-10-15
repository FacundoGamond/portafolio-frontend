import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {
  public hide:boolean;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  


}
