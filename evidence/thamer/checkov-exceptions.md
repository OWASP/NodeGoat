# Checkov Kubernetes - Analyse des exceptions

Responsable : Thamer
Périmètre : NodeGoat et MongoDB
Résultat du scan : 186 Passed / 7 Failed / 0 Skipped

## 1. CKV_K8S_15 - Image Pull Policy Always

Ressources :
- Deployment/nodegoat
- Deployment/mongodb

Constat :
Les deux déploiements utilisent imagePullPolicy: IfNotPresent.

Justification :
L'environnement de démonstration utilise un cluster kind local
avec des images préchargées. IfNotPresent permet d'utiliser ces
images sans dépendre d'un registre externe à chaque démarrage.

Limite :
Cette configuration ne garantit pas la récupération de la dernière
image disponible dans un registre.

Mesure future :
Utiliser une stratégie de publication avec références immuables
et vérification de l'image.

## 2. CKV_K8S_43 - Image should use digest

Ressources :
- Deployment/nodegoat
- Deployment/mongodb

Constat :
Les images sont référencées par tags :
- nodegoat-devsecops-web:1.0.0
- mongo:4.4

Limite :
Un tag peut être déplacé vers une autre image.

Mesure future :
Utiliser des références par digest SHA256 et conserver les
preuves de vérification d'intégrité.

## 3. CKV_K8S_40 - Containers should run as a high UID

Ressources :
- NodeGoat : UID 1000
- MongoDB : UID 999

Constat :
Les deux conteneurs fonctionnent avec runAsNonRoot: true.
Les UID correspondent aux utilisateurs non-root prévus par
les images utilisées.

Justification :
Les UID sont définis explicitement et les conteneurs ne
fonctionnent pas en root.

Limite :
Les UID sont inférieurs au seuil élevé attendu par Checkov.
Une modification nécessite une validation de compatibilité
des images et des permissions sur les volumes.

## 4. CKV_K8S_35 - Prefer secrets as files

Ressource :
- Deployment/nodegoat

Constat :
COOKIE_SECRET et CRYPTO_KEY sont injectés via secretKeyRef
dans les variables d'environnement.

Justification :
Les valeurs ne sont pas inscrites en clair dans les manifests.
Elles proviennent d'un objet Kubernetes Secret.

Limite :
Checkov recommande un montage sous forme de fichiers.

Mesure future :
Adapter l'application pour prendre en charge des variables
de type *_FILE avant de migrer vers des secrets montés.

## 5. Contrôles compensatoires vérifiés

- runAsNonRoot: true
- readOnlyRootFilesystem: true
- Capabilities supprimées
- allowPrivilegeEscalation: false
- Limites de ressources configurées
- RBAC en lecture seule
- NetworkPolicy testée avec Calico
- Secrets hors des manifests en clair

## 6. Conclusion

Les sept résultats FAILED sont conservés et documentés.
Ils ne sont pas présentés comme des corrections réussies.
Les exceptions sont liées à l'environnement local ou à la
compatibilité des images et de l'application.

Les améliorations futures sont identifiées pour une livraison
avec images immuables et gestion des secrets par fichiers.
