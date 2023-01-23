import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/models/student.models';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styles: [
  ]
})
export class StudentsComponent implements OnInit {

  closeResult        : string='';
  addStudentForm!    :FormGroup;
  editStudentForm!   :FormGroup;

  studentList        :Student[];

  StudentToEdit!:Student;

  levelList          :string[];

  

  isLoading:boolean=false;

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,public studentService:StudentService) {

    this.studentList=[];
    
    this.levelList=['PRIMERA VEZ','POCA EXPERIENCIA','CON EXPERIENCIA','MUCHA EXPERIENCIA','EXPERTO'];

    studentService.getStudentList().subscribe(resp=>this.studentList=resp)
    
   }

  ngOnInit(): void {
    this.createAddStudentForm();
    
  }


   ////////////////////////////////////////////////////////////////
  createAddStudentForm(){
  /*
          public name?               : string,
        public surname?            : string,
        public weight?             : number,
        public age?                : number,
        public gender?             : string,
        public level?              : string,
        public sport?              : string,
        public profession?         : string,
        public drug?               : string,
        public limitation?         : string,
        public prescription?       : string,
        public phone?              : number,
        public coment?             : string,
        public pexerciseIdList?    : string[],
        public id?                 : string
  
  */
    this.addStudentForm=this.formBuilder.group({

      stuToAddName             : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(140)]],
      stuToAddSurname          : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(140)]],
      stuToAddWeight           : ['',[Validators.required]],
      stuToAddAge              : ['',[Validators.required]],
      stuToAddGender           : ['',[Validators.required]],
      stuToAddLevel            : ['',[Validators.required]],
      stuToAddSport            : ['',[Validators.required]],
      stuToAddProfession       : ['',[Validators.required]],
      stuToAddDrug             : ['',[Validators.required]],
      stuToAddLimitation       : ['',[Validators.required]],
      stuToAddPrescription     : ['',[Validators.required]],
      stuToAddPhone            : ['',[Validators.required]],
      stuToAddComent           : ['',[Validators.required]],
    });
  }
  get validStuToAddName(){
    return this.addStudentForm.get('stuToAddName')?.invalid;
  }

  get validStuToAddSurname(){
    return this.addStudentForm.get('stuToAddSurname')?.invalid;
  }

  get validStuToAddWeight(){
    return this.addStudentForm.get('stuToAddWeight')?.invalid;
  }

  get validStuToAddAge(){
    return this.addStudentForm.get('stuToAddAge')?.invalid;
  }

  get validStuToAddGender(){
    return this.addStudentForm.get('stuToAddGender')?.invalid;
  }

  get validStuToAddLevel(){
    return this.addStudentForm.get('stuToAddLevel')?.dirty;
  }

  get validStuToAddSport(){
    return this.addStudentForm.get('stuToAddSport')?.invalid;
  }

  get validStuToAddLimitation(){
    return this.addStudentForm.get('stuToAddLimitation')?.invalid;
  }

  get validStuToAddDrug(){
    return this.addStudentForm.get('stuToAddDrug')?.invalid;
  }

  get validStuToAddPrescription(){
    return this.addStudentForm.get('stuToAddPrescription')?.invalid;
  }

  get validStuToAddPhone(){
    return this.addStudentForm.get('stuToAddPhone')?.invalid;
  }

  get validStuToAddComent(){
    return this.addStudentForm.get('stuToAddComent')?.invalid;
  }


  saveAddStudent(){

    this.isLoading=true;
    
    this.studentService.postStudent(
      new Student(
        this.addStudentForm.get('stuToAddName')?.value,
        this.addStudentForm.get('stuToAddSurname')?.value,
        this.addStudentForm.get('stuToAddWeight')?.value,
        this.addStudentForm.get('stuToAddAge')?.value,
        this.addStudentForm.get('stuToAddGender')?.value,
        this.addStudentForm.get('stuToAddLevel')?.value,
        this.addStudentForm.get('stuToAddSport')?.value,
        this.addStudentForm.get('stuToAddProfession')?.value,
        this.addStudentForm.get('stuToAddDrug')?.value,
        this.addStudentForm.get('stuToAddLimitation')?.value,
        this.addStudentForm.get('stuToAddPrescription')?.value,
        this.addStudentForm.get('stuToAddPhone')?.value,
        this.addStudentForm.get('stuToAddComent')?.value
      )
    ).subscribe(resp=>{
      this.isLoading=false;
      location.reload();}); 
    this.addStudentForm.reset();
  }

  // todo seguir aca y agregar elementos a exercise 
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
