import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exercise } from 'src/app/models/exercise.models';
import { CrudService } from 'src/app/services/crud.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styles: [
  ]
})
export class ExercisesComponent implements OnInit {

  closeResult         :string='';
  addExerciseForm!    :FormGroup;
  editExerciseForm!   :FormGroup;

  exerciseList        :Exercise[];

  exerciseToEdit!     :Exercise;
  exerciseToView!     :Exercise;

  muscleGroupList     :string[];
  elementList         :string[];
  difficultyList      :string[];
  genderList          :string[];

  page                :number;
  searchValue         :string;

  isLoading:boolean=false;

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,public crudService:CrudService) {

    this.muscleGroupList=[
      "antebrazos",
      "espalda",
      "abdominales",
      "etc",
    ];
    this.elementList=[
      "MANCUERNAS",
      "BARRAS",
      "PESAS RUSAS",
      "NADA",
      "etc",
    ];
    this.difficultyList=['MUY FACIL','FACIL','MEDIA','DIFICIL','MUY DIFICIL'];
    this.genderList=['GENERO','MUJER','HOMBRE','INDISTINTO'];

    this.exerciseList=this.crudService.getRowList('exercises');
    
    this.page=0;
    this.searchValue='';

   }

  ngOnInit(): void {
    this.createAddExerciseForm();
    
  }
///////////////////////////////////////////////////////
search(searchValue:string){
  this.page=0;
  this.searchValue=searchValue;
}

getUnsafeTipUrlByYoutubeId(youtubeId:string){
   
  return 'https://www.youtube-nocookie.com/embed/' + youtubeId+'?modestbranding=1&rel=0&iv_load_policy=3&showinfo=0';
   
  }

////////////////////////////////////////////////////////////////
  createAddExerciseForm(){
  
    this.addExerciseForm=this.formBuilder.group({
      exeToAddMuscleGroup  : ['',[Validators.required]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      exeToAddName         : ['',[Validators.required]],
      exeToAddDifficulty   : ['',[Validators.required]],
      exeToAddTipsUrl      : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(2048)]],//,Validators.pattern('https?://.+')
      exeToAddImgUrl       : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(2048),Validators.pattern('https?://.+')]],
      exeToAddGender       : ['',[Validators.required]],
      exeToAddElement      : ['',[Validators.required]],
      exeToAddCommonErrors : ['',[Validators.required]]
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
  get validExeToAddElement(){
    return this.addExerciseForm.get('exeToAddElement')?.dirty;
  }
  get validExeToAddCommonErrors(){
    return this.addExerciseForm.get('exeToAddCommonErrors')?.invalid;
  }

  saveAddExercise(){
    let exercise:Exercise=new Exercise(
      this.addExerciseForm.get('exeToAddMuscleGroup')?.value,
      this.addExerciseForm.get('exeToAddName')?.value,
      this.addExerciseForm.get('exeToAddDifficulty')?.value,
      this.addExerciseForm.get('exeToAddTipsUrl')?.value,
      this.addExerciseForm.get('exeToAddImgUrl')?.value,
      this.addExerciseForm.get('exeToAddGender')?.value,
      this.addExerciseForm.get('exeToAddElement')?.value,
      this.addExerciseForm.get('exeToAddCommonErrors')?.value
    );
    this.isLoading=true;
    this.crudService.postRow(
      exercise,
    'exercises'
  ).then(resp=>
      {
        this.exerciseList.push(exercise);
        window.alert("EJERCICIO AGREGADO");
        this.isLoading=false;
      })
   .catch(e=>{console.log('error al guardar',e);
              this.isLoading=false;});
  }
 ////////////////////////////////////////////////////////////////
  createEditExerciseForm(){
  
    this.editExerciseForm=this.formBuilder.group({
      exeToEditMuscleGroup  : [this.exerciseToEdit.muscleGroup,[Validators.required]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      exeToEditName         : [this.exerciseToEdit.name,[Validators.required]],
      exeToEditDifficulty   : [this.exerciseToEdit.difficulty,[Validators.required]],
      exeToEditTipsUrl      : [this.exerciseToEdit.tipsUrl,[Validators.required,Validators.minLength(1),Validators.maxLength(2048)]],//,Validators.pattern('https?://.+')
      exeToEditImgUrl       : [this.exerciseToEdit.imgUrl,[Validators.required,Validators.minLength(1),Validators.maxLength(2048),Validators.pattern('https?://.+')]],
      exeToEditGender       : [this.exerciseToEdit.gender,[Validators.required]],
      exeToAddElement       : [this.exerciseToEdit.element,[Validators.required]],
      exeToAddCommonErrors  : [this.exerciseToEdit.commonErrors,[Validators.required]]
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
  get validExeToEditElement(){
    return this.editExerciseForm.get('exeToEditElement')?.dirty;
  }
  get validExeToEditCommonErrors(){
    return this.addExerciseForm.get('exeToEditCommonErrors')?.invalid;
  }

 
saveEditExercise(){
 let exercise:Exercise=new Exercise(
  this.editExerciseForm.get('exeToEditMuscleGroup')?.value,
  this.editExerciseForm.get('exeToEditName')?.value,
  this.editExerciseForm.get('exeToEditDifficulty')?.value,
  this.editExerciseForm.get('exeToEditTipsUrl')?.value,
  this.editExerciseForm.get('exeToEditImgUrl')?.value,
  this.editExerciseForm.get('exeToEditGender')?.value,
  this.editExerciseForm.get('exeToEditElement')?.value,
  this.editExerciseForm.get('exeToEditCommonErrors')?.value,
  this.exerciseToEdit.id
)
  this.isLoading=true;
  
  this.crudService.putRow(
    exercise,
    'exercises'
  ).then(resp=>
      {
        const index = this.exerciseList.indexOf(this.exerciseToEdit);
        this.exerciseList.splice(index, 1, exercise);
        this.isLoading=false;
      
      })
   .catch(e=>{console.log('error al guardar',e);
              this.isLoading=false;});
}


///////////////////////////////////////////////////////////////////

deleteExercise(exerciseToDelete:Exercise){
  this.isLoading=true;
    if (window.confirm("Eliminar ejercicio "+exerciseToDelete.name+" ?")){
      this.crudService.deleteRow(exerciseToDelete,'exercises').then(resp=>
        {
          this.exerciseList=this.exerciseList.filter(i=>i!==exerciseToDelete);
          this.isLoading=false;
        })
     .catch(e=>console.log('error al eliminar',e)); 
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
