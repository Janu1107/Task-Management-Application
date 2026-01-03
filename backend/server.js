const app = require("./app");
const sequelize = require("./models");

const PORT = 5000;

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("Database synced");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("DB sync failed:", error);
  }
});
