import App from './app';
import 'dotenv/config';

const PORT = process.env.PORT;

new App().start(PORT);
