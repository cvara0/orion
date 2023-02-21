import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pay } from 'src/app/models/pay.models';
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

  closeResult          :string='';
  addPayForm!    :FormGroup;
  editPayForm!   :FormGroup;

  payList!        :Pay[];
  planList        :string[];

  payToEdit!     :Pay;

  isLoading:boolean=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    public crudService:CrudService
    ) { 

      this.planList=[
        "1x1",//una persona una vez por semana etc
        "1x2",
        "1x3",
        "etc",
      ];
      this.paramStudentId=this.activatedRoute.snapshot.paramMap.get('id')!;
      
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
        public payDate       : string,
        public price         : string,
        public plan          : string,
        public state         : string,
        public id?           : string
    ){
*/
   ////////////////////////////////////////////////////////////////
  createAddPayForm(){
  
    this.addPayForm=this.formBuilder.group({
      pexToAddExerciseId     : ['',[Validators.required]],
      pexToAddisReady        : ['',[Validators.required]],
      pexToAddLoad           : ['',[Validators.required]],
      pexToAddDosage         : ['',[Validators.required]],
      pexToAddTime           : [  ,[Validators.required]],
      pexToAddRestTime       : ['',[Validators.required]],
      pexToAddType           : ['',[Validators.required]]
      
    });
  }
  get validPexToAddExercise(){
    return this.addPexerciseForm.get('pexToAddExerciseId')?.dirty;
  }

  get validPexToAddisReady(){
    return this.addPexerciseForm.get('pexToAddisReady')?.dirty;
  }

  get validPexToAddLoad(){
    return this.addPexerciseForm.get('pexToAddLoad')?.dirty;
  }

  get validPexToAddDosage(){
    return this.addPexerciseForm.get('pexToAddDosage')?.dirty;
  }

  /*get validPexToAddTime(){
    return this.addPexerciseForm.get('pexToAddTime')?.dirty;
  }*/

 
  get validPexToAddRestTime(){
    return this.addPexerciseForm.get('pexToAddRestTime')?.dirty;
  }

  get validPexToAddTypee(){
    return this.addPexerciseForm.get('pexToAddType')?.dirty;
  }

  saveAddPexercise(){

    this.isLoading=true;
    this.crudService.postRow(
      new Pexercise(
        this.paramStudentId,
        this.addPexerciseForm.get('pexToAddExerciseId')?.value,
        false,
        this.addPexerciseForm.get('pexToAddLoad')?.value,
        this.addPexerciseForm.get('pexToAddDosage')?.value,
        this.addPexerciseForm.get('pexToAddTime')?.value,
        this.addPexerciseForm.get('pexToAddRestTime')?.value,
        this.addPexerciseForm.get('pexToAddType')?.value,
      ),
      'pexercises'
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
