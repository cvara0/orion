import { Component, OnInit } from '@angular/core';
import { Pay } from 'src/app/models/pay.models';
import { Student } from 'src/app/models/student.models';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-allpays',
  templateUrl: './allpays.component.html'
})
export class AllpaysComponent implements OnInit {


  studentList!        :Student[];
  isLoading           :boolean=false;
  allpaysList!        :Pay[];

  searchValue         :string;
  page                :number;

  constructor(private crudService:CrudService) { 
    this.page=0;
    this.searchValue='';
  }

  ngOnInit(): void {
    
    this.allpaysList=this.crudService.getRowList('pays');
    this.studentList=this.crudService.getRowList1('students');
    //this.allpaysList=this.allpaysList.filter(i=>i.isPaid===false);
    
  }
///////////////////////////////////////////

search(searchValue:string){
  this.page=0;
  let sv:string=this.studentList.find(i=>i.name.includes(searchValue))?.id!;
  this.searchValue=sv;
}

  getPayState(pay:Pay){
    let actualPlanId=pay.planId;
    const dayDiff=Math.floor((pay.payDate-Date.now())/86400000)+1
    if(pay.isPaid) 
      return 'PAGADO'
    if(dayDiff>0)
      return 'FALTAN '+dayDiff+' DIAS';
    if (dayDiff==0)
      return 'DIA DE PAGO';
    if(dayDiff<0)
         return'ATRASADA POR '+ dayDiff*(-1) + ' DIAS';
    return 'error desconocido';
  }

  getStudentById(studentId:string){
    return this.studentList.find(i=>i.id==studentId);
  }

  cancelPay(payToCancel:Pay){
    let nextPayDate = new Date(payToCancel.payDate);
    nextPayDate.setMonth(nextPayDate.getMonth()+1);
  this.crudService.postRow(
        new Pay(
          payToCancel.studentId,
          payToCancel.planId,
          nextPayDate.getTime(),
          false
        ),
        'pays'
      ).then(resp=>{this.isLoading=false;
                  location.reload();
                  })
      .catch(e=>console.log('error al guardar',e));
  
      this.crudService.putRow(
        new Pay(
          payToCancel.studentId,
          payToCancel.planId,
          payToCancel.payDate,
          true,
          payToCancel.id
        ),
        'pays'
      ).then(resp=>{this.isLoading=false;
                  location.reload();
                  })
      .catch(e=>console.log('error al guardar',e));
  }

}
