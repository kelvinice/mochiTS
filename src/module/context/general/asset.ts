export default class AssetManager{
    ipaths: Object[];
    assetDoneListener: Function;
    images: HTMLImageElement[];
    doneCount: number;
    loadedImage: Object;

    constructor(){
        this.ipaths = [];
        this.assetDoneListener = null;
        this.images = [];
        this.doneCount = 0;
        this.loadedImage = {};
    }

    addPath(name: String,path: String){
        this.ipaths.push({
            "name":name,
            "path":path
        });
    }

    addAssetDoneListener(assetDoneListener: Function){
        this.assetDoneListener = assetDoneListener;
    }

    loadAsset(){
        let clonePaths = [...this.ipaths];
        clonePaths.forEach(c => {
            let name = c["name"];
            let path = c["path"];

            let img = new Image();
            img.src = "./assets/images/"+path;
            img.onload = () =>{
                this.loadedImage[name] = img;
                this.doneCount++;
                this.check();
            }
        });

    }

    check(){
        if(this.doneCount == this.ipaths.length){
            this.assetDoneListener();
        }
    }

    loadImage(path){
        let img = new Image();
        img.src = "./assets/images/"+path;
        return img;
    }

}

export function splitSprite(image: HTMLImageElement, horizontalCount: number, verticalCount: number){
    let spriteDatas = [];
    let spriteWidth = image.width/horizontalCount;
    let spriteHeight = image.height/verticalCount;
    for (let i = 0; i < verticalCount; i++) {
        for (let j = 0; j < horizontalCount; j++) {
            spriteDatas.push({"x":spriteWidth*j,"y":spriteHeight*i,"width":spriteWidth,"height":spriteHeight});
        }
    }
    return spriteDatas;
}