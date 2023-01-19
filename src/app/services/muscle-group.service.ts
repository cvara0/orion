import { Injectable } from '@angular/core';
import { MuscleGroup } from '../models/muscle-group.models';

@Injectable({
  providedIn: 'root'
})
export class MuscleGroupService {
  muscleGroupList:MuscleGroup[];
/*
public id          : number,//ver si utilizar musculo individual o grupo
public name        : string="",
*/
  constructor() { 
    this.muscleGroupList=[
      new MuscleGroup(
        1,
        "Abdomen"
      )
    ]
  }
}
