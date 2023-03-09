import { Component, OnInit } from '@angular/core';
import { Pay } from 'src/app/models/pay.models';
import { Student } from 'src/app/models/student.models';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-allpays',
  templateUrl: './allpays.component.html'
})
export class AllpaysComponent implements OnInit {

  studentByStudentId!  :Student;

  allpaysList!        :Pay[];


  constructor(private crudService:CrudService) { }

  ngOnInit(): void {

    this.allpaysList=this.crudService.getRowList('pays');

  }

}
