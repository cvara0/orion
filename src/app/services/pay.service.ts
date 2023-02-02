import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pay } from '../models/pay.models';
import { map, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PayService {

  private url;

  payList: Pay[];



/*
        public studentId   
        public entryDate   
        public payDate     
        public price       
        public plan        
        public state       
        public id?         
*/

  constructor(private http:HttpClient) { 

    this.url="https://orion-centro-personalizado-default-rtdb.firebaseio.com";
    this.payList=[];
  }


  postPay(payToAdd:Pay){
    return this.http.post(`${this.url}/pays.json`, payToAdd).pipe(
      map((resp:any)=>{
        return payToAdd;
      })
    );
  }


  putPay(payToEdit:Pay){
    const payTemp={...payToEdit};
    delete payTemp.id;
    return this.http.put(`${this.url}/pays/${payToEdit.id}.json`,payTemp);
  }

 /* getPexerciseListByStudentId(studentId:string|null){
    return this.http.get(`${this.url}/pexercises/${studentId}.json`)
  }*/

  getPayList(){
      return this.http.get(`${this.url}/pays.json`)
      .pipe(
        map(this.createPayList)
      );
  }

  private createPayList(payListObj:any):Pay[]{
    const payList:Pay[]=[];
    if(payListObj===null){return [];}
    Object.keys(payListObj).forEach(i=>{
      const pay:Pay=payListObj[i];
      pay.id=i;
      payList.push(pay);
    })
    return payList;
  }

  
  deletePay(payToDelete:Pay){

    return this.http.delete(`${this.url}/pays/${payToDelete.id}.json`);
  }
}
