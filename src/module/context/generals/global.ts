export default class Global{
    debug: boolean;

    width: number;
    height: number;
    menuWidth: number;
    private static instance: Global = null;

    private constructor(){
        this.width = 0;
        this.height = 0;
        this.menuWidth = 300;
        this.debug = false;
    }

    public static getInstance(): Global{
        if(this.instance===null){
            this.instance = new Global();
        }
        return this.instance;
    }

}