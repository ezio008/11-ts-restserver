import { Sequelize } from "sequelize";

const db = new Sequelize('users', 'root', 'YrltVo9LI^&$', {
    host: 'localhost',
    dialect: "mysql",
    // logging: false
});

export default db;