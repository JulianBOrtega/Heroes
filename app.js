const express = require("express");

const fs = require("fs");

const app = express();

app.listen(3030, () => console.log("Server running in 3030 port"));

const heroes = JSON.parse(
  fs.readFileSync(__dirname + "/data/heroes.json", "utf-8")
);

app.get("/", function (req, res) {
  res.send(
    "Ni Superman, Iron Man o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!"
  );
});

app.get("/heroes", (req, res) => {
  res.send(heroes);
});

app.get("/heroes/detalle/:id", (req, res) => {
  let idHeroe = req.params.id;
  let heroe = heroes.find((heroe) => heroe.id == idHeroe);

  if (heroe) {
    res.send(`Hola, mi nombre es ${heroe.nombre} y soy ${heroe.profesion}`);
  } else {
    res.end("Lo siento, no hemos encontrado el héroe que buscabas");
  }

});

app.get("/heroes/bio/:id/:ok?", (req, res) => {
  let idHeroe = req.params.id;
  let ok = req.params.ok;

  let heroe = heroes.find((heroe) => heroe.id == idHeroe);

  if (heroe) {
    if (ok == "ok") {
      res.send(`
			${heroe.nombre}
			--------------------------
			${heroe.resenia}
			`);
    } else {
      res.end(heroe.nombre + "dice: Lamento que no desees saber más de mí :(");
    }
  } else {
    res.end("No encontramos un héroe para mostrarte su biografia");
  }
});

app.get("*", (req, res) => {
  res.status(404).send("404 not found. <br> ¡Houston, poseemos problemas!");
});