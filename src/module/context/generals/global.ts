import AssetManager from "./asset";

export default class Global{
    debug: boolean;

    width: number;
    height: number;
    private static instance: Global = null;
    globalAssetManager: AssetManager;

    private constructor(){
        this.width = 0;
        this.height = 0;
        this.debug = false;
        this.globalAssetManager = new AssetManager();
    }

    public static getInstance(): Global{
        if(this.instance===null){
            this.instance = new Global();
        }
        return this.instance;
    }

}