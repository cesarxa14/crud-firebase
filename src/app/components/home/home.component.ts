import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddProductComponent } from '../modal-add-product/modal-add-product.component';
import { ModalDeleteProductComponent } from '../modal-delete-product/modal-delete-product.component';
import {Router} from '@angular/router';

import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  progress_bar: boolean = false;
  products = new BehaviorSubject<any>([]);
  product_list: any[] = [];
  constructor(public dialog: MatDialog,
              private router: Router,
              private _productService: ProductService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.progress_bar = true;
    this._productService.getAllProducts().subscribe(res => {
      this.product_list = [];
      res.forEach((element:any) => {
        
        this.product_list.push(element.payload.doc.data());
      });
      this.products.next(this.product_list);
      console.log('products', this.products.value)
      this.progress_bar = false;
    })
  }

  openModal(typeModal: string, product?: any){

    const dialogRef = this.dialog.open(ModalAddProductComponent, {
      width: '600px',
      height: '600px',
      data: {typeModal: typeModal, data: product}
    })

    dialogRef.componentInstance.created.subscribe((data:any)=>{
      this._snackBar.open(`Producto Agregado!`, 'Cerrar', {
      duration:4000,
      horizontalPosition: 'start'
    });
    })

    dialogRef.componentInstance.updated.subscribe(()=>{
      this._snackBar.open(`Producto Actualizado!`, 'Cerrar', {
      duration:4000,
      horizontalPosition: 'start'
    });
    })

  }

  goToDetails(product:any){

    this.router.navigate(['product-detail', product])
    
  }

  openModalDelete(product: any){
    const dialogRef = this.dialog.open(ModalDeleteProductComponent, {
      width: '400px',
      height: 'auto',
      data: product
    })

    dialogRef.componentInstance.deleted.subscribe(() =>{
      this._snackBar.open(`Producto Eliminado!`, 'Cerrar', {
      duration:4000,
      horizontalPosition: 'start'
    });
    })
  }

}
