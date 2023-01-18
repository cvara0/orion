export class Exercise{

    constructor(
        public id                : number,
        public muscleIdList      : number[],
        public name              : string="",
        public difficulty        : number,
        public laps              : number=0,
        public tips              : string="",
        public ready             : boolean,
        public imgUrl            : string="",
        public gender             : string=""
    ){

    }
}