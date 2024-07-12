import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());

const url =
  "mongodb+srv://billyouadah:nmOYLjW8a0hAqtpt@cluster0.bwoipd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}\nvia http://localhost:8080`);
  connectToMongo();
});

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
  } catch (err) {
    console.error(err);
  }
}
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

app.get("/api/tasks", async (req, res) => {
  try {
    const collection = client.db("test").collection("tasks");
    const tasks = await collection.find({}).toArray();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})