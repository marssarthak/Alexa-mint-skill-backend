import express from "express";
import bodyParser from "body-parser";
import { mintSimulator } from "./mint.js";


const PORT = process.env.PORT || 3030;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/api", function(req, res) {
  const body = req.body;

  console.log(body)

  if (!body.name && !body.email && !body.prompt) {
    console.log("damn");
    throw new Error("name, email or prompt missing");
  }

  mintSimulator(body.name, body.email, body.prompt)
    .then((response) => {
      res.send(
        `message: "successfull",`
      );
    })
    .catch(() => {
      throw new Error("name, email or prompt missing");
    });
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
