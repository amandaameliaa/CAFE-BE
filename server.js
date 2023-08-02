const express = require(`express`);
const app = express();
const PORT = 8000;
const cors = require(`cors`);
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRoute = require(`./routes/user.route`)
app.use(`/user`, userRoute);

const menuRoute = require(`./routes/menu.route`);
app.use(`/menu`, menuRoute);

const mejaRoute = require(`./routes/meja.routes`);
app.use(`/meja`, mejaRoute);

const transaksiRoute = require(`./routes/transaksi.route`);
app.use(`/transaksi`, transaksiRoute);

// const detailRoute = require(`./routes/detail.route`);
// app.use(`/detail`, detailRoute);



// const auth = require(`./routes/auth.route`)
// app.use(`/auth`, auth)



app.use(express.static(__dirname));
// app.use(express.static("foto-kamar"));
// app.use(express.static("foto-user"));

app.listen(PORT, () => {
  console.log(`Server of ukl_cafe runs on port${PORT}`);
});