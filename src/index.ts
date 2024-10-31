import { createApp } from "./app";

async function startServer() {
  const app = await createApp();
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
}

startServer().catch((err) => console.log("Error starting the server: ", err));
