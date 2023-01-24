export class Routine{

    constructor(
        public studentId         :string,
        public excerciseIdList   : string[],
        public isReadyList       : boolean[],
        public lapList           : string[],
        public id?               : string
        
    ){

    }
}