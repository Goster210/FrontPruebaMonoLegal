export interface Facturas {
    codigoFactura:string,
    cliente:string, 
    correo:string, 
    ciudad:string, 
    nit:number,
    totalFactura:number,
    subTotal:number,
    iva:number,
    retencion:number,
    fechaCreacion:string, 
    estado:string, 
    pagada:boolean,
    fechaPago:string

}
