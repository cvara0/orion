import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exercise } from 'src/app/models/exercise.models';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  closeResult        : string='';
  addExerciseForm!   :FormGroup;

  muscleGroupList    :string[];
  difficultyList     :string[];
  genderList         :string[];


  isLoading:boolean=false;

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,public exerciseService:ExerciseService) { 
    this.muscleGroupList=[
      "antebrazos",
      "espalda",
      "abdominales",
      "etc",
    ];
    this.difficultyList=['MUY FACIL','FACIL','MEDIA','DIFICIL','MUY DIFICIL'];
    this.genderList=['GENERO','MUJER','HOMBRE','INDISTINTO'];
    
  }

  ngOnInit(): void {
    this.createAddExerciseForm();
  }

  createAddExerciseForm(){
  
    this.addExerciseForm=this.formBuilder.group({
      exeMuscleGroup  : ['',[Validators.required]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      exeName        : ['',[Validators.required]],
      exeDifficulty   : ['',[Validators.required]],
      exeTipsUrl      : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(2048),Validators.pattern('https?://.+')]],
      exeImgUrl       : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(2048),Validators.pattern('https?://.+')]],
      exeGender       : ['',[Validators.required]],
    });
  }
 
  get validExeMuscleGroup(){
    return this.addExerciseForm.get('exeMuscleGroup')?.dirty;
  }

  get validExeName(){
    return this.addExerciseForm.get('exeName')?.invalid;
  }

  get validExeDifficulty(){
    return this.addExerciseForm.get('exeDifficulty')?.dirty;
  }

  get validExeTipsUrl(){
    return this.addExerciseForm.get('exeTipsUrl')?.invalid;
  }
  get validExeImgUrl(){
    return this.addExerciseForm.get('exeImgUrl')?.invalid;
  }
  get validExeGender(){
    return this.addExerciseForm.get('exeGender')?.dirty;
  }
  
  /*
        public muscleGroup       : string,
        public name              : string="",
        public difficulty        : number,
        public tipsUrl           : string="",
        public imgUrl            : string="",
        public gender            : string="",
        public id?               : string
*/
  saveAddExercise(){
    this.isLoading=true;
    this.exerciseService.postExercise(
      new Exercise(
        this.addExerciseForm.get('exeMuscleGroup')?.value,
        this.addExerciseForm.get('exeName')?.value,
        this.addExerciseForm.get('exeDifficulty')?.value,
        this.addExerciseForm.get('exeTipsUrl')?.value,
        this.addExerciseForm.get('exeImgUrl')?.value,
        this.addExerciseForm.get('exeGender')?.value,
        this.addExerciseForm.get('exeImage')?.value,
       
      )
    ).subscribe(resp=>{
      this.isLoading=false;
      location.reload();}); 
    this.addExerciseForm.reset();
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
