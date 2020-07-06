import {IRectangle} from "../../module/context/core/gameObjects/gameObject";

export function splitSprite(image : ImageBitmap, horizontalCount: number, verticalCount: number){
    let spriteDatas = [];
    let spriteWidth = image.width/horizontalCount;
    let spriteHeight = image.height/verticalCount;
    for (let i = 0; i < verticalCount; i++) {
        for (let j = 0; j < horizontalCount; j++) {
            spriteDatas.push(<IRectangle>
                {
                    x:spriteWidth*j,
                    y:spriteHeight*i,
                    width:spriteWidth,
                    height:spriteHeight
                }
                );
        }
    }
    return spriteDatas;
}

export default class ImageHandler {
    
}