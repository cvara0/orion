import { Pexercise } from "./pexercise.models";

export class Student{

    constructor(
        public name               : string,
        public surname            : string,
        public weight             : number,
        public age                : string,
        public gender             : string,
        public level              : string,
        public sport              : string,
        public profession         : string,
        public drug               : string,
        public limitation         : string,
        public prescription       : string,
        public phone              : number,
        public coment             : string,
        public id?                : string
        
    ){

    }
}