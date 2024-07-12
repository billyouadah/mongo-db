# Tutorial : Créer une TODO app avec Express JS, React JS et MongoDB Atlas

## Installer React JS avec Express JS comme back-end

Ce tutoriel va vous permettre de créer une TODO app avec Express JS, React JS et MongoDB Atlas en évitant les problèmes de cors

- Express sur le port 8080
- React sur le port 5173

```bash
npx create-vite todo-app --template react
```

A noter que `npm run build` crée un dossier `dist/` qui contient le code transpilé et les fichiers statiques qui sont dans le dossier `public/`.

### Etape 1 - Express

Créer un dossier `server/` qui contiendra le code de l'API (back-end ExpressJS) et se placer dans le dossier.

```bash
mkdir server
cd server
touch package.json
```

Créer dans le dossier `server/` le fichier package.json avec les lignes `{}`

Puis installer les modules suivants

```bash
npm i express
```

Créer les fichers `server/app.js` et `server/.env`  et insérer les lignes code suivant :

```js
// server/app.js
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}\nvia http://localhost:8080`);
});
```

```bash
# server/.env
PORT=8080
```

Tester le server avec la commande

```bash
node app
```

Installer `nodemon`
npm i nodemon -g
``

Tester le server avec `nodemon`

```bash
nodemon app.js
```

Dans `server/app.js` ajouter les lignes suivantes et tester le resultat sur le navigateur:

```js
// Database

const todos = [
  {
    id: 1,
    title: "Buy milk",
    completed: false,
  },
  {
    id: 2,
    title: "Buy eggs",
    completed: false,
  },
  {
    id: 3,
    title: "Buy bread",
    completed: false,
  },
];

app.get("/api/tasks", (req, res) => {
  // Express converts the todos array to JSON and sends it back to the client
  res.send(todos);
});
```

Le serveur devrait retourner les tâches du tableau `todos`.

### Etape 2 - React

Maintenant on va tenter de `fetch` les données dans React:

```js
import { useState, useEffect } from "react";
function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
        })

  }, []);

  function renderTasks() {
    return tasks.map((task) => {
      return <li key={task.id}>{task.title}</li>;
    });
  }

  return (
    <main>
      <h1>Hello</h1>
      {renderTasks()}
    </main>
  );
}

export default App;
```

Lancer le server de react `npm run dev`

> ⚠️ A ce stade React ecoute le port 5173 mais le server envoie les données sur le port 8080 et cela produira une erreur...

Lancer la commande react `npm run build`

Deplacer le dossier `dist` ( ou `build`) généré par react vers le dossier de server Express `server/dist/`

### Etape 3 - Express

Insérer les lignes suivantes dans le fichier `server/app.js` pour servir le dossier `dist` via le serveur ExpressJS `server/`

```js
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}\nvia http://localhost:8080`);
});

// Servir les fichiers statiques de l'application React build
app.use(express.static("dist"));

const todos = [
  {
    id: 1,
    title: "Buy milk",
    completed: false,
  },
  {
    id: 2,
    title: "Buy eggs",
    completed: false,
  },
  {
    id: 3,
    title: "Buy bread",
    completed: false,
  },
];

app.get("/api/tasks", (req, res) => {
  res.send(todos);
});
```

Express servira le dossier `dist` de react et alors la fonction `fetch` retournera les donnees de l'API car les fichiers s'executeront sur le meme serveur avec le port `8080`

Dans le dossier `server/` lancer la commande `node app` et tester `http://localhost:8080/api/tasks`

Maintenant vous devriez voir les tâches du tableau `todos` sur le navigateur.

Ajouter les lignes suivantes dans `server/package.js`

```js
"scripts": {
    "start": "node app",
    "dev": "nodemon app",
  },
```

On pourra alors lancer le serveur avec:

- `npm run dev` pour lancer le serveur en mode developpement
- `npm run start` pour lancer le serveur en mode production

### Etape 4 - Configuration de Vite

Pour la version de développement, on va ajouter le code suivant dans `vite.config.js` de react :

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Chemin où les fichiers de production seront générés
    outDir: resolve(__dirname, "./server/dist"),
  },
  server: {
    proxy: {
      // toutes les requêtes commençant par '/api' seront transférées à 'http://localhost:8080'
      "/api": "http://localhost:8080",
    },
  },
});
```

Cela redirigera les requêtes de la route `/api` de React vers le serveur Express sur le port `8080`

## Conclusion

Voila !!! avec cette configuration vous obtiendrez une seule application fullstack.

Pour le développement vous pouvez lancer react avec la commande `npm run dev` et le serveur Express dans `server/` avec la commande `npm run dev`

En production, on utilisera la commande `npm run build` et le serveur Express dans `server/` avec la commande `npm run start`
