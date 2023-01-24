import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  studentToEdit!:Student;

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
        this.addStudentForm.get('stuToAddComent')?.value,
    
      )
    ).subscribe(resp=>{
      this.isLoading=false;
      location.reload();}); 
    this.addStudentForm.reset();
  }

 ////////////////////////////////////////////////////////////////
  createEditStudentForm(){
    this.editStudentForm=this.formBuilder.group({

      stuToEditName             : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(140)]],
      stuToEditSurname          : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(140)]],
      stuToEditWeight           : ['',[Validators.required]],
      stuToEditAge              : ['',[Validators.required]],
      stuToEditGender           : ['',[Validators.required]],
      stuToEditLevel            : ['',[Validators.required]],
      stuToEditSport            : ['',[Validators.required]],
      stuToEditProfession       : ['',[Validators.required]],
      stuToEditDrug             : ['',[Validators.required]],
      stuToEditLimitation       : ['',[Validators.required]],
      stuToEditPrescription     : ['',[Validators.required]],
      stuToEditPhone            : ['',[Validators.required]],
      stuToEditComent           : ['',[Validators.required]],
      
    });
  }
  get validStuToEditName(){
    return this.editStudentForm.get('stuToEditName')?.invalid;
  }

  get validStuToEditSurname(){
    return this.editStudentForm.get('stuToEditSurname')?.invalid;
  }

  get validStuToEditWeight(){
    return this.editStudentForm.get('stuToEditWeight')?.invalid;
  }

  get validStuToEditAge(){
    return this.editStudentForm.get('stuToEditAge')?.invalid;
  }

  get validStuToEditGender(){
    return this.editStudentForm.get('stuToEditGender')?.invalid;
  }

  get validStuToEditLevel(){
    return this.editStudentForm.get('stuToEditLevel')?.dirty;
  }

  get validStuToEditSport(){
    return this.editStudentForm.get('stuToEditSport')?.invalid;
  }

  get validStuToEditLimitation(){
    return this.editStudentForm.get('stuToEditLimitation')?.invalid;
  }

  get validStuToEditDrug(){
    return this.editStudentForm.get('stuToEditDrug')?.invalid;
  }

  get validStuToEditPrescription(){
    return this.editStudentForm.get('stuToEditPrescription')?.invalid;
  }

  get validStuToEditPhone(){
    return this.editStudentForm.get('stuToEditPhone')?.invalid;
  }

  get validStuToEditComent(){
    return this.editStudentForm.get('stuToEditComent')?.invalid;
  }


  saveEditStudent(){

    this.isLoading=true;
    
    this.studentService.putStudent(
      new Student(
        this.addStudentForm.get('stuToEditName')?.value,
        this.addStudentForm.get('stuToEditSurname')?.value,
        this.addStudentForm.get('stuToEditWeight')?.value,
        this.addStudentForm.get('stuToEditAge')?.value,
        this.addStudentForm.get('stuToEditGender')?.value,
        this.addStudentForm.get('stuToEditLevel')?.value,
        this.addStudentForm.get('stuToEditSport')?.value,
        this.addStudentForm.get('stuToEditProfession')?.value,
        this.addStudentForm.get('stuToEditDrug')?.value,
        this.addStudentForm.get('stuToEditLimitation')?.value,
        this.addStudentForm.get('stuToEditPrescription')?.value,
        this.addStudentForm.get('stuToEditPhone')?.value,
        this.addStudentForm.get('stuToEditComent')?.value,
        this.studentToEdit.id
      )
    ).subscribe(resp=>{
      this.isLoading=false;
      location.reload();}); 
    this.addStudentForm.reset();
  }

///////////////////////////////////////////////////////////////////
getStudents(){
  this.studentService.getStudentList().subscribe();
}

///////////////////////////////////////////////////////////////////

deleteStudent(studentToDelete:Student,i:number){
  this.isLoading=true;
    if (window.confirm("Eliminar alumno "+studentToDelete.name+" "+studentToDelete.surname+" ?")){
      this.studentService.deleteStudent(studentToDelete).subscribe(resp=>{
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
