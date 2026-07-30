import "dotenv/config";
import dns from "dns";

import app from "./src/app.js";
import connectToDb from "./src/config/db.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
    await connectToDb();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
} catch (error) {
    console.error("❌ Failed to start the server");
    console.error(error);
    process.exit(1);
}
};

startServer();