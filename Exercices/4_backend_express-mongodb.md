# Créer une TODO app avec Express JS, React JS et MongoDB Atlas

Cette fois-ci on utilisera le type module avec `import` à la place de `require`.

Rendez-vous dans le fichier `server/app.js`

Modifier les ligne de `server/package.json` et ajouter le type `module`

```json
"type": "module",
"scripts": {
  "start": "node app",
  "dev": "nodemon app"
}
```

Installer les modules `express`, `mongodb` et `dotenv`

```bash
npm install express mongodb dotenv
```

## 1. Importation des modules nécessaires

```javascript
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
```

- **`express`** : Importe le module Express, qui est un framework pour créer des serveurs web en Node.js.
- **`MongoClient`** : Importe `MongoClient` de la bibliothèque `mongodb`, qui permet de se connecter à la base de données MongoDB et d'exécuter des requêtes.

## 2. Configuration de la connexion à MongoDB

```javascript
const url =
  "mongodb+srv://<username>:<password>@clusterurl/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(url);
```

- **URL de connexion** : Remplacez `<username>`, `<password>`, et `<dbname>` avec vos propres valeurs. Cette URL est la chaîne de connexion à votre cluster MongoDB Atlas. Elle inclut des paramètres comme `retryWrites` et `w` pour la gestion des écritures.

:::info
☝🏼 Le lien est disponible sur MongoDB Atlas
Vous trouverais un code d'exemple dans la section "Connexion à MongoDB Atlas"
:::

## 3. Initialisation de l'application Express

```javascript
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json()); // Middleware pour parser le JSON
// Servir les fichiers statiques de l'application React build
app.use(express.static("dist"));
```

- **Initialisation d'Express** : Crée une nouvelle application Express.
- **Middleware JSON** : `express.json()` est un middleware intégré qui analyse les corps des requêtes entrantes en JSON. Cela est nécessaire pour pouvoir traiter correctement les données JSON envoyées par les clients.
- **Server statique** : Configure l'application pour servir les fichiers statiques de l'application React build.

## 4. Démarrage du serveur

```javascript
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}\nvia http://localhost:8080`);
  connectToMongo();
});
```

- **Écoute sur le port 8080** : Configure l'application pour écouter les requêtes entrantes sur le port 8080.
- **Connexion à MongoDB** : Appelle la fonction `connectToMongo()` pour établir la connexion à la base de données dès que le serveur démarre.


## 5. Connexion à MongoDB

```javascript
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
  } catch (err) {
    console.error(err);
  }
}
```

- **Fonction asynchrone** : Définit une fonction asynchrone pour se connecter à MongoDB.
- **Gestion des erreurs** : Utilise un bloc `try...catch` pour gérer les erreurs qui pourraient survenir lors de la tentative de connexion.

## 6. Route pour récupérer toutes les tâches

```javascript
app.get("/api/tasks", async (req, res) => {
  try {
    const collection = client.db("test").collection("tasks");
    const tasks = await collection.find({}).toArray();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

- **Route `/tasks`** : Définit une route GET sur `/tasks`. Quand un client envoie une requête GET à cette URL, le serveur exécutera le code dans cette fonction.

- **Accès à la collection** : Accède à la collection `tasks` de la base de données `todo`.
- **Requête MongoDB** : Utilise `find({})` pour récupérer tous les documents dans la collection. `toArray()` convertit le résultat en un tableau de documents.
- **Réponse JSON** : Envoie les tâches récupérées au client sous forme de JSON.
- **Gestion des erreurs** : En cas d'erreur dans le traitement de la requête, envoie une réponse avec le code de statut HTTP 500 et un message d'erreur.

---

Ce code crée une application serveur simple avec Express, connectée à MongoDB Atlas, qui permet de récupérer une liste de tâches stockées dans une collection. Cette base peut être étendue par les apprenants pour inclure des fonctionnalités CRUD complètes (créer, lire, mettre à jour, supprimer).
