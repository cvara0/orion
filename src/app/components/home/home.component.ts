import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exercise } from 'src/app/models/exercise.models';
import { Student } from 'src/app/models/student.models';
import { ExerciseService } from 'src/app/services/exercise.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  closeResult: string='';

  exerciseList          : Exercise[];


  
  constructor(
    private modalService: NgbModal,
    public studentService:StudentService,
    public exerciseService:ExerciseService
    ) { 

      this.exerciseService.getExerciseList();
      this.exerciseList=[];
      this.exerciseService.getExerciseList$().subscribe(exerciseList=>{//y aca finltro por id
      this.exerciseList=exerciseList;
      });
     
  }

  ngOnInit(): void {
  }

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
