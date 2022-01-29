import { Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from '../../services/product.service';
import { StorageService } from '../../services//storage.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.css']
})
export class ModalAddProductComponent implements OnInit {
  today: Date = new Date();
  files: File[] = [];
  images: any[] = [];
  titleModal: string;
  productEdit: any;
  @Output() created: any = new EventEmitter();
  @Output() updated: any = new EventEmitter();
  progress_bar: boolean = false;
  hasOfferPrice: boolean = false;
  newProductForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
              private _productService: ProductService,
              private _storageService: StorageService,
              private storage: AngularFireStorage,
              private dialogRef: MatDialogRef<ModalAddProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { 
                this.titleModal = this.data.typeModal;
                this.productEdit = this.data.data;
              }

  ngOnInit(): void {
    this.newProductForm = this._builderForm();
    console.log('data', this.data)
  }

  _builderForm() {
    const pattern = '[a-zA-Z ]{2,254}';

    const floatPattern = '[+-]?([0-9]*[.])?[0-9]+';
    const form = this._formBuilder.group({
      title: [this.productEdit?.title, [Validators.required, Validators.pattern(pattern)]],
      description: [this.productEdit?.description, [Validators.required]],
      salePrice: [this.productEdit?.salePrice, [Validators.required, Validators.pattern(floatPattern)]],
      offerPrice: [{value: this.productEdit?.offerPrice || null, disabled: true}, [Validators.required, Validators.pattern(floatPattern)]],
      endDateOffer: [{value: this.productEdit?.endDateOffer || null, disabled: true}, [Validators.required, this.dateValidator]],
      // arrayImages: [null, [Validators.required]]
     
    });

    return form;
  }

  

  onSelect(event:any) {
    
    this.files.push(...event.addedFiles);
    console.log('files', this.files)
    
  }

  uploadImages():  Promise<any>{
    return new Promise(async (resolve, reject)=>{
      try{
        for(let i = 0; i < this.files.length; i++){
          let reader = new FileReader();
          reader.readAsDataURL(this.files[i])
          let fileName = this.files[i].name;
          reader.onloadend = () => {
            this._storageService.uploadImage('cesar'+'-'+fileName, reader.result).then(url =>{
              this.images.push(url);
              if(i+1 == this.files.length){
                resolve(this.images)
              }
    
            });
          }
        }
       
      } catch(err) {
        console.log(err);
      }
    })
    
    
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
    
  }

   /*Getters */
   get title() { return this.newProductForm.controls['title'] }
   get description() { return this.newProductForm.controls['description'] }
   get salePrice() { return this.newProductForm.controls['salePrice'] }
   get offerPrice() { return this.newProductForm.controls['offerPrice'] }
   get endDateOffer() { return this.newProductForm.controls['endDateOffer'] }


   changeHasOffer(e:any){
     
     this.hasOfferPrice = e.checked;
     if(this.hasOfferPrice == true) {
       this.offerPrice.enable();
       this.endDateOffer.enable();
     }else{
       this.offerPrice.disable();
       this.endDateOffer.disable();
       this.offerPrice.reset();
       this.endDateOffer.reset();
       
     }

   }

   dateValidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
      return {dateValidator: true};
    }
    return null;
  }

  validateOfferPrice(e:any){
    console.log(parseInt(e.key))
    console.log(this.offerPrice.value)
    if(parseInt(this.offerPrice.value) >= parseInt(this.salePrice.value)){
      this.offerPrice.setErrors({'less': true})
    }
  }

  endDateO: any;
  endDateChanged(e:any){
    this.endDateO = e.value.toString();
  }

  sendProduct(){
    this.progress_bar = true;  
    console.log(this.titleModal)
    if(this.titleModal === 'Agregar Producto'){

      this.uploadImages().then(imgs=>{
        let newProduct: Product = {
          title: this.title.value,
          description: this.description.value,
          salePrice: this.salePrice.value,
          offerPrice: this.offerPrice.value,
          endDateOffer: this.endDateO || '',
          urlImages: this.images
        };
        console.log('nuevo producto',newProduct);
        this._productService.addProduct(newProduct).then((res)=>{
          this.progress_bar = false;
          this.created.emit(newProduct);
          this.dialogRef.close();
        });
      })


      
    } else{
      let editProduct: Product = {
        title: this.title.value,
        description: this.description.value,
        salePrice: this.salePrice.value,
        offerPrice: this.offerPrice.value,
        endDateOffer: this.endDateO || '',
        sku: this.data.data.sku,
        urlImages: this.data.data.urlImages
      };
      console.log('edit item', editProduct)
      this._productService.updateProducts(editProduct).then((res)=>{
        this.progress_bar = false;
        console.log('se actualizó')
        this.updated.emit();
        this.dialogRef.close();
      })
    }
    
  }

}
