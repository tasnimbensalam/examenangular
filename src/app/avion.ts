export class Avions {
    public id: number;
    public marque: string;
    public description: string;
    public date:Date;
    constructor(id:number,marque:string, description:string,datee:Date) {
    this.id = id;
    this.marque = marque;
    this.description = description;
    this.date=datee;
    }
    }