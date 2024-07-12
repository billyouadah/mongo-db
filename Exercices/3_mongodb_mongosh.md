# MongoDB - base de données NoSQL

###### `MongoDB` `MongoSh` `NoSQL`

## Introduction

Je vais vous expliquer les différences entre MySQL et MongoDB, ainsi que les concepts clés pour comprendre MongoDB et Atlas. Cela vous aidera à mieux appréhender l'environnement et à faire la transition pour votre projet.

### Différences entre MySQL et MongoDB

1. **Type de base de données** :
   - **MySQL** : Base de données relationnelle (RDBMS), utilisant des tables, des lignes et des colonnes. Les données sont structurées et les relations entre les tables sont définies par des clés étrangères.
   - **MongoDB** : Base de données NoSQL, utilisant des ==documents== au format BSON (Binary JSON). Les données sont semi-structurées et peuvent varier d'un document à l'autre dans la même collection.
2. **Schéma** :
   - **MySQL** : Schéma strict, chaque table doit avoir une structure définie avec des colonnes spécifiques.
   - **MongoDB** : Schéma flexible, chaque ==document== dans une collection peut avoir un schéma différent.
3. **Requêtes** :
   - **MySQL** : Utilise le langage SQL pour les requêtes.
   - **MongoDB** : Utilise des requêtes de style JSON.
4. **Scalabilité** :
   - **MySQL** : Scalabilité verticale, ajout de ressources (CPU, RAM) à un seul serveur.
   - **MongoDB** : Scalabilité horizontale, ajout de plusieurs serveurs pour répartir la charge (sharding).

### Concepts Clés : MongoDB, Atlas et Mongoose

1. **MongoDB** : Base de données NoSQL orientée documents. Les documents sont des objets JSON stockés dans des collections. MongoDB est conçu pour être flexible, évolutif et performant.
2. **MongoDB Atlas** : Service de base de données dans le cloud géré par MongoDB. Atlas facilite la gestion des bases de données MongoDB en offrant des fonctionnalités comme l'automatisation, la sécurité, les sauvegardes et la surveillance.
3. **Mongoose** : Bibliothèque ODM (Object Data Modeling) pour Node.js et MongoDB. Mongoose fournit une structure pour vos données, des modèles et des fonctionnalités de validation.

### Utilisation pour votre projet

- **MongoDB** : Stockera vos données.
- **MongoDB Atlas** : Hébergera votre base de données MongoDB dans le cloud.

### Concepts de MongoDB Atlas

1. **Cluster** : Ensemble de serveurs MongoDB qui travaillent ensemble pour stocker vos données et fournir une redondance. Un cluster peut contenir plusieurs bases de données.
2. **Database (Base de données)** : Contient plusieurs collections et stocke vos données. Chaque projet peut avoir une ou plusieurs bases de données.
3. **Collection** : Equivalent d'une table dans MySQL. Une collection stocke plusieurs documents.
4. **Document** : Equivalent d'une ligne dans MySQL, mais plus flexible. Un document est un objet JSON qui peut contenir des champs et des valeurs de différents types.

### Stockage des Données

- **MySQL** : - **Table** : Ensemble structuré de lignes (enregistrements) et de colonnes (champs). - **Row (Ligne)** : Un enregistrement dans une table. - **Column (Colonne)** : Champ dans une table.
- **MongoDB** : - **Collection** : Ensemble de documents. - **Document** : Objet JSON contenant les données. - Les documents dans une collection peuvent avoir des champs différents, ce qui offre plus de flexibilité.

### Exemple de Conversion

#### MySQL Table `users`

| id  | username | password | email            |
| --- | -------- | -------- | ---------------- |
| 1   | john     | 123456   | john@example.com |

#### MongoDB Document in Collection `users`

```json
{
  "_id": ObjectId("60d5f99a1c9d440000a2e1c3"),
  "username": "john",
  "password": "123456",
  "email": "john@example.com"
}
```

En résumé, vous utiliserez MongoDB pour stocker vos données, MongoDB Atlas pour héberger votre base de données dans le cloud (et éventuellement Mongoose pour faciliter les interactions avec MongoDB depuis votre application Node.js).

Les clusters dans Atlas permettent de gérer la redondance et la scalabilité, les bases de données contiennent les collections, et les collections contiennent les documents, offrant une grande flexibilité par rapport aux tables relationnelles de MySQL.

## Tester MongoDB avec Mongosh

### Installation de mongosh pour Windows

