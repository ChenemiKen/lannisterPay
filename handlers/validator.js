exports.validate = (payload, res)=>{
    //check that a transaction ID is specified
    if(!payload.ID){
        return {status:419, Error:"Transaction ID not specified"}
    }
    if(payload.Amount == undefined){
        return {status:419, Error:"Transaction Amount not specified"}
    }
    if(payload.Amount < 0){
        return {status:419, Error:"Transaction Amount is less than 0"}
    }
    // check that the splitInfo is specified
    if(!payload.SplitInfo){
        return {status:419, Error:"Invalid payload. SplitInfo not specified"}
    }    
    // check that the splitInfo contains >=1<=20 entries
    if(payload.SplitInfo.length < 1 || payload.SplitInfo.length >20){
        return {status:419, Error:"Invalid payload. SplitInfo must have 1 to 20 entities"}
    }
    
    return {success:true}
}