import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public hideMenu: boolean;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.hideMenu = false;
  }

  ngOnInit(): void {
  }

  leave(component) {
    var data = this._router.url.split('/')
    var route = data[1];
    if (component != route) {
      if (this._router.url != '/') {
        $("#" + route).animate({ opacity: 0 }, 400)
        setTimeout(() => {
          this._router.navigate(['/' + component]);
        }, 400)
        this.menu()
      } else {
        $("#home").animate({ opacity: 0 }, 400)
        setTimeout(() => {
          this._router.navigate(['/' + component]);
        }, 400)
        this.menu()
      }
    }


  }


  menu() {
    if (this.hideMenu) {
      $("#menu").animate({
        height: '0px'
      }, 400)
      this.hideMenu = false;
    } else {
      $("#menu").animate({
        height: '284px'
      }, 400)
      this.hideMenu = true;
    }
  }


}
