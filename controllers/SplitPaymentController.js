const validator = require('../handlers/validator')
const handlers = require('../handlers/handler')

exports.compute = async (req, res, next) => {
    validation = validator.validate(req.body, res)
    if(!validation.success){
        return res.status(validation.status).json(validation.Error)
    }

    balance = req.body.Amount
    splitBreakdown = []

    if(!balance > 0){
        return res.json({
            ID: req.body.ID,
            Balance: balance,
            SplitBreakdown: splitBreakdown
        })
    }

    splitInfo = await handlers.arrangeSplitInfo(req.body.SplitInfo)

    splitInfo.flatEntities.forEach(element => {
        if(balance >= element.SplitValue){
            balance -= element.SplitValue
            splitBreakdown.push({
                SplitEntityId:element.SplitEntityId,
                Amount:element.SplitValue
            })
        }else{
            amount = balance
            balance = 0
            splitBreakdown.push({
                SplitEntityId:element.SplitEntityId,
                Amount:amount
            })
        }
    });

    splitInfo.percentageEntities.forEach(element=>{
        amount = (element.SplitValue/100)*balance
        balance -= amount
        splitBreakdown.push({
            SplitEntityId:element.SplitEntityId,
            Amount:amount
        })
    })

    opening_ratio_bal = balance
    total_ratio = splitInfo.ratioEntities.reduce((accumulator,element)=> accumulator+element.SplitValue, 0)
    splitInfo.ratioEntities.forEach(element=>{
        amount = (element.SplitValue/total_ratio)*opening_ratio_bal
        balance -= amount
        splitBreakdown.push({
            SplitEntityId:element.SplitEntityId,
            Amount:amount
        })
    })


    return res.json({
        ID: req.body.ID,
        Balance: balance,
        SplitBreakdown: splitBreakdown
    })
}