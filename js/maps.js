
function addMapObject(obj, map, worldLayer) {
    //check what kind of object it is!
    switch(obj.name) {
        //zones where you can spawn
        case "spawnzone":
                
                //console.log(`searching at ${obj.x}, ${obj.y} for ${obj.width}, ${obj.height}`)
                        
                //get the top left tile
                var startingTile = map.getTileAtWorldXY(obj.x, obj.y, worldLayer);

                if(startingTile != null){

                                
                                //find all the tiles within the area. uses the top left tile, and the size of the zone divided by the tile size
                                //we put these in the spawnpoints array, which is used for spawning players
                                spawnpoints.push(map.getTilesWithin(startingTile.x, startingTile.y, obj.width / 64, obj.height / 64, true, worldLayer)); 
                                
                                break;
                }

        case "transportalizer":
        
                break;
        default:
        console.log(`the object "${obj.name}" was not found`);          
    }
}