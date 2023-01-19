import { Injectable } from '@angular/core';
import { Routine } from '../models/routine.models';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  routineList:Routine[];

  /*
    public id                : number,
        public excerciseIdList   : number[],
        public isReadyList       : boolean[],
        public lapsList          : number[]
  */
  constructor() {

    this.routineList=[
      new Routine(
        1,
        [1,2,3],
        [false,false,false],
        [1,1,1]
      )
    ]

   }
}
