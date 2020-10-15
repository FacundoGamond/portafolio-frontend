//Import routing modules
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import components
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component'
import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/create/create.component'
import { EditComponent } from './components/edit/edit.component';


//Routes
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'sobre-mi', component: AboutComponent },
    { path: 'trabajos', component: ProjectsComponent },
    { path: 'trabajo/:id', component: ProjectComponent },
    { path: 'contacto', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'crear', component: CreateComponent },
    {path: 'editar/:id', component: EditComponent},
    { path: '**', component: ErrorComponent }
];

//Export router
export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)