// interface IDictionary{
//     [key: string]
// }

export default class AssetManager{
    ipaths: any;
    assetDone: Function;
    images: any;
    doneCount: number;
    loadedImage: any;

    constructor(){
        this.ipaths = [];
        this.assetDone = null;
        this.images = [];
        this.doneCount =0;
        this.loadedImage = {};
    }

    addPath(name: string,path: string){
        this.ipaths.push({
            "name":name,
            "path":path
        });
    }

    addAssetDoneListener(assetDone: Function){
        this.assetDone = assetDone;
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
            this.assetDone();
        }
    }

    loadImage(path: string){
        let img = new Image();
        img.src = "./assets/images/"+path;
        return img;
    }

}

function splitSprite(image : any, horizontalCount: number, verticalCount: number){
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