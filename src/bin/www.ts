import 'dotenv/config';
import app from '../app';
import debug from 'debug';
import http from 'http';
import connectDB from '../config/db';


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const debugLog = debug("express-ts-mongodb:server");

const server = http.createServer(app);


function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' wymaga uprawnień administratora');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' jest już używany');
      process.exit(1);
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr?.port;

  debugLog('Listening on ' + bind);
  console.log(`🚀 Serwer działa na ${bind}`);
}

// --- start aplikacji ---

const start = async () => {
  try {
    await connectDB();

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

  } catch (error) {
    console.error("🔴 Krytyczny błąd podczas uruchamiania aplikacji:", error);
    process.exit(1);
  }
};

start();

// --- normalizePort ---

function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}
