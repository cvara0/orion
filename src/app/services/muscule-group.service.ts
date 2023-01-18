import { Injectable } from '@angular/core';
import { Muscle } from '../models/muscle.models';

@Injectable({
  providedIn: 'root'
})
export class MusculeService {

  private muscleList:Muscle[]; 

  constructor() { 
    /*public id          : number,
      public name        : string="", */
    this.muscleList=[
      new Muscle(
        1,
        'Espalda'
      ),
    ];

  }
  /*
  espalda
  pantorrilla
  pecho
  antebarazos
  */
}
