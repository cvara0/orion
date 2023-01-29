import {RouterModule,Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import{ExercisesComponent} from './components/exercises/exercises.component';
import{StudentsComponent} from './components/students/students.component';
import { RoutineComponent } from './components/routine/routine.component';
/* se crea una ruta que muestra el ts  */
const APP_ROUTES: Routes=[
    {path:'home',component:HomeComponent},
    {path:'exercises',component:ExercisesComponent},
    {path:'students',component:StudentsComponent},
    {path:'routine/:id',component:RoutineComponent},//ver
    {path:'**',pathMatch:'full',redirectTo:'home'}//si no encuentra la ruta ejecuta esta, ruta por defecto
];
export const APP_ROUTING=RouterModule.forRoot(APP_ROUTES);