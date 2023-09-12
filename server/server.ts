import app from "./app";
import api from "./api";

const port: number = 5000;

app.use(api);

app.listen(port, (): void => {
  console.log(`Application listens on PORT: ${port}`);
});
