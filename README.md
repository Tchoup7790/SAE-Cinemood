# Cinémood 
Bienvenue dans Cinémood ! Cinémood est une application Web qui vous permet de découvrir et de regarder des films en fonction de la météo. 

## Pré-requis
- **Node** - [Download link](https://nodejs.org/en/download)
- **Podman** - [Docs link](https://podman.io/docs/installation)
- **Vite** - [Guide link](https://vitejs.dev/guide/)

## Installation

**Cloner le projet**
```bash
git clone https://gitlab.univ-nantes.fr/pub/but/but2/sae4.real.01_developpement_d_une_application_complexe/groupe04/eq_04_03_julio-baptiste_gouin-charly_jesus-zacchary_martineau-tomas.git
```

**Installer les dépendances pour le dossier ```/backend/```**
```bash
cd backend
podman machine start #podman est requis pour lancer le projet, cette commande est à faire seulement si vous êtes sur macOs
npm install
```

**Installer les dépendances pour le dossier ```/frontend/```**
```bash
cd frontend
npm install || yarn install #yarn ou npm selon votre préférence
```

## Lancement du projet
**Lancer le backend** - depuis le dossier ```/backend/```
```bash
npm start
```
Puis lancer les microservices dans un autre terminal
```bash
curl http://localhost:8000/start-microservices
```

**Lancer le frontend** - depuis le dossier ```/frontend/```
```bash
npm run dev || yarn dev
```

Le site est accessible à l'adresse ```http://localhost:5173/```


## Tester le backend
**Lancer les tests** - depuis un dossier de ```/backend/microServices/XXX```
```bash
npm test
```

*Les tests ne sont pas fait pour ```locationServices``` car il n'est pas utilisé dans l'application*
