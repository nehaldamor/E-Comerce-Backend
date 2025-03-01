const http=require('http');
const app=require('./app');
const cors=require('cors');

const port=process.env.PORT || 4000;

app.use(cors());

const server=http.createServer(app);

server.listen(port,()=>{
    console.log(`server is runnig at ${port}`);
});