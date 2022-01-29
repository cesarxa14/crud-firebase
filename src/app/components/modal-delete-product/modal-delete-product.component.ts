import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete-product',
  templateUrl: './modal-delete-product.component.html',
  styleUrls: ['./modal-delete-product.component.css']
})
export class ModalDeleteProductComponent implements OnInit {

  @Output() deleted: any = new EventEmitter();
  constructor(private _productService: ProductService,
              private dialogRef: MatDialogRef<ModalDeleteProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  deleteProduct(){
    console.log(this.data.sku)
    this._productService.deleteProducts(this.data.sku).then(()=>{
      console.log('se borró')
      this.dialogRef.close();
      this.deleted.emit();
    })
  }

  closeModal(){
    this.dialogRef.close();
  }

}
