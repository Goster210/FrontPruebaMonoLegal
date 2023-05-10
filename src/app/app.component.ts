import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Facturas } from './Interfaces/facturas';
import { FacturasService } from './Services/facturas.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogoAddEditComponent } from './Dialog/dialogo-add-edit/dialogo-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['codigoFactura',
    'cliente', 
    'correo', 
    'ciudad', 
    'nit',
    'totalFactura',
    'subTotal',
    'iva',
    'retencion',
    'fechaCreacion', 
    'estado', 
    'pagada',
    'fechaPago',
  'Acciones'];
  dataSource = new MatTableDataSource<Facturas>();

  constructor(private _facturaServicio: FacturasService, public dialog: MatDialog){

  }

  ngOnInit(): void {
      this.listarFacturas();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}


listarFacturas(){
      

  this._facturaServicio.getList().subscribe({
    next:(dataResponse) => {
      
      console.log(dataResponse)

      this.dataSource.data = dataResponse;
  },error:(e)=>{console.log(e)}
  
})

}
dialogNuevaFactura() {
  this.dialog.open(DialogoAddEditComponent);
}
}

