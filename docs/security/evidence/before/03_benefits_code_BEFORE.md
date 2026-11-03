# BEFORE : Benefits (preuve source et constat narratif)

**Nature** : extrait de la route vulnérable, plus observation BEFORE relatée dans les échanges. **Aucune capture BEFORE du compte ordinaire modifiant Benefits n’est accessible dans les fichiers récupérés.**

```js
app.get("/benefits", isLoggedIn, benefitsHandler.displayBenefits);
app.post("/benefits", isLoggedIn, benefitsHandler.updateBenefits);
```

- **Emplacement** : `app/routes/index.js`
- **Cause** : contrôle de connexion mais absence d’autorisation administrateur
- **BEFORE rapporté** : un compte `dev` pouvait modifier des avantages
- **AFTER observé** : tentative GET d’un compte ordinaire redirigée vers `/login`
- **Limite** : refus POST non administrateur non testé directement
- **Historique Git** : `git show b2010fc^:app/routes/index.js`.
