import { Component, OnInit, importProvidersFrom } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { Facturas } from 'src/app/Interfaces/facturas';
import { FacturasService } from 'src/app/Services/facturas.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateImput: 'DD/MM/YYYY',
  },
  display: {
    dateImput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialogo-add-edit',
  templateUrl: './dialogo-add-edit.component.html',
  styleUrls: ['./dialogo-add-edit.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class DialogoAddEditComponent implements OnInit {
  formFactura: FormGroup;
  tituloAccion: string = 'Crear';
  botonAccion: string = 'Guardar';

  constructor(
    private _facturaServicio: FacturasService,
    private dialogoReferencia: MatDialogRef<DialogoAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.formFactura = this.fb.group({
      codigoFactura: ['', Validators.required],
      cliente: ['', Validators.required],
      correo: ['', Validators.required],
      ciudad: ['', Validators.required],
      nit: ['', Validators.required],
      totalFactura: ['', Validators.required],
      subTotal: ['', Validators.required],
      iva: ['', Validators.required],
      retencion: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      estado: ['', Validators.required],
      pagada: ['', Validators.required],
      fechaPago: ['', Validators.required],
    });
  }

  verAlerta(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }
  addFactura(){

    console.log(this.formFactura.value)
    const modelo:Facturas ={
    codigoFactura:this.formFactura.value.codigoFactura,
    cliente:this.formFactura.value.cliente, 
    correo:this.formFactura.value.correo, 
    ciudad:this.formFactura.value.ciudad, 
    nit:this.formFactura.value.nit,
    totalFactura:this.formFactura.value.totalFactura,
    subTotal:this.formFactura.value.subTotal,
    iva:this.formFactura.value.iva,
    retencion:this.formFactura.value.retencion,
    fechaCreacion:this.formFactura.value.fechaCreacion, 
    estado:this.formFactura.value.estado, 
    pagada:Boolean(this.formFactura.value.pagada),
    fechaPago:this.formFactura.value.fechaPago
  }
  

  this._facturaServicio.add(modelo).subscribe({
    next:(data) =>{
      this.verAlerta("Factrua Creada Con exito","Listo"),
      this.dialogoReferencia.close("creado")
    },error:(e)=>{this.verAlerta("No se pudo crear","Error")}
  })

  
}
  ngOnInit(): void {}
}
