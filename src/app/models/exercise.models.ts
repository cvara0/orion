export class Exercise{

    constructor(
        public id                : number,
        public muscleGroupIdList : number[],
        public name              : string="",
        public difficulty        : number,
        public tipsUrl           : string="",
        public imgUrl            : string="",
        public gender            : string=""
    ){

    }
}