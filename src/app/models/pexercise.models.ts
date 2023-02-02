export class Pexercise{

    constructor(
        public studentId     : string,
        public exerciseId    : string,
        public isReady       : boolean,
        public load          : number,
        public dosage        : string,
        public time          : number,
        public restTime      : number,
        public type          : string,
        public id?           : string
    ){

    }
}