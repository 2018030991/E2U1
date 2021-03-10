const express = require("express");
const path = require("path");
const bodyPaser = require("body-parser");

const { alumnos } = require("./alumnos.json");


const app = express();

app.set("port", 8080);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyPaser.json());

app.use(bodyPaser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/alumnos", (req, res) => {
    let alumno = { nombre, matricula, sexo, materia_1, materia_2, materia_3 } = req.body;
    alumnos.push(alumno);
    res.sendStatus(201);
})

app.get("/alumnos", (req, res) => {
    const { matricula } = req.query;
    let searchList = [];
    if (matricula != "") {
        alumnos.forEach(alumno => {
            if (alumno.matricula.includes(matricula)){
                searchList.push(alumno)
            }
        })
        res.send(searchList);
    } else {
        res.send(alumnos)
    }

})

app.listen(app.get("port"), function () {
    console.log("Listening on port: " + app.get("port"));
})
