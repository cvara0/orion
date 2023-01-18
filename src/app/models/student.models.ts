export class Student{

    constructor(
        public id                 : number,
        public exerciseIdList     : number[]=[],
        public name               : string="",
        public surname            : string="",
        public weight             : number=0,
        public age                : number=0,
        public gender             : string=""
    ){

    }
}