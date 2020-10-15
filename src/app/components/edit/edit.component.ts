import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';
import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';

import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
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
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public filesToUpload: Array<File>;
  public projectId: string
  public url: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _uploadService: UploadService
  ) {
    this.title = "Editar proyecto"
    this.project = new Project('', '', '', '', 0, '', '', '')
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.projectId = this._activatedRoute.snapshot.params.id;
    this.getProject();
  }

  getProject() {
    this._projectService.getProject(this.projectId).subscribe(
      res => {
        if (res.project) {
          this.project = res.project
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  onSubmit(form) {
    if (localStorage.getItem("login") == 'success') {
      var id;
      //Guardr los datos
      this._projectService.updateProject(this.project, this.projectId).subscribe(
        res => {
          if (res) {
            //imagen
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + this.project._id, [], this.filesToUpload, 'image').then((result: any) => {
              //console.log(result)
            })

            swal("Todo listo!", "Tu proyecto fue guardado", "success");

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
