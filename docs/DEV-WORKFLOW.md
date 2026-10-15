# Workflow de développement — Memory Game

## Commandes et limites

| Commande | Fonction |
|---|---|
| `make boot` | Démarrer Nginx sans construction explicite |
| `make start` | Construire l’image et démarrer le jeu |
| `make stop` | Arrêter les services sans les retirer |
| `make log` / `make connect` | Logs continus / shell Nginx |
| `make lint` / `make check` | Syntaxe de `script.js` via Node, sans correction |

Aucun framework de tests, ESLint ou Prettier n’est présent. `check` ne valide ni le comportement du jeu, ni HTML, ni CSS. Node est nécessaire pour ce contrôle, mais pas pour servir le jeu. Aucune dépendance npm n’est ajoutée.

## Développement et conventions Git

Les commandes se lancent depuis la racine du projet, dans Debian WSL. `make` sans argument affiche l’aide ; `make help` décrit uniquement les cibles existantes. Les contrôles sont séparés des corrections : `check` et `lint` ne reformattent pas les sources. Une commande peut écrire des caches ou des fichiers de test ; elle ne prépare pas la base applicative.

Pour les futures branches, utiliser `<type>/<description-courte>` avec les préfixes `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/` ou `hotfix/`. Conserver les branches historiques et le modèle d’intégration propre au projet ; ces conventions ne créent pas de branche `develop` ni ne renomment `feature/*`.

Messages de commit : `<type>[optionnellement(scope)]: description`, par exemple `chore: harmoniser les commandes de développement` ou `fix(auth): corriger la redirection`. Préférer un commit ciblé et une description à l’impératif ; aucun hook ni outil de validation supplémentaire n’est imposé.

Ne pas versionner de secret. Préserver les fichiers d’environnement réels et utiliser les modèles existants lorsqu’ils sont disponibles. Les ports, volumes et réseaux propres au projet ne sont pas interchangeables avec ceux des autres applications.

L’EditorConfig vise les futures éditions : UTF-8, LF, ligne finale, espaces, exception Markdown et tabulations pour les recettes Make. Les règles des outils de formatage déjà configurés restent prioritaires pour leurs formats.

Les attributs Git fixent LF uniquement pour les fichiers de workflow listés dans `.gitattributes`, malgré `core.autocrlf` global. Aucune renormalisation des sources ni modification de la configuration Git globale n’est effectuée.
