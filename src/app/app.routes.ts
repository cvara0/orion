import {RouterModule,Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import{ExercisesComponent} from './components/exercises/exercises.component';
import{StudentsComponent} from './components/students/students.component';
import { RoutinesComponent } from './components/students/routines/routines.component';
/* se crea una ruta que muestra el ts  */
const APP_ROUTES: Routes=[
    {path:'home',component:HomeComponent},
    {path:'exercises',component:ExercisesComponent},
    {path:'students',component:StudentsComponent},
    {path:'routines/:id',component:RoutinesComponent},//ver
    {path:'**',pathMatch:'full',redirectTo:'home'}//si no encuentra la ruta ejecuta esta, ruta por defecto
];
export const APP_ROUTING=RouterModule.forRoot(APP_ROUTES);