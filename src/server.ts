import "dotenv/config";
import { app } from "./app.ts";

const port = process.env.PORT!;

app.listen(port, () => {
  console.log(`Server Running on port ${port}...`);
});
