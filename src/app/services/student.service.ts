import { Injectable } from '@angular/core';
import { Student } from '../models/student.models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentList:Student[];

  /* 
        public id                 : number,
        public name               : string="",
        public surname            : string="",
        public weight             : number=0,
        public age                : number=0,
        public gender             : string="",
        public phone              : number
  */
  constructor() { 
  this.studentList=[]
  
  }

  getStudentList(){
    return this.studentList;
  }

  getStudentById(id:number){
    return this.studentList.find(i=>i.id==id);
  }

  

}
