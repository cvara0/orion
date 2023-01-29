export class Exercise{

    constructor(
        
        public muscleGroup       : string,
        public name              : string,
        public difficulty        : string,
        public tipsUrl           : string,
        public imgUrl            : string,
        public gender            : string,
        public element           : string,
        public commonErrors      : string,
        public id?               : string
    ){

    }
}