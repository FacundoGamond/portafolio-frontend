import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

import { LoginService } from '../../services/login.service';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Project } from '../../models/project';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService, ProjectService]
})
export class LoginComponent implements OnInit {
  public login: any;
  public loginIn: boolean;
  public error: string;
  public projects: Array<Project>
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.login = {
      user: '',
      password: ''
    }
    this.loginIn = false;
    this.url = Global.url;
    this.projects = []
  }
  ngOnInit(): void {
    if (localStorage.getItem("login") == 'success') {
      this.loginIn = true;
      this.getProjects();
    }
  }

  onSubmit(form) {
    this._loginService.login(this.login).subscribe(
      res => {
        if (res.status == 'success') {
          this.loginIn = true;
          localStorage.setItem("login", "success");
        } else {
          this.error = "Datos erroneos"
          
        }
      },
      err => {
        console.log(err);
        //Error con servidor
        console.log(err)
      });
    form.reset();
  }

  create() {
    this._router.navigate(['/crear']);
  }

  logOut() {
    localStorage.clear();
    this.loginIn = false;
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

  editProject(id){
    this._router.navigate(['/editar/' + id]);
  }
  deleteProject(id){
    swal({
      title: "Estas seguro?",
      text: "Una vez que elimines el proyecto, no podras volver a usarlo",
      icon: "warning",
      buttons: ['Cancelar', 'Confirmar'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Perfecto! proyecto eliminado", {
            icon: "success",
          });
          this._projectService.deleteProject(id).subscribe(
            res => {
              this.getProjects();
            },
            err => {
              console.log(err);
            }
          )

        } else {
          swal("Tranquilo! tu proyecto no se elimino");
        }
      });

  }
}
