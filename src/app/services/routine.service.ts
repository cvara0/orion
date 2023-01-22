import { Injectable } from '@angular/core';
import { Routine } from '../models/routine.models';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  routineList:Routine[];

  /*
        public id                : number,
        public studentId         : number,
        public excerciseIdList   : number[],
        public isReadyList       : boolean[],
        public lapsList          : number[]
  */
  constructor() {

    this.routineList=[]

   }

   getRoutineListByStudentId(id:number){
    //return this.routineList.filter(i=>i.studentId==id);
  }
}
