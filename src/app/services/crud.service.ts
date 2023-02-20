import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import db from '../../firebase/firebase.config';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  rowList: any = [];

  constructor() { }

  deleteRow(rowToDelete:any,tableName:string){
    const db = collection(getFirestore(), tableName);
    const rowRef = doc(db,rowToDelete.id);
    //const obj = JSON.parse(JSON.stringify(studentToEdit));
    deleteDoc(rowRef)
    .then(resp=>console.log('cambios guardados'))
    .catch(e=>console.log('error al guardar',e));
  }

  getTable(tableName:string){

    const tableRef = collection(db, tableName);
    onSnapshot(tableRef, (snapshot) => {
      
      snapshot.docs.forEach((doc) => {
        this.rowList.push({ ...doc.data(), id: doc.id });
      });
  
    });

    return this.studentList;
}

}
