import { app } from './app';
async function main(): Promise<void> {
  app.listen(8443, () => {
    console.log('Listening on 8443');
  });
}

main().catch((err) => {
  console.log(err);
});
