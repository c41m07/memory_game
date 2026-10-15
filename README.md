# Memory Game

Jeu de mémoire réalisé en HTML, CSS et JavaScript, servi localement par Nginx.

## Technologies et prérequis

Docker avec Compose, Make et Debian WSL sous Windows. Node est facultatif pour jouer et nécessaire pour les contrôles syntaxiques. Le réseau externe `traefik_network` et un Traefik configuré doivent déjà être disponibles pour l’accès par nom d’hôte.

## Installation et environnement

Depuis la racine du projet :

```bash
make start
```

Cette commande construit l’image à partir des sources puis démarre Nginx. Après une modification des sources, relancer `make start` pour reconstruire l’image. Aucun gestionnaire de dépendances ni fichier `.env` n’est requis.

L’hôte est configurable par `MEMORY_GAME_HOST` (par défaut `memory-game.localhost`) et le point d’entrée Traefik par `TRAEFIK_ENTRYPOINT` (par défaut `web`). Ces valeurs sont propres à votre infrastructure ; aucun port hôte n’est publié par ce Compose.

## Démarrage et commandes Make

```bash
make help
make boot
make log
make stop
```

`boot` démarre sans construction explicite ; `stop` conserve les conteneurs. `connect` ouvre un shell dans Nginx. L’adresse locale par défaut est http://memory-game.localhost/ lorsque Traefik est configuré.

## Tests et qualité

```bash
make check
```

Le contrôle disponible est la syntaxe de `script.js` via Node. Il ne remplace pas les essais du jeu dans le navigateur ; aucun test automatisé ni vérification HTML/CSS n’est configuré.

## Structure

- `index.html`, `script.js`, `style.css` : interface et comportement du jeu.
- `Dockerfile`, `compose.yaml` : service Nginx et connexion au réseau Traefik.

## Développement et dépannage

[Commandes, formatage et conventions Git](docs/DEV-WORKFLOW.md).

Si Docker est indisponible depuis Debian, activer l’intégration WSL de Docker Desktop. Si l’adresse ne répond pas, vérifier Traefik et l’existence du réseau externe ; si les changements ne sont pas visibles, reconstruire l’image avec `make start`.

Les fins de ligne LF des fichiers de workflow sont stabilisées par `.gitattributes`, sans reformater les sources ni changer la configuration Git globale.
