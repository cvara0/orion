import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  payToEdit!      :Pay;

  isLoading       :boolean=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    public crudService:CrudService
    ) { 

      
      this.paramStudentId=this.activatedRoute.snapshot.paramMap.get('id')!;
//TODO seguir con agregar pago
      for (let i of this.studentList) {
        const [day, month, year] = i.payDate.split('/');
        const dayDiff=Math.floor((new Date(+year,+month-1,+day).getTime()-Date.now())/86400000)+1
        if(dayDiff>0)
          this.payState='AL DIA ( FALTAN '+dayDiff+' DIAS )';
        else
          if (dayDiff==0)
             this.payState='DIA DE PAGO';
          else
            if(dayDiff<0)
              this.payState='CUOTA ATRASADA POR '+((-1)*dayDiff)+' DIAS';
  
  
  
        console.log(Math.floor((new Date(+year,+month-1,+day).getTime()-Date.now())/86400000));
      }
      
    }

  ngOnInit(): void {
    this.createAddPayForm();
    
    this.crudService.getRowByCol(this.paramStudentId,'studentId','pays').then(resp => { 
      this.payList=resp; 
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
        false,
        this.addPexerciseForm.get('pexToAddLoad')?.value,
        this.addPexerciseForm.get('pexToAddDosage')?.value,
        this.addPexerciseForm.get('pexToAddTime')?.value,
        this.addPexerciseForm.get('pexToAddRestTime')?.value,
        this.addPexerciseForm.get('pexToAddType')?.value,
      ),
      'pays'
    ).then(resp=>{this.isLoading=false;
                  location.reload();})
    .catch(e=>console.log('error al guardar',e));
    
    this.addPexerciseForm.reset();
  }
 ////////////////////////////////////////////////////////////////
  createEditPexerciseForm(){
  
    this.editPexerciseForm=this.formBuilder.group({
      pexToEditExercise       : [this.pexerciseToEdit.exerciseId,[Validators.required]],
      pexToEditisReady        : [this.pexerciseToEdit.isReady,[Validators.required]],
      pexToEditLoad           : [this.pexerciseToEdit.load,[Validators.required]],
      pexToEditDosage         : [this.pexerciseToEdit.dosage,[Validators.required]],
      pexToEditTime           : [this.pexerciseToEdit.time,[Validators.required]],
      pexToEditRestTime       : [this.pexerciseToEdit.restTime,[Validators.required]],
      pexToEditType           : [this.pexerciseToEdit.type,[Validators.required]]
    });
  }
  get validPexToEditExerciseId(){
    return this.editPexerciseForm.get('pexToEditExerciseId')?.dirty;
  }

  get validPexToEditisReady(){
    return this.editPexerciseForm.get('pexToEditisReady')?.dirty;
  }

  get validPexToEditLoad(){
    return this.editPexerciseForm.get('pexToEditLoad')?.dirty;
  }

  get validPexToEditDosage(){
    return this.editPexerciseForm.get('pexToEditDosage')?.dirty;
  }

  /*get validPexToAddTime(){
    return this.editPexerciseForm.get('pexToEditTime')?.dirty;
  }*/

 
  get validPexToEditRestTime(){
    return this.editPexerciseForm.get('pexToEditRestTime')?.dirty;
  }

  get validPexToEditTypee(){
    return this.editPexerciseForm.get('pexToEditType')?.dirty;
  }

 
saveEditPexercise(){

  this.isLoading=true;
  
  this.crudService.putRow(
    new Pexercise(
      this.paramStudentId,
        this.editPexerciseForm.get('pexToEditExerciseId')?.value,
        false,
        this.editPexerciseForm.get('pexToEditLoad')?.value,
        this.editPexerciseForm.get('pexToEditDosage')?.value,
        this.editPexerciseForm.get('pexToEditTime')?.value,
        this.editPexerciseForm.get('pexToEditRestTime')?.value,
        this.editPexerciseForm.get('pexToEditType')?.value,
    ),
    'pexercises'
  ).then(resp=>{
                this.isLoading=false;
                location.reload();
  }).catch(e=>console.log('error al guardar',e));
}

///////////////////////////////////////////////////////////////////

deletePexercise(pexerciseToDelete:Pexercise){
  this.isLoading=true;
    if (window.confirm("Eliminar ejercicio personalizado ?")){
      this.crudService.deleteRow(pexerciseToDelete,'pexercises').then(resp=>{
        this.isLoading=false;
        location.reload();
        }).catch(e=>console.log('error al eliminar',e));
   
    }else
      this.isLoading=false;
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