1. **Télécharger mongosh** :

   - Accédez à la [page de téléchargement de MongoDB Shell (mongosh)](https://www.mongodb.com/try/download/shell) .
   - Sélectionnez la version pour Windows et téléchargez l'installateur.

2. **Installation** :

   Exécutez le fichier téléchargé et suivez les instructions d'installation.

### Créer la base de données MongoDB Atlas

Voir le [tutoriel 2_mongodb_atlas.md](2_mongodb_atlas.md)

### Connexion à une base de données MongoDB Atlas

Pour vous connecter à une base de données MongoDB Atlas, suivez ces étapes :

1. **Obtenez l'URI de connexion** :

   - Connectez-vous à votre compte MongoDB Atlas.
   - Sélectionnez le cluster auquel vous voulez vous connecter.
   - Cliquez sur "Connect", puis sur "Connect using MongoDB Shell".
   - Copiez l'URL de connexion "mongo Shell"

2. **Se connecter via mongosh** :

   - Ouvrez une ligne de commande (cmd ou PowerShell).
   - Exécutez la commande en prenanant soint de remplacer `<username>` 

      Cela devrait ressembler à:

      ```shell
      mongosh "mongodb+srv://cluster0.<id>.mongodb.net/" --apiVersion 1 --username <username>
      ```

      Vous serez alors invité à entrer votre mot de passe

## Commandes MongoDB utiles

Testons quelques commandes utiles

### Commandes pour afficher les bases de données et les collections

**Afficher toutes les bases de données** :

```mongosh
show dbs
```

Cette commande liste toutes les bases de données disponibles dans votre instance MongoDB.

**Afficher les collections dans une base de données** :

Après avoir sélectionné une base de données avec `use <nom_de_la_base>`, vous pouvez afficher les collections qu'elle contient avec :

```mongosh
show collections
```

### Insertion de documents

```javascript
// Insertion d'un seul document
db.users.insertOne({
  firstName: "Toto",
});

// Insertion de plusieurs documents
db.users.insertMany([
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "password456",
    role: "admin",
  },
  {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    password: "password789",
    role: "user",
  },
  {
    firstName: "Alix",
    lastName: "Johnson",
    email: "alix.johnson@example.com",
    password: "password012",
    role: "user",
  },
]);
```

### Lecture de documents

```javascript
// Lecture de tous les documents
db.users.find().pretty();

// Lecture d'un seul document
db.users.findOne({ email: "john.doe@example.com" });

// Lecture avec une condition
db.users.find({ role: "user" }).pretty();
```

#### Mise à jour de documents

```javascript
// Mise à jour d'un seul document
db.users.updateOne(
  { email: "john.doe@example.com" },
  { $set: { password: "newpassword123" } }
);

// Mise à jour de plusieurs documents
db.users.updateMany({ role: "user" }, { $set: { role: "member" } });
```

### Suppression de documents

```javascript
// Suppression d'un seul document
db.users.deleteOne({ email: "john.doe@example.com" });

// Suppression de plusieurs documents
db.users.deleteMany({ role: "member" });
```

### Commandes pour supprimer des collections

**Supprimer une collection spécifique** :

```javascript
db.users.drop();
```

Remplacez `<nom_de_la_collection>` par le nom de la collection que vous souhaitez supprimer. Cette opération est irréversible.

**Supprimer plusieurs collections** : Si vous souhaitez supprimer plusieurs collections, vous devrez exécuter la commande `drop()` pour chaque collection individuellement, car MongoDB ne fournit pas de commande native pour supprimer plusieurs collections en une seule opération.

### Commandes de lecture et filtrage des données

Pour filtrer et interagir avec les données, voici quelques commandes utiles :

**Trouver des documents avec des conditions spécifiques** :

```javascript
db.<collection>.find({<champ>: <valeur>})
```

Par exemple, pour trouver tous les documents où le champ `age` est supérieur à 25 :

```javascript
db.users.find({ age: { $gt: 25 } });
```

**Lire et filtrer avec plusieurs conditions** :
Pour combiner des conditions, vous pouvez utiliser des opérateurs comme `$and`, `$or` :

```javascript
db.users.find({ $or: [{ age: { $gt: 25 } }, { status: "active" }] });
```

**Projection des résultats** :
Pour limiter les champs retournés par votre requête :

```javascript
db.users.find({}, { name: 1, email: 1 });
```

Ici, `{name: 1, email: 1}` spécifie que seuls les champs `name` et `email` doivent être retournés pour chaque document.

**Trier les résultats** :
Vous pouvez trier les résultats en fonction d'un ou plusieurs champs :

```javascript
db.users.find().sort({ age: -1 }); // Trie par âge décroissant
```

**Pagination des résultats** :
Utilisez `limit()` et `skip()` pour paginer les résultats :

```javascript
db.users.find().limit(10).skip(20); // Passe les 20 premiers résultats, puis prend les 10 suivants
```

==Voir aussi findOneAndupdate() et findOneAndDelete()==




