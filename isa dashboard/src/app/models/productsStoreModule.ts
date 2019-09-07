export interface productStore {
    id_isa_backend?: number;
    promo?: number;
    name: string;
    description?: string;
    img:string;
    img_alt?:string;
    stock:string;
    priceS:number;
    priceSD:number;
    IVA:number;
    precio_ancla?:string;
    category_id:number;
    infoAddStatus:boolean;
    infoAdd?:string;
    tags?:string;
    color_data?:string;
    fecven?:string;
}