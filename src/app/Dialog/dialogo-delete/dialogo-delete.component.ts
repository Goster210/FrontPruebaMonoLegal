import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Facturas } from 'src/app/Interfaces/facturas';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent implements OnInit {

  constructor(

    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFactura: Facturas

  ) { }

  ngOnInit(): void {
  }

  confirmacionDelete(){
    if(this.dataFactura){
      this.dialogoReferencia.close("eliminar")
    }
  }

}
