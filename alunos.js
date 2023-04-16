const alunos = [
    {
        nome:"Adele",
        matricula: 1,
        media: 8.0
    },
    {
        nome:"Beyonce",
        matricula: 2,
        media: 10.0
    },
    {
        nome:"Lady Gaga",
        matricula: 3,
        media: 9.0
    },
    {
        nome:"Madonna",
        matricula: 4,
        media: 7.0
    },
    {
        nome:"Rihanna",
        matricula: 5,
        media: 8.0
    }
];

function filtrarNome(nome){
    return alunos.filter((el) => 
    el.nome.toLowerCase().includes(nome.toLowerCase()));
}

function filtrarMedia(media) {
    return alunos.filter((el) => 
    el.media.toFixed(2).includes(media));
}

module.exports = {
    alunos,
    filtrarNome,
    filtrarMedia
}