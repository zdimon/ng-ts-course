import app from "./app";
const port = 8083; // порт
// запуск сервера
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} ); 