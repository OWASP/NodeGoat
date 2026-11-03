# BEFORE : Contributions (preuve source)

**Nature** : extrait logique de code avant correction, reconstitué d’après le code discuté et le commit `67964ff`. **Ce document n’est pas une capture d’écran du pentest BEFORE.**

```js
// Principe vulnérable observé avant correction
const preTax = eval(req.body.preTax);
const afterTax = eval(req.body.afterTax);
const roth = eval(req.body.roth);
```

- **Emplacement** : `app/routes/contributions.js`
- **Cause** : interprétation côté serveur d’une saisie non fiable
- **Effet possible** : exécution d’expressions JavaScript ; impact exact dépend du contexte
- **AFTER** : validation de nombres décimaux, sans `eval()` ; six tests réussis
- **Authentification historique** : comparer localement `git show 67964ff^:app/routes/contributions.js` et `git show 67964ff:app/routes/contributions.js`.
