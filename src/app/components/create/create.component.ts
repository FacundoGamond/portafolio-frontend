import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global'
import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';

import swal from 'sweetalert';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ProjectService, UploadService],
  animations: [
    trigger('enterState', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate(300, style({
          opacity: 1
        }))
      ])
    ])
  ]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public filesToUpload: Array<File>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear proyecto"
    this.project = new Project('', '', '', '', 0, '', '', '')
  }

  ngOnInit(): void {
    $('html,body').animate({ scrollTop: '0px' }, 300)
  }

  onSubmit(form) {
    if (localStorage.getItem("login") == 'success') {
      var id;
      //Guardr los datos
      this._projectService.saveProject(this.project).subscribe(
        res => {
          if (res.project) {
            //imagen
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + res.project._id, [], this.filesToUpload, 'image').then((result: any) => {
              console.log(result)
            })

            swal("Todo listo!", "Tu proyecto fue guardado", "success");
            this.project = res.project;

            setTimeout(() => { //este solo una vez
              this._router.navigate(['/trabajo/' + this.project._id]);
            }, 1000);
            form.reset();
          }
        },
        err => {
          swal("Hubo un problema!", "Tu proyecto no fue guardado", "error");
          console.log(err);
        });
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
