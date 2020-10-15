import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ProjectService } from '../../services/project.service';
import { Email } from '../../models/email'

import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ProjectService],
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
export class ContactComponent implements OnInit {
  public emailData: Email;
  public text: string;
  public sended: boolean;
  constructor(private _projectService: ProjectService) {
    this.emailData = new Email("", "", "", 0, "", "")
    this.sended = true;
   }

  ngOnInit(): void {
    
  }

  onSubmit(form) {
    this.sended = false;
    var date = String(new Date);
    this.emailData.date = date;
    this._projectService.sendEmail(this.emailData).subscribe(
      res => {
        if (res) {
          swal({
            title: "Consulta enviada!",
            text: "Nuestros acesores se pondran en contacto a la brevedad!",
            icon: "success"
          });

          this.sended = true;
          
        }
      },
      err => {
        console.log(err);
        swal({
          title: "Consulta no enviada!",
          text: "Ocurrio un error, intentelo más tarde",
          icon: "error"
        });
        this.sended = true;
      });
      form.reset();
  }

}
