import { readFileSync } from 'fs';
import https from 'https';
import { app } from './app';
// TODO: Put this somewhere else

async function main(): Promise<void> {
  const privateKey = readFileSync(process.env.KEY_PATH as string, 'utf8');
  const certificate = readFileSync(process.env.CERT_PATH as string, 'utf8');
  const config = {
    key: privateKey,
    cert: certificate,
  };

  const server = https.createServer(config, app);
  server.listen(8443, () => {
    console.log('Listening on 8443');
  });
}
main().catch((err) => {
  console.log(err);
});
