import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { hide } from '@popperjs/core';
import { Exercise } from 'src/app/models/exercise.models';
import { Pexercise } from 'src/app/models/pexercise.models';
import { Student } from 'src/app/models/student.models';
import { CrudService } from 'src/app/services/crud.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { PexerciseService } from 'src/app/services/pexercise.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html'
})
export class RoutineComponent implements OnInit {

  //pexersiceListByStudentId:Pexercise[] | undefined ;

  studentByStudentId!  :Student;
  paramStudentId       :string;

  closeResult          :string='';
  addPexerciseForm!    :FormGroup;
  editPexerciseForm!   :FormGroup;

  pexerciseList!        :Pexercise[];
  exerciseList!         :Exercise[];
  exerciseListById!         :Exercise[];
  //exerciseById!         :Exercise ;

  pexerciseToEdit!     :Pexercise;
  //pexerciseToView!     :Pexercise;

  dosageList           :string[];
  loadList             :number[];
  restTimeList         :number[];
  typeList             :string[];

  showOrHide           :string;

  isLoading:boolean=false;

  dangerousVideoUrl:string='';
  videoUrl:SafeResourceUrl='';


  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    public crudService:CrudService,
    private sanitizer:DomSanitizer
    ) { 

      this.dosageList=['dosaje1','dosaje2','dosaje3','etc'];
      this.loadList=[5,10,15];    
      this.restTimeList=[1,2,5];  
      this.typeList=['tipo1','tipo2','tipo3','etc'];
      this.paramStudentId=this.activatedRoute.snapshot.paramMap.get('id')!;
      this.showOrHide="";
    }

  ngOnInit(): void {
    this.createAddPexerciseForm();
    
    this.exerciseList=this.crudService.getRowList('exercises');
    
    this.crudService.getRowByCol(this.paramStudentId,'studentId','pexercises').then(resp => { 
      this.pexerciseList=resp;
    });
    
  this.crudService.getRowByCol(this.paramStudentId,'__name__','students').then(resp => { 
    this.studentByStudentId=resp[0]; 
});
  
    
  }
 ////////////////////////////////////////////////////////////////

  hideToggle(i:number){
    const element = document.getElementById('toggle'+i);
    //const element2 = document.getElementById('iframe'+i);
    if(element!=null){
        element.style.display='none';
      }
  }

  showHideToggle(i:number){
    const element = document.getElementById('toggle'+i);
    //const element2 = document.getElementById('iframe'+i);
    if(element!=null){
      if(element.style.display=='none'){
        element.style.display='block';
        
      }
        
      else{
        element.style.display='none';
      }
    }
  }

  getExerciseById(exerciseId:string){
    
    return this.exerciseList.find(i=>i.id==exerciseId);
  }
  getUnsafeTipUrlByExerciseId(exerciseId:string){
   
  return 'https://www.youtube-nocookie.com/embed/' + this.exerciseList.find(i=>i.id==exerciseId)!.tipsUrl+'?modestbranding=1&rel=0&iv_load_policy=3&showinfo=0';
   
  }

  /*
studentId     : string,
exerciseId    : string,
isReady       : boolean,
load          : number,
dosage        : string,
time          : number,
restTime      : number,
type          : string,
id?           : string
*/

  setIsReady(pexerciseReady:Pexercise){
    this.isLoading=true;
  
    this.crudService.putRow(
      new Pexercise(
          this.paramStudentId,
          pexerciseReady.exerciseId,
          true,
          pexerciseReady.load,
          pexerciseReady.dosage,
          pexerciseReady.time,
          pexerciseReady.restTime,
          pexerciseReady.type,
          pexerciseReady.id
      ),
      'pexercises'
    ).then(resp=>{
                  this.isLoading=false;
    }).catch(e=>console.log('error al guardar',e));
  }

   ////////////////////////////////////////////////////////////////
  createAddPexerciseForm(){
  
    this.addPexerciseForm=this.formBuilder.group({
      pexToAddExerciseId     : ['',[Validators.required]],
      pexToAddIsReady        : ['',[Validators.required]],
      pexToAddLoad           : [0,[Validators.required]],
      pexToAddDosage         : ['',[Validators.required]],
      pexToAddTime           : [ 0 ,[Validators.required]],
      pexToAddRestTime       : [ 0,[Validators.required]],
      pexToAddType           : ['',[Validators.required]]
      
    });
  }
  get validPexToAddExercise(){
    return this.addPexerciseForm.get('pexToAddExerciseId')?.dirty;
  }

  get validPexToAddIsReady(){
    return this.addPexerciseForm.get('pexToAddIsReady')?.dirty;
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

  get validPexToAddType(){
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

  get validPexToEditIsReady(){
    return this.editPexerciseForm.get('pexToEditIsReady')?.dirty;
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
        this.pexerciseToEdit.id
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
