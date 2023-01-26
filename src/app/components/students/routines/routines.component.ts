import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pexercise } from 'src/app/models/pexercise.models';
import { PexerciseService } from 'src/app/services/pexercise.service';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styles: [
  ]
})
export class RoutinesComponent implements OnInit {
  routineListByStudentId:Pexercise[] | undefined ;
  
  constructor(private activatedRoute: ActivatedRoute,private pexerciseService:PexerciseService) {

   }

  ngOnInit(): void {
    const id=this.activatedRoute.snapshot.paramMap.get('id');
    console.log('rutnina'+ id);
    this.pexerciseService.getPexerciseList().subscribe(resp=>this.routineListByStudentId=resp.filter(resp2=>resp2.studentId==id));
    
  }

}
