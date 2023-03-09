import {RouterModule,Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import{ExercisesComponent} from './components/exercises/exercises.component';
import{StudentsComponent} from './components/students/students.component';
import { RoutineComponent } from './components/routine/routine.component';
import { PlansComponent } from './components/plans/plans.component';
import { PaysComponent } from './components/pays/pays.component';
import { AllpaysComponent } from './components/allpays/allpays.component';
/* se crea una ruta que muestra el ts  */
const APP_ROUTES: Routes=[
    {path:'home',component:HomeComponent},
    {path:'exercises',component:ExercisesComponent},
    {path:'plans',component:PlansComponent},
    {path:'students',component:StudentsComponent},
    {path:'routine/:id',component:RoutineComponent},
    {path:'pays/:id',component:PaysComponent},
    {path:'allpays',component:PlansComponent},
    {path:'**',pathMatch:'full',redirectTo:'home'}//si no encuentra la ruta ejecuta esta, ruta por defecto
];
export const APP_ROUTING=RouterModule.forRoot(APP_ROUTES);