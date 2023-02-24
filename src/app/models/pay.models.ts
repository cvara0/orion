export class Pay{

    constructor(
        public studentId     : string,
        public planId        : string,
        public payDate       : number,
        public isPaid        : boolean,
        public id?           : string
    ){

    }
}