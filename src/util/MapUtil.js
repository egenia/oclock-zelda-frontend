import React from 'react';


export default class MapUtil {

    static toHtml = (map, displayDiamond=true) => {
        const width = map.tiles[0].length;
        const height = map.tiles.length;

        let lines = [];
        for (let h = 0; h < height; h++) {
            let line = [];

            for (let w = 0; w < width; w++) {

                let tileClassName = "";

                if (map.tiles[h].charAt(w) === '+') tileClassName = "bg-success";
                else if (map.tiles[h].charAt(w) === '$' && displayDiamond) tileClassName = "bg-warning";
                else if (map.tiles[h].charAt(w) === 'x') tileClassName = "bg-danger";

                line.push(<div key={"tile-" + w + "-" + h} className={"d-inline-block align-top w-20px h-20px " + tileClassName}></div>);
            }

            // {fontSize: 0} to remove an annoying 1px margin
            lines.push(<div key={"line-" + h} className="" style={{ fontSize: 0 }}>{line}</div>);
        }

        return lines;
    }

    static bounds = (map, tileWidth = 20, tileHeight = 20) => {
        return {
            x: 0,
            y: 0,
            w: map.tiles[0].length * tileWidth,
            h: map.tiles.length * tileHeight
        };
    };

    static toGeometry = (map, symbol, tileWidth = 20, tileHeight = 20) => {
        const width = map.tiles[0].length;
        const height = map.tiles.length;

        let objects = [];
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                if (map.tiles[h].charAt(w) === symbol) objects.push({ x: w * tileWidth, y: h * tileHeight, w: tileWidth, h: tileHeight });
            }
        }

        return objects;
    }

}