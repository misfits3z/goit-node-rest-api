import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialectOptions: {
    ssl: process.env.DB_SSL === "true",
  },
});
  

try {
    await sequelize.authenticate();
    console.log("Database connection successful");
    
} catch (error) {
    console.log("Failed connect database")
    console.log(error.message)
    process.exit(1); 

    
}

export default sequelize;