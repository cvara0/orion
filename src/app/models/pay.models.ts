export class Pay{

    constructor(
        public studentId     : string,
        public payDate       : string,
        public price         : string,
        public plan          : string,
        public state         : string,
        public id?           : string
    ){

    }
}