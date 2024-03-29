import express from "express";
import bodyParser from "body-parser";
import { mintSimulator } from "./mint.js";
import cors from "cors"


const PORT = process.env.PORT || 3030;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors({
  origin: '*'
}));


app.post("/api", function(req, res) {
  const body = req.body;

  if (!body.name && !body.email && !body.prompt) {
    res
      .status(400)
      .json({ message: "Mandatory field: name, email, or body is missing. " })
  }

  mintSimulator(body.name, body.email, body.prompt)
    .then((response) => {
      res.send(
        `message: "successfull",`
      );
    })
    .catch((e) => {
      res
      .status(400)
      .json({ message: "Unknown error.", error: e })
    });
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
