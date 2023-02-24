import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pay } from 'src/app/models/pay.models';
import { Plan } from 'src/app/models/plan.models';
import { Student } from 'src/app/models/student.models';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styles: [
  ]
})
export class PaysComponent implements OnInit {

  studentByStudentId:Student | undefined ;
  paramStudentId:string;

  closeResult    :string='';
  addPayForm!    :FormGroup;
  editPayForm!   :FormGroup;

  payList!        :Pay[];
  planList!       :Plan[];
  planById!       :Plan;

  payToEdit!      :Pay;

  isLoading       :boolean=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    public crudService:CrudService
    ) { 

      
      this.paramStudentId=this.activatedRoute.snapshot.paramMap.get('id')!;

      /*
  
  
  
        console.log(Math.floor((new Date(+year,+month-1,+day).getTime()-Date.now())/86400000));
      }*/
      
    }

  ngOnInit(): void {
    this.createAddPayForm();
    
    this.planList=this.crudService.getRowList('plans');

    this.crudService.getRowByCol(this.paramStudentId,'studentId','pays').then(resp => { 
      this.payList=resp;
      this.payList.sort((a,b)=>Number(a.isPaid)-Number(b.isPaid));
    });


    this.crudService.getRowByCol(this.paramStudentId,'id','students').then(resp => { 
      this.studentByStudentId=resp[0]; 
  });
    
  }
/*
        public studentId     : string,
        public planId        : string,
        public payDate       : string,
        public state         : string,
        public id?           : string
*/

getPlanById(planId:string){
    
  return this.planList.find(i=>i.id==planId);
}

getPayState(pay:Pay){
  const dayDiff=Math.floor((pay.payDate-Date.now())/86400000)+1
  if(pay.isPaid)
    return 'PAGADO'
  if(dayDiff>0)
    return 'AL DIA ( FALTAN '+dayDiff+' DIAS )';
  if (dayDiff==0)
    return 'DIA DE PAGO';
  if(dayDiff<0)
       return'CUOTA ATRASADA POR '+ dayDiff*(-1) + ' DIAS';
  return 'error desconocido';
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


   ////////////////////////////////////////////////////////////////
  createAddPayForm(){
  
    this.addPayForm=this.formBuilder.group({
      payToAddPlanId        : ['',[Validators.required]]
    });
  }
  get validPayToAddPlanId(){
    return this.addPayForm.get('payToAddPlanId')?.dirty;
  }

  saveAddPay(){

    this.isLoading=true;
    this.crudService.postRow(
      new Pay(
        this.paramStudentId,
        this.addPayForm.get('payToAddPlanId')?.value,
        Date.now(),
        false
      ),
      'pays'
    ).then(resp=>{this.isLoading=false;
                  location.reload();})
    .catch(e=>console.log('error al guardar',e));
    
    this.addPayForm.reset();
  }

///////////////////////////////////////////////////////////////////

deletePay(payToDelete:Pay){
  this.isLoading=true;
    
      this.crudService.deleteRow(payToDelete,'pays').then(resp=>{
        this.isLoading=false;
        location.reload();
        }).catch(e=>console.log('error al eliminar',e));
   //ver eliminacion automatica del registro de cuota, despues de pagar
      }


///////////////////////////////////////////////////////////////////
  open(content:any) {
    this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered:true,
        size:'lg'
        //size:'lg xl sm',
      // windowClass:'ngb-modal-style'
        
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
