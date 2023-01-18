import {RouterModule,Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';

/* se crea una ruta que muestra el ts  */
const APP_ROUTES: Routes=[
    {path:'home',component:HomeComponent}, 
    {path:'home/:id',component:HomeComponent},
    {path:'**',pathMatch:'full',redirectTo:'home'}//si no encuentra la ruta ejecuta esta, ruta por defecto
];
export const APP_ROUTING=RouterModule.forRoot(APP_ROUTES);