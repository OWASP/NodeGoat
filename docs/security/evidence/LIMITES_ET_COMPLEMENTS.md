# Limites et compléments de preuve

1. Les images `after/` proviennent des captures publiées par l'utilisateur dans la conversation. Ce sont des **preuves visuelles AFTER**, des vues de saisie ou des captures CI, selon leur libellé dans l'inventaire.
2. Les fichiers `before/*.md` décrivent le code vulnérable à partir des extraits transmis : **ce ne sont pas des captures d'écran d'exploitation BEFORE**. Confirmer la provenance historique avec les commandes `git show` indiquées.
3. Des démonstrations BEFORE ont été décrites pour les quatre failles pendant la conversation, mais les captures BEFORE correspondantes ne sont pas toutes récupérables ici. Aucune image de ce type n'a été fabriquée.
4. Les tests sur `/memos` supposent que les mémos sont destinés à être privés. L'exigence de confidentialité devrait être explicitée dans le modèle métier.
5. Dans `/benefits`, GET non admin est vérifié ; le rejet direct de POST et la non-modification des données ne sont pas démontrés indépendamment.
6. Les captures CI de `work/moetaz` ne valent pas attestation que les mêmes contrôles ont exécuté le dernier commit de `work/ghaith`.
7. Vérifier l'absence de données personnelles ou de secrets dans les captures avant publication. La capture du login a été masquée dans le pack.
8. **Troisième catégorie OWASP :** état non satisfait par les quatre cas Ghaith seuls ; examiner les preuves Trivy/Moetaz ou une autre catégorie démontrée.
