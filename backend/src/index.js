require('dotenv').config();

const app = require('./app');
require('./database');  //Porque no exporta nada se puede llamar así

async function main(){//Inicia el programa
    //app.listen(4000, ()=>console.log("Server on port 4000"));
    await app.listen(app.get('port'));
    console.log("Sever on port: "+app.get('port'));
}

main();

