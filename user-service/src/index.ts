import server from "./presentation/server";
import dbConnection from "./infrastructure/database/dbConnection";

(async () => {
  try {
    server;
    await dbConnection();
    console.log("Database connection established successfully");
  } catch (error: any) {
    console.error("Error starting the application:", error);
    process.exit(1); // Exit the process with an error code
  }
})();
