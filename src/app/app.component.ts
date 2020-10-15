import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portafolio';
  public content

  onActivate(event) {
    console.log("click")
    window.scroll(0,0);
    //document.body.scrollTop = 0;
    //document.querySelector('body').scrollTo(0,0)

}
}

