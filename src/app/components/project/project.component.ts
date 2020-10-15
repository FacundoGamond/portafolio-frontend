import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';
import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { Global } from '../../services/global';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ProjectService],
  animations: [
    trigger('enterState', [
      transition(':enter', [
        style({ transform: 'translatex(-100%)' }),
        animate(400, style({ transform: 'translateX(-5%)' })),
        animate(500, style({ transform: 'translateX(0%)' }))
      ])
    ])
  ]
})
export class ProjectComponent implements OnInit {
  public projectId: string;
  public project: Project;
  public url: string;
  public login:boolean;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.projectId = this._activatedRoute.snapshot.params.id;
    this.url = Global.url;
    this.login=false;
  }

  ngOnInit(): void {
    this.getProject(this.projectId);
    if(localStorage.getItem("login") == 'success'){
      this.login=true;
    }
  }

  getProject(projectId) {
    this._projectService.getProject(projectId).subscribe(
      res => {
        if (res.project) {
          this.project = res.project;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  goPanel(){
    $("#trabajos").animate({ opacity: 0 }, 400)
    setTimeout(() => {
      this._router.navigate(['/login']);
    }, 400)
  }

}
