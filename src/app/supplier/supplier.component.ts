import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Atributos2 } from '../Alunos';
import { SupplierService } from './../supplier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  supplier: Atributos2[] = [];

  formGroupClient : FormGroup;
  isEditing: any;
  submitted: boolean | undefined;
  formGroupStudant: any;
  router: any;

  constructor (private SupplierService: SupplierService,
    private FormBuilder: FormBuilder
    ){
      this.formGroupClient = FormBuilder.group({
        id : ['', [Validators.required]],
        nome : ['', [Validators.required]],
        contato : ['', [Validators.required]],
        email : ['', [Validators.required, Validators.email]],
        sala : ['', [Validators.required]]
      });
    }

    ngOnInit(): void {
      this.loadHome();
    }
    loadHome() {
      this.SupplierService.getSupplier().subscribe(
        {
          next : data => this.supplier = data
        }
      );
    }
  
    save() {
      if(this.isEditing)
      {
        this.SupplierService.edit(this.formGroupClient.value).subscribe(
          {
            next: () => {
              this.loadHome();
              this.formGroupClient.reset
              this.isEditing = false;
            }
          }
        )
      }
      else{
        this.SupplierService.save(this.formGroupClient.value).subscribe(
          {
            next: data => {
              this.supplier.push(data)
              this.formGroupClient.reset();
            }
          }
          );
      }
  
  
      
    }
  
    delete(supplier: Atributos2){
      this.SupplierService.delete(supplier).subscribe({
        next: () => this.loadHome()
      })
    }
  
    edit(supplier: Atributos2){
      this.formGroupClient.setValue(supplier);
      this.isEditing = true;
    }

    clean(){
      this.formGroupClient.reset()
      this.isEditing = false;
      this.submitted = false;
    }

  }

