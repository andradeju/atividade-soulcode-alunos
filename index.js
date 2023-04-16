const express = require("express");
const app = express();
const alunos = require("./alunos");
const fs = require ("fs");

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

function atualizarAlunos() {
    const data = JSON.stringify({ alunos }, null, 2 );

    try {
        fs.writeFileSync("./db.json", data);
        console.log("Arquivo db.json atualizado com sucesso");
    } catch (error) {
        console.log("Erro ao atualizar o arquivo:", error);
    }
}

app.post("/alunos/novo", (req, res) => {
    const { nome, matricula, media } = req.body; 

    if(!nome || !matricula || !media) {
        res.status(400).json({ error: "Dados incompletos"})
    } else {
        alunos.alunos.push({ nome, matricula, media})
        atualizarAlunos();
        res.json({message: "Aluno adicionado com sucesso"});
    }
})

app.post("/alunos/deletar/:index", (req, res) => {
    const { index } = req.params;

    if(index < 0 || index >= alunos.alunos.length) {
        res.status(404).send({ error: "Aluno não encontrado"})
    } else {
        alunos.alunos.splice(index, 1)
        atualizarAlunos();
        res.json({ message: "Aluno removido com sucesso"})
    }
});

app.post("/alunos/atualizar/:index", (req, res) => {
    const { index } = req.params;
    const { nome, media } = req.body;

    if(index < 0 || index >= alunos.alunos.length) {
        res.status(404).send({ error: "Aluno não encontrado"})
    } else if (!nome || !media) {
        res.status(404).send({ error: "Dados incompletos"})
    } else {
        alunos.alunos[index].nome = nome;
        alunos.alunos[index].media = media;
        atualizarAlunos();
        res.json({ message: "Aluno atualizado com sucesso"})
    }
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});