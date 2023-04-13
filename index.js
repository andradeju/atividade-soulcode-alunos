const express = require("express");
const app = express();
const alunos = require("./alunos");

app.use(express.json());

app.get("/alunos/", (req, res) => {

    let resultadoAlunos = alunos;

    const { nome, media } = req.query;

    if(nome) {
        resultadoAlunos = resultadoAlunos.filtrarNome (nome);
    }
    if(media) {
        resultadoAlunos = resultadoAlunos.filtrarMedia (media);
    }

    res.json(resultadoAlunos);
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});