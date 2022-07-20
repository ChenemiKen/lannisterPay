exports.arrangeSplitInfo = async function (splitInfo){
    flatEntities = splitInfo.filter(entity =>{
        if(entity.SplitType == 'FLAT'){
            return entity
        }
    })

    percentageEntities = splitInfo.filter(entity =>{
        if(entity.SplitType == 'PERCENTAGE'){
            return entity
        }
    })

    ratioEntities = splitInfo.filter(entity =>{
        if(entity.SplitType == 'RATIO'){
            return entity
        }
    })

    return({flatEntities, percentageEntities, ratioEntities})
}