const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres",              // DB name (usually postgres)
  "postgres",              // user
  "Janani@1107#22",      // Supabase password
  {
    host: "db.sxvrxxxjbnkjmwrmwjso.supabase.co",  // from Supabase
    dialect: "postgres",
    port: 5432,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;
