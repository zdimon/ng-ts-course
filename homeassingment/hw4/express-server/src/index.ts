import app from './app'
const port:number = 8083;

//Прослушка порта сервера
app.set('port',port)
app.listen(port, () =>{
    console.log(`server started at: http://localhost:${port}`)
})

