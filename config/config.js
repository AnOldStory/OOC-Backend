module.exports = {
  DATABASE: {
    host: "220.94.42.246",
    port: "5432",
    user: "skydb",
    password: "dbsky",
    database: "cinema",
    dialect: "postgres",
    timezone: "+09:00",
  },
  "DATABASE_URL": process.env.DATABASE_URL ||"write down",
  "SESSION_SECRET":"amollang",
  "API_PORT": 7001,
};
