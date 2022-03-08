const APP_ID = 'musicasapp-ptqyz';
const ATLAS_SERVICE = 'mongodb-atlas';
const app = new Realm.App({id: APP_ID});

// Função para o botão login.
const login = async () => {
    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        $('#user').empty().append("User ID: " + user.id); // atualiza o id do usuário anônimo
    } catch (err) {
        console.error("Failed to log in", err);
    }
};

// Função para o botão Listar Musicas
const busca_musica = async () => {
    let pegaMusicas;
    try {
        // Acesso à coleção Musimundos com permissão Read
        const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
        pegaMusicas = mongodb.db("musicas").collection("musimundos");
    } catch (err) {
        $("#user").append("É preciso efetuar o login.");
        console.error("É preciso efetuar o login", err);
        return;
    }

    // Lista 20 músicas. Somente o campo que está na projeção
    const musimundos_musicas = await pegaMusicas.find({}, {
        "projection": {
            "_id": 0,
            "musica": 1
        },
        "limit": 20
    });

    // Acessa a div Musicas e limpa o conteúdo.
    let musicas_div = $("#musicas");
    musicas_div.empty();

    // Percorre o título de 20 musicas e exibe-os na div musicas.
    for (const musicas of musimundos_musicas) {
        let p = document.createElement("p");
        p.append(musimundos.musica);
        musicas_div.append(p);
    }
};