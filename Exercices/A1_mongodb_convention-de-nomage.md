# Convention de nomage pour MongoDB

## Pour les Collections

- **Utiliser des noms descriptifs** : Choisissez des noms qui reflètent clairement le contenu de la collection, comme `users` pour une collection d'informations utilisateur.
- **Noms en minuscules** : Pour éviter les problèmes de casse, car les noms de collections dans MongoDB sont sensibles à la casse.
- **Utiliser le pluriel** : Les noms de collections sont généralement au pluriel puisqu'une collection contient plusieurs documents, par exemple `users`, `products`, ou `orders`.
- **Éviter l'utilisation de caractères spéciaux** : Préférez ne pas utiliser d'espaces, de tirets, ou de caractères spéciaux. Les underscores (`_`) sont acceptables, comme dans `order_items`.
- **Prévoir l’évolutivité** : Nommez les collections en pensant à l'évolutivité future de votre application, par exemple, en utilisant `customers`, `admins` au lieu d'un terme plus générique comme `users`.

## Pour les Documents

- **Descriptive Keys** : Les clés des documents doivent être descriptives, comme `emailAddress` pour des adresses email.
- **Camel Case** : Utilisez souvent camelCase pour les clés dans les documents, en particulier si vous travaillez avec des langages qui utilisent cette convention, comme JavaScript (`firstName`, `lastName`).
- **Éviter les caractères spéciaux** : Évitez d'inclure des caractères spéciaux dans les noms des clés. Bien que MongoDB les accepte, ils peuvent compliquer les requêtes.
- **Consistance** : Utilisez les clés de manière cohérente à travers les documents pour les mêmes types de données, évitant par exemple d'alterner entre `email` et `emailAddress` dans la même collection.
