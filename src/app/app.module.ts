import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { APP_ROUTING } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { StudentsComponent } from './components/students/students.component';
import { RoutineComponent } from './components/routine/routine.component';
import { PaysComponent } from './components/pays/pays.component';
import { PlansComponent } from './components/plans/plans.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AllpaysComponent } from './components/allpays/allpays.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ExercisesComponent,
    StudentsComponent,
    RoutineComponent,
    PaysComponent,
    PlansComponent,
    AllpaysComponent,
    SafePipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbDropdownModule,
    BrowserModule,
    APP_ROUTING,
    NgbModule,
    AuthModule.forRoot({
      domain: 'dev-it1vvy2gg2d3vhm6.us.auth0.com',
      clientId: '6slTcXM0q4Sk5jyuE08vAcAiWXnNUpmn',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
