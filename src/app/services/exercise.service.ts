import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.models';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

excersiceList: Exercise[];
/*
         public id                : number,
        public muscleGroupIdList : number[],
        public name              : string="",
        public difficulty        : number,
        public tipsUrl           : string="",
        public imgUrl            : string="",
        public gender            : string="""
*/

  constructor() { 

    this.excersiceList=[
      new Exercise(
        1,
        [1,2,3],
        "Abdominales",
        1,
        "https://www.youtube.com/embed/2tXQbi16EdI",
        "https://gymvisual.com/img/p/4/7/3/1/4731.gif",
        "ambos"
      )
    ];
  }



}
