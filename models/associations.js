const { Client, Quote } = require(".");

Quote.hasone(Client, {
    allowNull: false 
});
Client.belongsto(Quote);