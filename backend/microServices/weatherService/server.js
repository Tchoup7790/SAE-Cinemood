import express from 'express';
import router from './src/router/router.mjs';

const app = express();

app.use(router);
app.listen(8088, () => {
    console.log('Weather service on');
});

export default app;