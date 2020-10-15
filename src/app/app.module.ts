import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Para poder hacer peticiones ajax
import { FormsModule } from '@angular/forms'; //Modulo para poder usar el ngModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //Para usar animaciones
import { routing, appRoutingProviders } from './app.routing'; //Para poder usar las redirecciones y obtener datos de la url

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { IonicModule } from '@ionic/angular';
import { ProjectComponent } from './components/project/project.component';
import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { SocialmediaComponent } from './components/socialmedia/socialmedia.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProjectsComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    ErrorComponent,
    ProjectComponent,
    LoginComponent,
    CreateComponent,
    EditComponent,
    SocialmediaComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot()
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
