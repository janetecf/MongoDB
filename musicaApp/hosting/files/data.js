const APP_ID = 'musicaapp-gmyrt';
const ATLAS_SERVICE = 'mongodb-atlas';
const app = new Realm.App({id: APP_ID});

// Function executed by the LOGIN button.
const login = async () => {
    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        $('#user').empty().append("User ID: " + user.id); // update the user div with the user ID
    } catch (err) {
        console.error("Failed to log in", err);
    }
};

// Function executed by the "FIND 20 MOVIES" button.
const busca_musica = async () => {
    let pegaMusicas;
    try {
        // Access the movies collection through MDB Realm & the readonly rule.
        const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
        pegaMusicas = mongodb.db("musicas").collection("musimundos");
    } catch (err) {
        $("#user").append("É preciso efetuar o login.");
        console.error("É preciso efetuar o login", err);
        return;
    }

    // Retrieve 20 movie titles (only the titles thanks to the projection).
    const musimundos_musicas = await pegaMusicas.find({}, {
        "projection": {
            "_id": 0,
            "musica": 1
        },
        "limit": 20
    });

    // Access the movies div and clear it.
    let musicas_div = $("#musicas");
    musicas_div.empty();

    // Loop through the 20 movie title and display them in the movies div.
    for (const musicas of musimundos_musicas) {
        let p = document.createElement("p");
        p.append(musimundos.musica);
        musicas_div.append(p);
    }
};