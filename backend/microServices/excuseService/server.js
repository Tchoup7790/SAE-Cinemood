import express from 'express';
import router from './src/router/router.mjs';

const app = express();

app.use(router);
app.listen(8089, () => {
    console.log('Excuse service on');
});

export default app;