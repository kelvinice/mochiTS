export default class Global{
    debug: boolean;

    width: number;
    height: number;
    private static instance: Global = null;

    private constructor(){
        this.width = 0;
        this.height = 0;
        this.debug = true;
    }

    public static getInstance(): Global{
        if(this.instance===null){
            this.instance = new Global();
        }
        return this.instance;
    }

}