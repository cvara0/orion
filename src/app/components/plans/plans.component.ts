import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Plan } from 'src/app/models/plan.models';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styles: [
  ]
})
export class PlansComponent implements OnInit {

  closeResult         :string='';
  addPlanForm!        :FormGroup;
  editPlanForm!       :FormGroup;

  planList            :Plan[];

  planToEdit!         :Plan;

  isLoading:boolean=false;

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,public crudService:CrudService) {

    this.planList=this.crudService.getRowList('plans');
    
   }

  ngOnInit(): void {
    this.createAddPlanForm();
    
  }


   ////////////////////////////////////////////////////////////////
  createAddPlanForm(){
  
    this.addPlanForm=this.formBuilder.group({
      plaToAddName          : ['',[Validators.required]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      plaToAddPrice         : ['',[Validators.required]],
    });
  }
  get validPlaToAddName(){
    return this.addPlanForm.get('plaToAddName')?.invalid;
  }

  get validPlaToAddPrice(){
    return this.addPlanForm.get('plaToAddPrice')?.invalid;
  }

  
  saveAddPlan(){

    this.isLoading=true;
    this.crudService.postRow(
      new Plan(
        this.addPlanForm.get('plaToAddName')?.value,
        this.addPlanForm.get('plaToAddPrice')?.value
      ),
    'plans'
  ).then(resp=>
      {this.isLoading=false;
      location.reload();
      })
   .catch(e=>{console.log('error al guardar',e);
              this.isLoading=false;});
  }
 ////////////////////////////////////////////////////////////////
  createEditPlanForm(){
    this.addPlanForm=this.formBuilder.group({
      plaToAddName          : [this.planToEdit.name,[Validators.required]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      plaToAddPrice         : [this.planToEdit.price,[Validators.required]],
    });
  }
  get validPlaToEditName(){
    return this.editPlanForm.get('plaToEditName')?.invalid;
  }

  get validPlaToEditPrice(){
    return this.editPlanForm.get('plaToEditPrice')?.invalid;
  }

 
saveEditplan(){

  this.isLoading=true;
  
  this.crudService.putRow(
    new Plan(
      this.editPlanForm.get('plaToEditName')?.value,
      this.editPlanForm.get('plaToEditPrice')?.value
    ),
  'plans'
).then(resp=>
    {this.isLoading=false;
    location.reload();
    })
 .catch(e=>{console.log('error al guardar',e);
            this.isLoading=false;});
}


///////////////////////////////////////////////////////////////////

deletePlan(planToDelete:Plan){
  this.isLoading=true;
    if (window.confirm("Eliminar ejercicio "+planToDelete.name+" ?")){
      this.crudService.deleteRow(planToDelete,'plans').then(resp=>
        {this.isLoading=false;
        location.reload();
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
