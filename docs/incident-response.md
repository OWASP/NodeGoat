# Procédure de réponse à incident — NodeGoat DevSecOps

## 1. Objectif

Cette procédure décrit la détection, l'investigation, le confinement et la remédiation d'un comportement suspect dans un conteneur Kubernetes.

L'exercice a été réalisé dans un environnement local de laboratoire avec Kubernetes Kind, Falco, NetworkPolicy, Alloy et Loki.

**Responsable :** Thamer — Infrastructure, Kubernetes et sécurité runtime.

## 2. Scénario de sécurité

Un comportement suspect est simulé : l'exécution d'un shell (`/bin/sh`) à l'intérieur d'un conteneur.

- Conteneur : `falco-test-shell`
- Image : `alpine:3.21`
- Namespace : `default`
- Événement : exécution d'un shell dans le conteneur.
- Outil de détection : Falco.
- Niveau d'alerte : WARNING.

Ce scénario est contrôlé et réalisé uniquement dans le cluster de laboratoire.

## 3. Détection

Falco surveille les événements système et applique une règle personnalisée :

`NodeGoat Shell in Container`

La règle détecte l'exécution de `sh`, `ash`, `bash` ou `zsh` dans un conteneur.

Exemple d'alerte observée :

`NODEGOAT ALERT: Shell executed in container`

Les informations disponibles comprennent l'utilisateur, la commande, le nom du conteneur et son image.

Les événements sont collectés par Alloy et transmis à Loki. Le dashboard Grafana permet de consulter les alertes.

Une règle d'alerte Grafana a également été configurée pour signaler les événements `NODEGOAT ALERT`.

## 4. Investigation et conservation des preuves

Après réception de l'alerte :

1. Identifier le conteneur concerné.
2. Examiner les journaux Falco.
3. Examiner la description du Pod.
4. Conserver les éléments nécessaires à l'investigation.

Les preuves sont conservées dans :

`evidence/thamer/incident-response/`

Fichiers principaux :
- `suspect-pod.yaml`
- `suspect-pod-description.txt`
- `falco-alerts.log`
- `incident-detection.log`

## 5. Confinement

Une NetworkPolicy temporaire a été appliquée au Pod suspect.

Fichier : `isolate-test-pod.yaml`

La politique sélectionne le Pod `falco-test-shell` et bloque les communications entrantes et sortantes.

Les tests effectués ont montré :
- Échec de la résolution DNS.
- Échec de la connexion externe par adresse IP.
- Maintien de la détection Falco après l'isolation.

La preuve de cette étape est conservée dans :
- `isolation-policy-applied.yaml`
- `pod-after-isolation.txt`

## 6. Remédiation

Après conservation des preuves et vérification du confinement :

- Suppression du Pod de test suspect.
- Suppression de la NetworkPolicy temporaire.
- Vérification de l'absence du Pod et de la politique temporaires.

Le retour à l'état propre a été confirmé par Kubernetes avec :

`No resources found in default namespace.`

## 7. Vérification après incident

Les vérifications ont confirmé :
- La détection de l'exécution du shell par Falco.
- La collecte des événements par Alloy.
- La réception des événements dans Loki.
- Leur visualisation dans Grafana.
- Le déclenchement de la règle d'alerte Grafana.
- Le confinement réseau du Pod.
- La suppression du Pod de test et de la politique temporaire.

## 8. Enseignements et améliorations

- Conserver les journaux avant toute remédiation.
- Utiliser des NetworkPolicies pour isoler les workloads suspects.
- Maintenir une surveillance runtime avec Falco.
- Centraliser les événements avec Alloy et Loki.
- Utiliser Grafana pour visualiser et signaler les alertes.
- Ne jamais exposer de secrets ou de données sensibles dans les journaux.
- Tester régulièrement les procédures de réponse à incident.

## 9. Conclusion

L'exercice a démontré une chaîne complète de réponse à incident dans un environnement Kubernetes local : détection, investigation, conservation des preuves, confinement, remédiation et vérification du retour à un état sûr.

Le scénario est une simulation contrôlée et ne constitue pas la preuve d'une compromission réelle.
