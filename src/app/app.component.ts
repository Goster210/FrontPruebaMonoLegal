import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Facturas } from './Interfaces/facturas';
import { FacturasService } from './Services/facturas.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoAddEditComponent } from './Dialog/dialogo-add-edit/dialogo-add-edit.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteComponent } from './Dialog/dialogo-delete/dialogo-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'codigoFactura',
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
    'Acciones',
  ];
  dataSource = new MatTableDataSource<Facturas>();

  constructor(
    private _facturaServicio: FacturasService,
    public dialog: MatDialog,
    private _SnackBar: MatSnackBar
  ) {}

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

  listarFacturas() {
    this._facturaServicio.getList().subscribe({
      next: (dataResponse) => {
        console.log(dataResponse);

        this.dataSource.data = dataResponse;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  dialogNuevaFactura() {
    this.dialog
      .open(DialogoAddEditComponent, { disableClose: true, width: '350px' })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'creado') {
          this.listarFacturas();
        }
      });
  }

  dialogEditarFactura(dataFactura: Facturas) {
    this.dialog
      .open(DialogoAddEditComponent, {
        disableClose: true,
        width: '350px',
        data: dataFactura,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'editado') {
          this.listarFacturas();
        }
      });
  }

  verAlerta(message: string, action: string) {
    this._SnackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  dialogEliminarFactura(dataFactura: Facturas) {
    this.dialog
      .open(DialogoDeleteComponent, { disableClose: true, data: dataFactura })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'eliminar') {
          this._facturaServicio.delete(dataFactura.codigoFactura).subscribe({
            next: (data) => {
              this.verAlerta('La Factura fue eliminada', 'Listo'),
                this.listarFacturas();
            },
            error: (e) => {
              this.verAlerta('No se pudo eliminar', 'Error');
            },
          });
        }
      });
  }
}
