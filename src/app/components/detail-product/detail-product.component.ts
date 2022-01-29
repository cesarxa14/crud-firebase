import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewFullscreenComponent } from '../modal-view-fullscreen/modal-view-fullscreen.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  
  progress_bar:boolean;
  dateConverted: string;
  images: Array<any> = [];
  productAux: any;
  product:any;

  constructor(private path:ActivatedRoute,
              private _productService: ProductService,
              public dialog: MatDialog
              ) {
    this.path.params.subscribe(params=>{
      this.productAux = params;
    })
   }

  ngOnInit(): void {
    this.getProductInfo();
  }

  getProductInfo(){
      this.progress_bar=true;
      this._productService.getProductBySku(this.productAux.sku).subscribe(res=>{
      this.product = res;
      console.log('detalle', this.product)
      this.progress_bar = false;
      this.convertToJsonArray(this.product.urlImages)
      console.log('imgs',this.images);
      this.convertDate();
    });
    
  }

  convertToJsonArray(imgsArray:any){
    
    for(let i=0; i< imgsArray.length; i++){
      let item = {
        "url": imgsArray[i]
      }
      this.images.push(item)
    }

  }

  convertDate(){
    console.log(this.product.endDateOffer);
    let offerDate = new Date(this.product.endDateOffer);
    let day = offerDate.getDate()
    let month = offerDate.getMonth() + 1
    let year = offerDate.getFullYear()

    if(month < 10){
      this.dateConverted = day+'-0'+month+'-'+year
    }else{
      this.dateConverted = day+'-'+month+'-'+year
    }
    console.log(offerDate);
  }

  viewImageFullscreen(img:any){
    const dialogRef = this.dialog.open(ModalViewFullscreenComponent, {
      width: '1000px',
      height: '600px',
      data: img
    })
  }

 

}
