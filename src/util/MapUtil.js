import React from 'react';


export default class MapUtil {

    static getSprite = (map, hIndex, wIndex, displayDiamond, type) => {

        let spriteName = type === "+" ? "bush" : "mud";

        let tileClassName;

        // First ever square
        if (hIndex === 0 && wIndex === 0) tileClassName = spriteName + "-top-left";
        else if (hIndex === 0 && (wIndex === map.tiles[0].length - 1)) tileClassName = spriteName + "-top-right";
        else if ((hIndex === map.tiles.length - 1) && wIndex === 0) tileClassName = spriteName + "-bottom-left";
        else if ((hIndex === map.tiles.length - 1) && (wIndex === map.tiles[0].length - 1)) tileClassName = spriteName + "-bottom-right";

        //First line
        else if (hIndex === 0) {
            if (map.tiles[hIndex].charAt(wIndex - 1) === type) {
                tileClassName = spriteName + "-top"
            } else if (map.tiles[hIndex + 1].charAt(wIndex) !== type) {
                tileClassName = spriteName + "-bottom"
            }
        } else if (hIndex === map.tiles.length - 1) {
            if ((map.tiles[hIndex - 1].charAt(wIndex) === type) && (map.tiles[hIndex].charAt(wIndex + 1) !== type)) {
                tileClassName = spriteName + "-bottom-right"
            } else if ((map.tiles[hIndex - 1].charAt(wIndex) === type) && (map.tiles[hIndex].charAt(wIndex - 1) !== type)) {
                tileClassName = spriteName + "-bottom-left"
            } else tileClassName = spriteName + "-bottom";
        }


        else if (hIndex > 0 && (hIndex < map.tiles.length - 1)) {
            //Next lines but the last

            if (map.tiles[hIndex + 1] && (map.tiles[hIndex + 1].charAt(wIndex) !== type)) {

                if ((map.tiles[hIndex + 1].charAt(wIndex) !== type && map.tiles[hIndex].charAt(wIndex - 1) !== type)) {
                    tileClassName = spriteName + "-bottom-left"
                } else if ((map.tiles[hIndex + 1].charAt(wIndex) !== type && map.tiles[hIndex].charAt(wIndex + 1) !== type)) {
                    tileClassName = spriteName + "-bottom-right"
                } else tileClassName = spriteName + "-bottom";

            } else if (map.tiles[hIndex + 1] && map.tiles[hIndex + 1].charAt(wIndex) === type) {

                if (map.tiles[hIndex].charAt(wIndex + 1) !== type) {
                    if (map.tiles[hIndex - 1].charAt(wIndex) !== type) {
                        tileClassName = spriteName + "-top-right";
                    }
                    else tileClassName = spriteName + "-middle-right";
                } else if (map.tiles[hIndex].charAt(wIndex - 1) !== type) {
                    if (map.tiles[hIndex - 1].charAt(wIndex) !== type) {
                        tileClassName = spriteName + "-top-left";
                    }
                    else tileClassName = spriteName + "-middle-left";
                } else if (map.tiles[hIndex - 1].charAt(wIndex) !== type) {
                    tileClassName = spriteName + "-top";
                }

                else tileClassName = spriteName + "-middle";
            }
        }


        else tileClassName = spriteName + "-middle"


        return tileClassName;
    }


    // Method to create the map into the HTML format to render
    static toHtml = (map, displayDiamond = true) => {
        const width = map.tiles[0].length;
        const height = map.tiles.length;

        let lines = [];
        for (let h = 0; h < height; h++) {
            let line = [];

            for (let w = 0; w < width; w++) {
                let tileClassName;

                if (map.tiles[h].charAt(w) === '+') {

                    tileClassName = this.getSprite(map, h, w, displayDiamond, '+');

                }
                else if (map.tiles[h].charAt(w) === '$' && displayDiamond) tileClassName = "diamond";
                else if (map.tiles[h].charAt(w) === 'x') tileClassName = this.getSprite(map, h, w, displayDiamond, 'x');;
                // console.log('tileClassName', tileClassName)

                // After picking which kind of tile it is, we create a div to get a visual output based on some CSS
                line.push(<div key={"tile-" + w + "-" + h} className={"d-inline-block align-top w-20px h-20px " + tileClassName}></div>);
            }

            // {fontSize: 0} to remove an annoying 1px margin
            lines.push(<div key={"line-" + h} className="" style={{ fontSize: 0 }}>{line}</div>);
        }

        return lines;
    }

    static bounds = (map, tileWidth = 16, tileHeight = 16) => {
        return {
            x: 0,
            y: 0,
            w: map.tiles[0].length * tileWidth,
            h: map.tiles.length * tileHeight
        };
    };

    static toGeometry = (map, symbol, tileWidth = 16, tileHeight = 16) => {
        const width = map.tiles[0].length;
        const height = map.tiles.length;

        let objects = [];
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                // Getting the spatial position of the specified type, to be able to make an interaction between the player and the map
                if (map.tiles[h].charAt(w) === symbol) objects.push({ x: w * tileWidth, y: h * tileHeight, w: tileWidth, h: tileHeight });
            }
        }

        return objects;
    }

}