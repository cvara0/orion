import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Pexercise } from '../models/pexercise.models';

@Injectable({
  providedIn: 'root'
})
export class PexerciseService {

  private url;

pexerciseList: Pexercise[];



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
    this.pexerciseList=[];
  }


  postExercise(pexerciseToAdd:Pexercise){
    return this.http.post(`${this.url}/pexercises.json`, pexerciseToAdd).pipe(
      map((resp:any)=>{
        return pexerciseToAdd;
      })
    );
  }


  putPexercise(pexerciseToEdit:Pexercise){
    const pexerciseTemp={...pexerciseToEdit};
    delete pexerciseTemp.id;
    return this.http.put(`${this.url}/pexercises/${pexerciseToEdit.id}.json`,pexerciseTemp);
  }

 /* getPexerciseListByStudentId(studentId:string|null){
    return this.http.get(`${this.url}/pexercises/${studentId}.json`)
  }*/

  getPexerciseList(){
      return this.http.get(`${this.url}/pexercises.json`)
      .pipe(
        map(this.createPexerciseList)
      );
  }

  private createPexerciseList(pexerciseListObj:any):Pexercise[]{
    const pexerciseList:Pexercise[]=[];
    if(pexerciseListObj===null){return [];}
    Object.keys(pexerciseListObj).forEach(i=>{
      const pex:Pexercise=pexerciseListObj[i];
      pex.id=i;
      pexerciseList.push(pex);
    })
    return pexerciseList;
  }

  
  deletePexercise(pexerciseToDelete:Pexercise){

    return this.http.delete(`${this.url}/pexercises/${pexerciseToDelete.id}.json`);
  }

}
