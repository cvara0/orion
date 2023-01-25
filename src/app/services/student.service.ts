import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Student } from '../models/student.models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url;

  studentList: Student[];
  
  
  
  /*

        public name               : string,
        public surname            : string,
        public weight             : number,
        public age                : number,
        public gender             : string,
        public level              : string,
        public sport              : string,
        public profession         : string,
        public drug               : string,
        public limitation         : string,
        public prescription       : string,
        public phone              : number,
        public coment             : string,
        public pexerciseIdList    : string[],
        public id?                : string
  */
  
    constructor(private http:HttpClient) { 
  
      this.url="https://orion-centro-personalizado-default-rtdb.firebaseio.com";
      this.studentList=[];
  
    }
  
   
    postStudent(studentToAdd:Student){
      return this.http.post(`${this.url}/students.json`, studentToAdd).pipe(
        map((resp:any)=>{
          return studentToAdd;
        })
      );
    }
  
  
    putStudent(studentToEdit:Student){
      const studentTemp={...studentToEdit};
      delete studentTemp.id;
      return this.http.put(`${this.url}/students/${studentToEdit.id}.json`,studentTemp);
    }
  
    getStudentList(){
        return this.http.get(`${this.url}/students.json`)
        .pipe(
          map(this.createStudentList)
        );
    }
  
    private createStudentList(studentListObj:any):Student[]{
      const studentList:Student[]=[];
      if(studentListObj===null){return [];}
      Object.keys(studentListObj).forEach(i=>{
        const stu:Student=studentListObj[i];
        stu.id=i;
        studentList.push(stu);
      })
      return studentList;
    }
  
    
    deleteStudent(studentToDelete:Student){
  
      return this.http.delete(`${this.url}/students/${studentToDelete.id}.json`);
    }
  

}
