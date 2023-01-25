const fs = require('fs');


//reading files
/*fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
});
console.log('last line of code');*/
//writing files
// fs.writeFile( './docs/blog1.txt', 'Hello, World!', () => {
//     console.log('File was written.')
// } );

// fs.writeFile( './docs/blog2.txt', 'Hello, World Again to New File!', () => {
//     console.log('File was written to a New File.')
// } );


//directories
// if (!fs.existsSync('./assets')) {
//     fs.mkdir( './assets', (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('Folder is created');
//     } );
// } else {
//     fs.rmdir('./assets', (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('folder deleted');
//     })
// }


//deleting files
if (fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('file deleted');
    })
}