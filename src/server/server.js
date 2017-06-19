var Sequelize = require('sequelize');
var sequelize = new Sequelize('main', null, null, {
    dialect: 'sqlite',
    storage: 'sqlite3.db'
});

sequelize.authenticate();
sequelize.sync({
    logging: console.log
//  force: true
});
