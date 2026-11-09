# BEFORE : Memos (preuve source et constat narratif)

**Nature** : extraits du code vulnérable, plus observation utilisateur rapportée dans la conversation. **Pas de capture BEFORE de l’exposition intercomptes disponible dans les fichiers récupérés.**

```js
// Enregistrement avant correction
const memos = { memo, timestamp: new Date() };
// Récupération sans filtre de propriétaire
memosCol.find({});
```

- **Emplacements** : `app/routes/memos.js`, `app/data/memos-dao.js`
- **Cause** : absence de propriétaire et liste globale
- **BEFORE rapporté** : les comptes A et B voyaient des mémos communs
- **AFTER** : `userId` provenant de session, requête `find({ userId })`
- **Historique Git** : `git show 146e888^:app/data/memos-dao.js`.
