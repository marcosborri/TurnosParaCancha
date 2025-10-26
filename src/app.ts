import Server from './server';

const server = new Server(3000);
server.start(() => {
  console.log('on port 3000');
});
