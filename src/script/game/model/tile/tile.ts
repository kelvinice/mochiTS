export default class Tile{
    char: String;
    poin: number;

    constructor(char: String){
        this.setChar(char);
    }

    setChar(char: String){
        this.char = char;
        if(char=="#" || char== "S")this.poin = 1;
        else this.poin = 0;
    }

    getChar() : String{
        return this.char;
    }

    toString() : String{
        return this.getChar();
    }
    valueOf() : String{
        return this.getChar();
    }

}