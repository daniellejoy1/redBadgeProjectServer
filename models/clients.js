module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('client', {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        businessName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        primaryPhoneNumber: {
            type: DataTypes.STRING
        },
        secondaryPhoneNumber:{
            type:DataTypes.STRING
        },
        billingAddress: {
            type: DataTypes.STRING
        }
    })
    return Client;
}