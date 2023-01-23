import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Exercise } from '../models/exercise.models';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private url;

exerciseList: Exercise[];



/*
         public id                : number,
        public muscleGroupIdList : number[],
        public name              : string="",
        public difficulty        : number,
        public tipsUrl           : string="",
        public imgUrl            : string="",
        public gender            : string="""
*/

  constructor(private http:HttpClient) { 

    this.url="https://orion-centro-personalizado-default-rtdb.firebaseio.com";
    this.exerciseList=[];
  }


  postExercise(exerciseToAdd:Exercise){
    return this.http.post(`${this.url}/exercises.json`, exerciseToAdd).pipe(
      map((resp:any)=>{//la respuesta puede ser cualquier cosa, aqui lo dedcido yo
        //exerciseToAdd.id=resp.name;
        return exerciseToAdd;
      })
    );

    /* map transforma lo que un observable puede regresar o bien una peticion http */
  }


  putExercise(exerciseToEdit:Exercise){
    const exerciseTemp={...exerciseToEdit};
    delete exerciseTemp.id;
    return this.http.put(`${this.url}/exercises/${exerciseToEdit.id}.json`,exerciseTemp);
  }


  getExerciseList1(){
    return this.http.get(`${this.url}/exercises.json`);
  }


  getExerciseList(){
      return this.http.get(`${this.url}/exercises.json`)
      .pipe(
        map(this.createExerciseList)
      );
  }

  private createExerciseList(exerciseListObj:any):Exercise[]{
    const exerciseList:Exercise[]=[];
    if(exerciseListObj===null){return [];}
    Object.keys(exerciseListObj).forEach(i=>{
      const exc:Exercise=exerciseListObj[i];
      exc.id=i;
      exerciseList.push(exc);
    })
    return exerciseList;
  }

  
  deleteExercise(exerciseToDelete:Exercise){

    return this.http.delete(`${this.url}/exercises/${exerciseToDelete.id}.json`);
  }


}
