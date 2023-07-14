import http from 'http';
import { app } from './app';

async function main(): Promise<void> {
  const server = http.createServer(app);
  server.listen(8443, () => {
    console.log('Listening on 8443');
  });
}
main().catch((err) => {
  console.log(err);
});
