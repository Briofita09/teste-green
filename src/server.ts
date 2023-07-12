import { app } from "./index";
import "dotenv/config";

app.listen(process.env.PORT, () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
