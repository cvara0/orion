export class Routine{

    constructor(
        public studentId         :string,
        public excerciseList   : string[],
        public isReadyList       : boolean[],
        public lapList           : string[],
        public id?               : string
        
    ){

    }
}