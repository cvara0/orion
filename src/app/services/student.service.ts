import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Student } from '../models/student.models';
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import db from '../../firebase/firebase.config';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  //private url;

  //studentList: Student[];
  studentList: any = [];
  
  
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
  
      //this.url="https://orion-centro-personalizado-default-rtdb.firebaseio.com";
      this.studentList=[];
  
    }
  
    postStudent(studentToAdd:Student){
      const obj = JSON.parse(JSON.stringify(studentToAdd));
      this.studentList=[];
      return addDoc(collection(db, "students"), obj);
    }

    putStudent(studentToEdit:Student){
      const db = collection(getFirestore(), 'students');
      const studentRef = doc(db,studentToEdit.id);
      const obj = JSON.parse(JSON.stringify(studentToEdit));
      this.studentList=[];
      return updateDoc(studentRef, obj);
    }
    
    deleteStudent(studentToDelete:Student){
      const db = collection(getFirestore(), 'students');
      const studentRef = doc(db,studentToDelete.id);
      //const obj = JSON.parse(JSON.stringify(studentToEdit));
      deleteDoc(studentRef)
      .then(resp=>console.log('cambios guardados'))
      .catch(e=>console.log('error al guardar',e));
    }

    

    getStudentList(){

      const studentsRef = collection(db, 'students');
      onSnapshot(studentsRef, (snapshot) => {
        
        snapshot.docs.forEach((doc) => {
          this.studentList.push({ ...doc.data(), id: doc.id });
        });
    
      });

      return this.studentList;
  }





    /*postStudent(studentToAdd:Student){
      return this.http.post(`${this.url}/students.json`, studentToAdd).pipe(
        map((resp:any)=>{
          return studentToAdd;
        })
      );
    }*/
  
  
    /*putStudent(studentToEdit:Student){
      const studentTemp={...studentToEdit};
      delete studentTemp.id;
      return this.http.put(`${this.url}/students/${studentToEdit.id}.json`,studentTemp);
    }*/
  
    /*getStudentList(){
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
    }*/
  
    
    /*deleteStudent(studentToDelete:Student){
  
      return this.http.delete(`${this.url}/students/${studentToDelete.id}.json`);
    }*/
  

}
