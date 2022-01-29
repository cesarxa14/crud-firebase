import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-view-fullscreen',
  templateUrl: './modal-view-fullscreen.component.html',
  styleUrls: ['./modal-view-fullscreen.component.css']
})
export class ModalViewFullscreenComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalViewFullscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public img: any,
  ) { }

  ngOnInit(): void {
    console.log(this.img)
  }

}
