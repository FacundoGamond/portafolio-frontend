import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';

import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Project } from '../../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectService],
  animations: [
    trigger('enterState', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate(400, style({ transform: 'translateY(-5%)' })),
        animate(500, style({ transform: 'translateY(0%)' }))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  public projects: Array<Project>
  public url: string;

  constructor(private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = Global.url;
    this.projects = []
  }

  ngOnInit(): void {
    $('html,body').animate({ scrollTop: '0px' }, 300)
    this.getProjects();
  }

  getProjects() {
    this._projectService.getProjects().subscribe(
      res => {
        if (res.projects) {
          this.projects = res.projects;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getProject(projectId) {
    //Redireccion
    $("#trabajos").animate({ opacity: 0 }, 400)
    setTimeout(() => {
      this._router.navigate(['/trabajo/' + projectId]);
    }, 400)
    
  }

}
