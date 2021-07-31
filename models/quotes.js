

module.exports = (sequelize, DataTypes) => {
    const Quote = sequelize.define('quote', {
        address: {
            type: DataTypes.STRING
        },
        serviceDescription: {
            type: DataTypes.STRING
        },
        estimator: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        squareFootage: {
            type: DataTypes.STRING
        },
        quoteStatus:{
            type:DataTypes.STRING
        },
        notes: {
            type: DataTypes.STRING
        }
        
    })
 
    return Quote;
}