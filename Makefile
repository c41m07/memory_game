.DEFAULT_GOAL := help

## Commandes communes
help: ## Afficher les commandes disponibles (sans démarrer de services)
	@awk 'BEGIN {FS = ":.*## "} /^[a-zA-Z0-9_-]+:.*## / {line = sprintf("  %-20s %s\n", $$1, $$2); if ($$1 ~ /^(help|boot|start|stop|log|connect|test|lint|fixer|check|watch)$$/) common = common line; else specific = specific line} END {printf "Commandes communes\n%s", common; if (specific != "") printf "\nCommandes propres au projet et alias historiques\n%s", specific}' $(MAKEFILE_LIST)

DOCKER_COMPOSE = docker compose -f compose.yaml
NODE ?= node

.PHONY: help boot start stop log connect lint check

boot: ## Démarrer les services existants sans construction explicite
	$(DOCKER_COMPOSE) up -d
start: ## Construire l'image et démarrer le jeu
	$(DOCKER_COMPOSE) up -d --build
stop: ## Arrêter les services en conservant les conteneurs
	$(DOCKER_COMPOSE) stop
log: ## Suivre les logs (Ctrl+C pour quitter)
	$(DOCKER_COMPOSE) logs -f
connect: ## Ouvrir un shell interactif dans Nginx
	$(DOCKER_COMPOSE) exec memory-game sh
lint: ## Vérifier uniquement la syntaxe JavaScript avec Node
	$(NODE) --check script.js
check: lint ## Exécuter les contrôles disponibles, sans correction
