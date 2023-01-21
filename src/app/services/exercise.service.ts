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
private exerciseList$: Subject<Exercise[]>;



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
    this.exerciseList$=new Subject();

    this.exerciseList=[];
  }

  /*getExerciseById(id:number){
    return this.excersiceList.find(i=>i.id==id);
  }*/


  postExercise(exerciseToAdd:Exercise){
    //const exerciseJSON = JSON.stringify(exerciseToAdd);
    return this.http.post(`${this.url}/exercises.json`, exerciseToAdd).pipe(
      map((resp:any)=>{//la respuesta puede ser cualquier cosa, aqui lo dedcido yo
        exerciseToAdd.id=resp.name;
        return exerciseToAdd;
      })
    );

    /* map transforma lo que un observable puede regresar o bien una peticion http */
  }


  putExercise(exerciseToEdit:Exercise){
    return this.http.put(`${this.url}/exercises/${exerciseToEdit.id}.json`,exerciseToEdit);
  }


  getExerciseList$(): Observable<Exercise[]>{
    return this.exerciseList$.asObservable();//esto permite desde afuera suscribirse y asi ver los cambios y recuperar los valores
  }

  getExerciseList(){//userId:string|nullTodo mandar todos los get como path variable home/1 home/2 etc
      return this.http.get(`${this.url}/exercises`)//(sessionStorage.getItem("userId")==null?'0':sessionStorage.getItem("userId"))
      .pipe(
        map(resp=>{
          this.exerciseList=this.createExerciseList(resp);
          this.exerciseList$.next(this.exerciseList);
        })
      );
  }

  private createExerciseList(exerciseListObj:any):Exercise[]{
    const exerciseList:Exercise[]=[];
    if(exerciseListObj===null){return [];}
    Object.keys(exerciseListObj).forEach(i=>{
      const exc:Exercise=exerciseListObj[i];
      exerciseList.push(exc);
    })
    return exerciseList;
  }

  
  deleteExercise(exerciseToDelete:Exercise){

    return this.http.delete(`${this.url}/exercises/${exerciseToDelete.id}`);
  }


}
