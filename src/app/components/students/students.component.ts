import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pexercise } from 'src/app/models/pexercise.models';
import { Student } from 'src/app/models/student.models';
import { PayService } from 'src/app/services/pay.service';
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

  studentToEdit!     :Student;
  studentToView!     :Student;

  levelList          :string[];

  payState           :string;
  

  isLoading:boolean=false;

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,public studentService:StudentService,public payService:PayService) {
    this.studentList=[];
    this.payState='';
    this.levelList=['PRIMERA VEZ','POCA EXPERIENCIA','CON EXPERIENCIA','MUCHA EXPERIENCIA','EXPERTO'];

    
    this.studentList=this.studentService.getStudentList();
    console.log(this.studentList);
   /* studentService.getStudentList().subscribe(
      resp=>{
  
        this.studentList=resp;
        for (let i of this.studentList) { para el dia de pago
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
        
    });*/
    
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
    return this.addStudentForm.get('stuToAddGender')?.dirty;
  }

  get validStuToAddLevel(){
    return this.addStudentForm.get('stuToAddLevel')?.dirty;
  }

  get validStuToAddSport(){
    return this.addStudentForm.get('stuToAddSport')?.invalid;
  }

  get validStuToAddProfession(){
    return this.addStudentForm.get('stuToAddProfession')?.invalid;
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
    const entryDate = new Date();
    const payDate= new Date();
    payDate.setMonth(payDate.getMonth()+1);
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
    ).then(resp=>{this.isLoading=false;
                  location.reload();})
    .catch(e=>console.log('error al guardar',e));
    /*subscribe(resp=>{
      this.isLoading=false;
      location.reload();}); */
    this.addStudentForm.reset();
  }

 ////////////////////////////////////////////////////////////////
  createEditStudentForm(){
    this.editStudentForm=this.formBuilder.group({

      stuToEditName             : [this.studentToEdit.name,[Validators.required,Validators.minLength(1),Validators.maxLength(140)]],
      stuToEditSurname          : [this.studentToEdit.surname,[Validators.required,Validators.minLength(1),Validators.maxLength(140)]],
      stuToEditWeight           : [this.studentToEdit.weight,[Validators.required]],
      stuToEditAge              : [this.studentToEdit.age,[Validators.required]],
      stuToEditGender           : [this.studentToEdit.gender,[Validators.required]],
      stuToEditLevel            : [this.studentToEdit.level,[Validators.required]],
      stuToEditSport            : [this.studentToEdit.sport,[Validators.required]],
      stuToEditProfession       : [this.studentToEdit.profession,[Validators.required]],
      stuToEditDrug             : [this.studentToEdit.drug,[Validators.required]],
      stuToEditLimitation       : [this.studentToEdit.limitation,[Validators.required]],
      stuToEditPrescription     : [this.studentToEdit.prescription,[Validators.required]],
      stuToEditPhone            : [this.studentToEdit.phone,[Validators.required]],
      stuToEditComent           : [this.studentToEdit.coment,[Validators.required]]
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


  get validStuToEditSport(){
    return this.editStudentForm.get('stuToEditSport')?.invalid;
  }

  get validStuToEditProfession(){
    return this.addStudentForm.get('stuToEditProfession')?.invalid;
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

  get validStuToEditPayDate(){
    return this.editStudentForm.get('stuToEditPayDate')?.invalid;
  }

  saveEditStudent(){

    this.isLoading=true;
    
    this.studentService.putStudent(
      new Student(
        this.editStudentForm.get('stuToEditName')?.value,
        this.editStudentForm.get('stuToEditSurname')?.value,
        this.editStudentForm.get('stuToEditWeight')?.value,
        this.editStudentForm.get('stuToEditAge')?.value,
        this.editStudentForm.get('stuToEditGender')?.value,
        this.editStudentForm.get('stuToEditLevel')?.value,
        this.editStudentForm.get('stuToEditSport')?.value,
        this.editStudentForm.get('stuToEditProfession')?.value,
        this.editStudentForm.get('stuToEditDrug')?.value,
        this.editStudentForm.get('stuToEditLimitation')?.value,
        this.editStudentForm.get('stuToEditPrescription')?.value,
        this.editStudentForm.get('stuToEditPhone')?.value,
        this.editStudentForm.get('stuToEditComent')?.value,
        this.studentToEdit.id
      )
    ).then(resp=>{this.isLoading=false;
      location.reload();
      })
     .catch(e=>console.log('error al guardar',e));
  }


///////////////////////////////////////////////////////////////////

deleteStudent(studentToDelete:Student,i:number){
  this.isLoading=true;
    if (window.confirm("Eliminar alumno "+studentToDelete.name+" "+studentToDelete.surname+" ?")){
      this.studentService.deleteStudent(studentToDelete);
      /*.subscribe(resp=>{
        this.isLoading=false;
        location.reload();});*/
     
    
   
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
