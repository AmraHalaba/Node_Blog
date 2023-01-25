const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf-8' });
const writeStrem = fs.createWriteStream('./docs/blog4.txt');


//STREAMING METOHOD
// readStream.on('data', (chunk) => {
//     console.log('-----NEW CHUNK-----')
//     console.log(chunk);
//     writeStrem.write('\nNEW CHUNK\n')
//     writeStrem.write(chunk);
// })

//PIPING METHOD
readStream.pipe(writeStrem); //much easier