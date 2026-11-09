# Fiche de contribution individuelle — Thamer

## 1. Identification

- **Projet :** NodeGoat DevSecOps
- **Contributeur :** Thamer
- **Rôle :** Infrastructure, Docker, Kubernetes et sécurité runtime
- **Dépôt :** `moetaz-sgh/nodegoat-devsecops`
- **Branche :** `work/thamer-runtime-security`
- **Pull Request :** #4 — Fusionnée
- **Commit principal :** `9003173`

## 2. Responsabilités

Ma responsabilité dans le projet était de renforcer la sécurité de l'infrastructure et des conteneurs, de déployer les composants Kubernetes et de mettre en place la détection et la surveillance des événements de sécurité runtime.

## 3. Travaux réalisés

### Docker et conteneurs

- Durcissement du Dockerfile et de Docker Compose.
- Exécution de l'application avec un utilisateur non-root.
- Création et amélioration du `.dockerignore`.
- Mise en lecture seule du système de fichiers.
- Suppression des capabilities inutiles.
- Configuration des limites CPU et mémoire.
- Activation de `no-new-privileges`.

### Kubernetes

- Déploiement local avec Kind et Calico.
- Déploiement de NodeGoat et MongoDB.
- Configuration des SecurityContext.
- Injection des secrets via Kubernetes Secret et `secretKeyRef`.
- Désactivation du montage automatique du ServiceAccount.
- Configuration des limites de ressources.
- Création des NetworkPolicies avec une politique default-deny.
- Mise en place du RBAC least privilege.

### Audits de sécurité

**Checkov :**
- Exécution de l'audit Kubernetes.
- Résultat : 186 contrôles réussis et 7 échecs.
- Documentation des exceptions et des mesures compensatoires dans `evidence/thamer/checkov-exceptions.md`.

**Kubescape :**
- Exécution du scan de sécurité.
- Score global : 83,20 %.
- Couverture : 46 contrôles sur 48.
- Analyse des 11 contrôles en échec.
- Documentation des limites et des résultats dans `evidence/thamer/kubescape-analysis.md`.

### Kyverno

- Installation et configuration de Kyverno.
- Création d'une politique interdisant les conteneurs privilégiés.
- Test de refus d'un Pod privilégié.
- Vérification de l'acceptation d'un Pod sécurisé.

### Sécurité runtime et monitoring

- Installation et configuration de Falco.
- Création d'une règle personnalisée détectant l'exécution d'un shell dans un conteneur.
- Installation d'Alloy pour la collecte des journaux.
- Centralisation des événements dans Loki.
- Création d'un dashboard Grafana.
- Configuration d'une règle d'alerte Grafana.

### Réponse à incident

- Simulation contrôlée d'une activité suspecte.
- Détection par Falco.
- Conservation des preuves.
- Isolement réseau du Pod avec NetworkPolicy.
- Vérification du confinement.
- Suppression du Pod de test et de la politique temporaire.
- Vérification du retour à un état propre.

La procédure est documentée dans `docs/incident-response.md`.

## 4. Difficultés rencontrées et solutions

| Difficulté | Solution apportée |
|---|---|
| Compatibilité des anciennes dépendances Node.js | Conservation de l'environnement compatible et documentation des limites |
| Application des NetworkPolicies avec Kind | Utilisation de Calico et tests de connectivité |
| Échecs de contrôles Checkov | Analyse des contrôles et justification des exceptions |
| Échecs Kubescape sur les rôles système | Identification des ressources concernées et documentation sans affaiblir le RBAC |
| Démarrage du driver Falco | Configuration de l'environnement eBPF et des permissions nécessaires |
| Collecte des logs runtime | Intégration Alloy et Loki |
| Vérification de la détection runtime | Simulation d'exécution d'un shell dans un conteneur de test |

## 5. Preuves et livrables

Les preuves de mon travail sont conservées dans :

- `k8s/`
- `evidence/thamer/`
- `evidence/thamer/incident-response/`
- `docs/incident-response.md`

Les principaux fichiers comprennent :
- `checkov-after.json`
- `checkov-exceptions.md`
- `kubescape-nodegoat.json`
- `kubescape-analysis.md`
- `kyverno-tests.txt`
- `network-policy-tests.txt`
- `rbac-least-privilege.txt`
- `falco-detection.log`

## 6. Contribution GitHub

- **Commit :** `9003173`
- **Message :** `security(thamer): harden Docker and Kubernetes runtime`
- **Pull Request :** #4
- **Titre :** Security: harden Kubernetes and runtime monitoring
- **Statut :** Merged
- **Branche source :** `work/thamer-runtime-security`
- **Branche cible :** `master`

La Pull Request a intégré 34 fichiers et a passé 8 checks GitHub selon l'interface affichée lors de la fusion.

## 7. Limites identifiées

- Certains contrôles Checkov restent en échec et sont documentés.
- Kubescape présente une couverture incomplète de 46/48 contrôles.
- Plusieurs résultats Kubescape concernent les permissions système du cluster Kind.
- MongoDB 4.4 et Node.js 12 sont des versions anciennes nécessitant une stratégie de mise à niveau.
- Les notifications externes Grafana ne sont pas configurées dans l'environnement de laboratoire.

## 8. Conclusion

Ma contribution a permis de renforcer la sécurité Docker et Kubernetes, de mettre en place des contrôles de sécurité préventifs et de réaliser une chaîne de surveillance runtime avec Falco, Alloy, Loki et Grafana.

Les travaux ont été testés, documentés, versionnés dans GitHub et intégrés dans la branche principale à travers la Pull Request #4.
