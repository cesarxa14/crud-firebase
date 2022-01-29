import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { Firestore, collectionData, collection} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { v4 as uuidv4 } from 'uuid';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Observable<Product[]>;
  private productsCollection: AngularFirestoreCollection<Product>
  constructor(private readonly afs: AngularFirestore) { 
    // this.productsCollection = afs.collection<Product>('products');
    // this.getAllProducts();
  }

  getAllProducts(): Observable<any>{
    
    return this.afs.collection('products').snapshotChanges();
  }

  getProductBySku(sku:string):  Observable<any>{
    return this.afs.collection('products').doc(`${sku}`).valueChanges();
  }
  // getProductsByID(id: string): Promise<any>{}
  addProduct(product: Product): Promise<any>{
    return new Promise(async (resolve, reject)=>{
      try{
        // const id = idProduct || this.afs.createId();
        // const sku = this.afs.createId();
        const sku = uuidv4();
        console.log('new sku', sku)
        const data = {sku, ...product};
        const result = this.afs.collection('products').doc(sku).set(data);
        console.log('resultado add', result)
        resolve(result);
      } catch(err) {
        // reject(err.message);
        console.log(err);
      }
    })
  }

  updateProducts(product: Product): Promise<any>{
    
    return new Promise(async (resolve, reject)=>{
      try{
        
        const result = this.afs.collection('products').doc(product.sku).set(product);
        console.log('resultado add', result)
        resolve(result);
      } catch(err) {
        // reject(err.message);
        console.log(err);
      }
    })
  }
  // updateProducts(product: Product, id: string): Promise<any>{}
  deleteProducts(idProduct: string): Promise<any>{
    return new Promise(async (resolve, reject)=>{
      try{
        
        const result = await this.afs.collection('products').doc(idProduct).delete();
        resolve(result);
      } catch(err) {
        // reject(err.message);
        console.log(err);
      }
    })
  }

   
}
