# Rapport de sécurité : OWASP NodeGoat

**Responsable :** Ghaith
**Branche :** work/ghaith
**Date :** 03/11/2026
**Environnement :** Kali Linux, Node.js, MongoDB, Docker

---

## 1. Objectif

Ce rapport présente l'analyse STRIDE et les tests de
pénétration BEFORE / AFTER réalisés sur OWASP NodeGoat.

L'objectif est d'identifier des vulnérabilités, de les
corriger et de vérifier les améliorations de sécurité.

Quatre problèmes ont été traités :
1. JavaScript Injection dans Contributions
2. NoSQL Injection dans Allocations
3. Broken Access Control dans Benefits
4. Exposition des mémos entre utilisateurs

---

## 2. Analyse STRIDE

### 2.1 Architecture étudiée

Navigateur utilisateur
        |
        v
Serveur Node.js / Express
        |
        v
Couche DAO
        |
        v
Base de données MongoDB

Les frontières de confiance sont :
- Entre le navigateur et le serveur.
- Entre les entrées utilisateur et la logique serveur.
- Entre la logique applicative et MongoDB.

### 2.2 Menaces STRIDE

| Catégorie | Menace | Composant | Observation |
|---|---|---|---|
| S - Spoofing | Usurpation de session | Authentification | Risque à évaluer |
| T - Tampering | Manipulation des entrées | Contributions, Allocations | Failles corrigées |
| R - Repudiation | Actions insuffisamment journalisées | Application | Non testé |
| I - Information Disclosure | Exposition des mémos | Memos | Correction vérifiée |
| D - Denial of Service | Exécution coûteuse via $where | Allocations | Risque potentiel réduit |
| E - Elevation of Privilege | Accès aux fonctions administrateur | Benefits | Contrôle d'accès ajouté |

Les catégories non testées sont des menaces potentielles,
et non des vulnérabilités démontrées.

### 2.3 Mesures de sécurité

- Validation stricte des entrées utilisateur.
- Suppression de l'évaluation JavaScript dangereuse.
- Requêtes MongoDB structurées.
- Contrôle des privilèges administrateur.
- Isolation des données selon la session utilisateur.

---

## 3. Pentest BEFORE / AFTER

### 3.1 JavaScript Injection

**Fonctionnalité :** Contributions

**BEFORE :**
Le serveur utilisait eval() pour interpréter
les valeurs transmises par l'utilisateur.

**Correction :**
Suppression de eval() et validation numérique stricte.

**AFTER :**
Les valeurs invalides comme 1+1, -5 et 10abc
sont rejetées.

**Preuve :**
6 tests de validation réussis et vérification manuelle.

**Commit :** 67964ff

### 3.2 NoSQL Injection

**Fonctionnalité :** Allocations

**BEFORE :**
Une requête MongoDB utilisait $where avec
une valeur threshold non fiable.

**Correction :**
Remplacement de $where par un filtre $gt
et validation des paramètres.

**AFTER :**
- threshold=10 : accepté
- threshold=0 : accepté
- threshold=100 : rejeté
- Injection JavaScript : rejetée
- Injection avec boucle : rejetée

**Preuve :**
9 tests automatisés réussis et captures du
pentest AFTER.

**Commit :** 9b20b48

### 3.3 Broken Access Control

**Fonctionnalité :** Benefits

**BEFORE :**
Un utilisateur ordinaire pouvait accéder à
/benefits et enregistrer des modifications.

**Correction :**
Ajout du middleware isAdmin sur les routes
GET et POST de /benefits.

**AFTER :**
Un utilisateur non administrateur tentant
d'ouvrir /benefits est redirigé vers /login.

**Preuve :**
Capture du refus d'accès GET et suite E2E réussie.

**Limite :**
Le refus d'un POST direct par un non-administrateur
n'a pas été vérifié séparément.

**Commits :** b2010fc, c537f70

### 3.4 Exposition des mémos

**Fonctionnalité :** Memos

**BEFORE :**
Les mémos étaient enregistrés sans propriétaire.
La requête find({}) affichait tous les mémos.

**Correction :**
Ajout du userId aux mémos et remplacement
de find({}) par find({ userId }).

**AFTER :**
Compte A : le mémo TEST-PRIVE-GHAITH-2026 est visible.
Compte B : ce mémo n'est pas visible.

**Preuve :**
Captures des deux comptes et exécution E2E réussie.

**Commit :** 146e888

---

## 4. Résultats CI/CD

Dernier commit de sécurité vérifié : 146e888

| Workflow | Résultat |
|---|---|
| Lint | PASS |
| Semgrep SAST | PASS |
| E2E Test | PASS |

Les workflows Gitleaks, Trivy et les Security Gates
sont suivis séparément par Moetaz.

Les résultats PASS ne garantissent pas l'absence
de toutes les vulnérabilités.

---

## 5. Limites et travaux restants

- Le POST non autorisé dans Benefits reste à
  vérifier spécifiquement.
- Les anciens mémos sans userId ne sont plus
  affichés, mais restent dans MongoDB.
- Les quatre problèmes étudiés couvrent surtout
  Injection et Broken Access Control dans la
  classification OWASP.
- L'analyse STRIDE distingue plusieurs types
  de menaces, mais ne démontre pas à elle seule
  trois catégories OWASP distinctes.
- L'intégration avec les branches des autres
  membres et les vérifications finales restent
  à réaliser.

---

## 6. Conclusion

Quatre vulnérabilités ont été traitées dans
l'application OWASP NodeGoat.

Les corrections renforcent :
- La validation des données.
- La sécurité des requêtes MongoDB.
- Les contrôles d'autorisation.
- La confidentialité des mémos personnels.

Les pentests AFTER et les tests automatisés
fournissent des preuves d'amélioration de sécurité,
dans les limites décrites précédemment.

Les captures BEFORE / AFTER seront conservées
dans docs/security/evidence/.
