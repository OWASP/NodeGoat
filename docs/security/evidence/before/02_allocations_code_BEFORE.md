# BEFORE : Allocations (preuve source)

**Nature** : extrait logique de code vulnérable avant le commit `9b20b48`. **Aucune capture originale de l’exploitation BEFORE n’est incluse dans les pièces actuellement accessibles.**

```js
// Principe vulnérable observé
return {$where: `this.userId == ${parsedUserId} && this.stocks > '${threshold}'`};
```

- **Emplacement** : `app/data/allocations-dao.js`
- **Cause** : interpolation du paramètre `threshold` dans du JavaScript MongoDB
- **Effet possible** : modification de la logique du filtre, consommation CPU anormale
- **AFTER** : objet `{ userId, stocks: { $gt: Number(threshold) } }` après validation
- **Authentification historique** : `git show 9b20b48^:app/data/allocations-dao.js`.
