import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exercise } from 'src/app/models/exercise.models';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styles: [
  ]
})
export class ExercisesComponent implements OnInit {

  closeResult        : string='';
  addExerciseForm!   :FormGroup;
  editExerciseForm!   :FormGroup;

  exerciseList:Exercise[];

  exerciseToEdit!:Exercise;

  muscleGroupList    :string[];
  difficultyList     :string[];
  genderList         :string[];


  isLoading:boolean=false;

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,public exerciseService:ExerciseService) {

    this.exerciseList=[];
    
    this.muscleGroupList=[
      "antebrazos",
      "espalda",
      "abdominales",
      "etc",
    ];
    this.difficultyList=['MUY FACIL','FACIL','MEDIA','DIFICIL','MUY DIFICIL'];
    this.genderList=['GENERO','MUJER','HOMBRE','INDISTINTO'];

    exerciseService.getExerciseList().subscribe(resp=>this.exerciseList=resp)
    
   }

  ngOnInit(): void {
    this.createAddExerciseForm();
    
  }


   ////////////////////////////////////////////////////////////////
  createAddExerciseForm(){
  
    this.addExerciseForm=this.formBuilder.group({
      exeToAddMuscleGroup  : ['',[Validators.required]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      exeToAddName         : ['',[Validators.required]],
      exeToAddDifficulty   : ['',[Validators.required]],
      exeToAddTipsUrl      : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(2048),Validators.pattern('https?://.+')]],
      exeToAddImgUrl       : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(2048),Validators.pattern('https?://.+')]],
      exeToAddGender       : ['',[Validators.required]],
    });
  }
  get validExeToAddMuscleGroup(){
    return this.addExerciseForm.get('exeToAddMuscleGroup')?.dirty;
  }

  get validExeToAddName(){
    return this.addExerciseForm.get('exeToAddName')?.invalid;
  }

  get validExeToAddDifficulty(){
    return this.addExerciseForm.get('exeToAddDifficulty')?.dirty;
  }

  get validExeToAddTipsUrl(){
    return this.addExerciseForm.get('exeToAddTipsUrl')?.invalid;
  }
  get validExeToAddImgUrl(){
    return this.addExerciseForm.get('exeToAddImgUrl')?.invalid;
  }
  get validExeToAddGender(){
    return this.addExerciseForm.get('exeToAddGender')?.dirty;
  }

  saveAddExercise(){

    this.isLoading=true;
    
    this.exerciseService.postExercise(
      new Exercise(
        this.addExerciseForm.get('exeToAddMuscleGroup')?.value,
        this.addExerciseForm.get('exeToAddName')?.value,
        this.addExerciseForm.get('exeToAddDifficulty')?.value,
        this.addExerciseForm.get('exeToAddTipsUrl')?.value,
        this.addExerciseForm.get('exeToAddImgUrl')?.value,
        this.addExerciseForm.get('exeToAddGender')?.value
      )
    ).subscribe(resp=>{
      this.isLoading=false;
      location.reload();}); 
    this.addExerciseForm.reset();
  }
 ////////////////////////////////////////////////////////////////
  createEditExerciseForm(){
  
    this.editExerciseForm=this.formBuilder.group({
      exeToEditMuscleGroup  : [this.exerciseToEdit.muscleGroup,[Validators.required]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      exeToEditName         : [this.exerciseToEdit.name,[Validators.required]],
      exeToEditDifficulty   : [this.exerciseToEdit.difficulty,[Validators.required]],
      exeToEditTipsUrl      : [this.exerciseToEdit.tipsUrl,[Validators.required,Validators.minLength(1),Validators.maxLength(2048),Validators.pattern('https?://.+')]],
      exeToEditImgUrl       : [this.exerciseToEdit.imgUrl,[Validators.required,Validators.minLength(1),Validators.maxLength(2048),Validators.pattern('https?://.+')]],
      exeToEditGender       : [this.exerciseToEdit.gender,[Validators.required]],
    });
  }
  get validExeToEditMuscleGroup(){
    return this.editExerciseForm.get('exeToEditMuscleGroup')?.dirty;
  }

  get validExeToEditName(){
    return this.editExerciseForm.get('exeToEditName')?.invalid;
  }

  get validExeToEditDifficulty(){
    return this.editExerciseForm.get('exeToEditDifficulty')?.dirty;
  }

  get validExeToEditTipsUrl(){
    return this.editExerciseForm.get('exeToEditTipsUrl')?.invalid;
  }
  get validExeToEditImgUrl(){
    return this.editExerciseForm.get('exeToEditImgUrl')?.invalid;
  }
  get validExeToEditGender(){
    return this.editExerciseForm.get('exeToEditGender')?.dirty;
  }
 
saveEditExercise(){

  this.isLoading=true;
  
  this.exerciseService.putExercise(
    new Exercise(
      this.editExerciseForm.get('exeToEditMuscleGroup')?.value,
      this.editExerciseForm.get('exeToEditName')?.value,
      this.editExerciseForm.get('exeToEditDifficulty')?.value,
      this.editExerciseForm.get('exeToEditTipsUrl')?.value,
      this.editExerciseForm.get('exeToEditImgUrl')?.value,
      this.editExerciseForm.get('exeToEditGender')?.value,
      this.exerciseToEdit.id
    )
  ).subscribe(resp=>{
    this.isLoading=false;
    location.reload();}); 
}

///////////////////////////////////////////////////////////////////
getExercises(){
  this.exerciseService.getExerciseList().subscribe();
}

///////////////////////////////////////////////////////////////////

deleteExercise(exerciseToDelete:Exercise,i:number){
  this.isLoading=true;
    if (window.confirm("Eliminar ejercicio "+exerciseToDelete.name+" ?")){
      this.exerciseService.deleteExercise(exerciseToDelete).subscribe(resp=>{
        this.isLoading=false;
        location.reload();});;
     
    
   
  }else
    this.isLoading=false;
  }
  


///////////////////////////////////////////////////////////////////
  open(content:any) {
    this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered:true,
        //size:'md'
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
