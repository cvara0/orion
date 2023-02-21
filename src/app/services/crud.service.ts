import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import db from '../../firebase/firebase.config';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  rowList: any = [];
  row:any;
  constructor() { }

  postRow(rowToAdd:any,tableName:string){
    const obj = JSON.parse(JSON.stringify(rowToAdd));
    this.rowList=[];
    return addDoc(collection(db, tableName), obj);
  }

  putRow(rowToEdit:any,tableName:string){
    const db = collection(getFirestore(), tableName);
    const rowRef = doc(db,rowToEdit.id);
    const obj = JSON.parse(JSON.stringify(rowToEdit));
    this.rowList=[];
    
    return updateDoc(rowRef, obj);
  }
  
  deleteRow(rowToDelete:any,tableName:string){
    const db = collection(getFirestore(), tableName);
    const rowRef = doc(db,rowToDelete.id);
    this.rowList=[];
    //const obj = JSON.parse(JSON.stringify(studentToEdit));
    return deleteDoc(rowRef);
    /*.then(resp=>console.log('cambios guardados'))
    .catch(e=>console.log('error al guardar',e));*/
  }

  getRowList(tableName:string){
    const tableRef = collection(db, tableName);
    this.rowList=[];
    onSnapshot(tableRef, (snapshot) => { 
      snapshot.docs.forEach((doc) => {
        this.rowList.push({ ...doc.data(), id: doc.id });
      });
    });
    return this.rowList;
}


  async getRowByCol(col:string,colName:string,tableName:string){
    const queryRef = query(collection(db, tableName), where(colName, '==', col));
    const querySnapshot=await getDocs(queryRef);
    this.rowList=[];
    querySnapshot.forEach((doc) => {
      this.rowList.push({ ...doc.data(), id: doc.id });
      //console.log(doc.id, " => ", doc.data());
    });
    //console.log(this.rowList[0]);
    return await this.rowList;
   
}

}
