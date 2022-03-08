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

// Function executed by the "Listar 20 Musicas" button.
const find_musica = async () => {
    let collmusicas;
    try {
        // Access the musicas collection through MDB Realm & the readonly rule.
        const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
        collmusicas = mongodb.db("musicas").collection("musimundos");
    } catch (err) {
        $("#user").append("Need to login first.");
        console.error("Need to log in first", err);
        return;
    }

    // Retrieve 20 musicas titles (only the titles thanks to the projection).
    const musicas_titles = await collMusicas.find({}, {
        "projection": {
            "_id": 0,
            "musica": 1
        },
        "limit": 20
    });

    // Access the musica div and clear it.
    let musicas_div = $("#musicas");
    musicas_div.empty();

    // Loop through the 20 musica title and display them in the musicas div.
    for (const musica of musicas_titles) {
        let p = document.createElement("p");
        p.append(musica.title);
        musicas_div.append(p);
    }
};