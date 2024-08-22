import express from 'express';
import cors from 'cors';
import {execSync} from 'child_process';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(cors({origin: '*'}));

const port = 8000;

const proxyOptions = {
    target1: 'http://localhost:8089/excuse', // target host for service1
    target2: 'http://localhost:8087/location', // target host for service2
    target3: 'http://localhost:8090/movie', // target host for service3
    target4: 'http://localhost:8088/weather', // target host for service4
    changeOrigin: true, // needed for virtual hosted sites
};

// Exécuter une commande shell pour démarrer les conteneurs de microservices avec Podman
async function startMicroservices() {
    await execSync('./script.sh')
}

app.use('/excuse', createProxyMiddleware(proxyOptions.target1))
app.use('/location', createProxyMiddleware(proxyOptions.target2))
app.use('/movie', createProxyMiddleware(proxyOptions.target3))
app.use('/weather', createProxyMiddleware(proxyOptions.target4))

// Endpoint pour démarrer les microservices
app.get('/start-microservices', async (req, res) => {
    await startMicroservices();
    res.status(200).send('Micro-services démarrés avec succès');

});

app.listen(port, () => {
    console.log(`Le serveur principal est démarré sur le port ${port}`);
});