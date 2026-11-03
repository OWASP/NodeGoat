# Fiche de contribution individuelle – Ghaith

**Projet :** OWASP NodeGoat DevSecOps
**Branche :** `work/ghaith`

| Commit | Action | Indice vérifiable |
|---|---|---|
| `67964ff` | Remplacement de `eval()` dans Contributions | Validations automatiques et manuelles |
| `9b20b48` | Suppression de l'injection NoSQL via `$where` | Tests de requête et rejet de paramètres |
| `b2010fc` | Protection admin de Benefits | Redirection GET non admin |
| `c537f70` | Mise à jour E2E Benefits | E2E GitHub vert |
| `146e888` | Memos associés à l'utilisateur authentifié | Compte A/B et CI verte |

**Travail documentaire :** modélisation STRIDE, traçabilité BEFORE / AFTER et préparation des preuves.

**Difficultés traitées :** tests E2E obsolètes après correction d'un défaut de contrôle d'accès ; absence de propriété utilisateur dans Memos ; qualification stricte des paramètres MongoDB.

**Réserves :** seules les preuves AFTER des cas décrits sont jointes comme captures ; détails des tests historiques et troisième catégorie OWASP à consolider. Le POST non admin dans Benefits n'a pas été testé séparément.
