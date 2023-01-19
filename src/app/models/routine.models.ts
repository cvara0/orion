export class Routine{

    constructor(
        public id                : number,
        public excerciseIdList   : number[],
        public isReadyList       : boolean[],
        public lapsList          : number[]
        /*recordad que se iteran juntos */
        
    ){

    }
}