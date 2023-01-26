export class Pexercise{

    constructor(
        public studentId     : string,
        public excerciseId   : string,
        public isReady       : boolean,
        public load          : number,
        public dosification  : number,
        public time          : number,
        public restTime      : number,
        public id?           : string
    ){

    }
}