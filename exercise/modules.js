//const xyz = require( './people.js' );

//const { people } = require( './people.js' )
//const { ages } = require( './people.js' )
const { people, ages } = require( './people.js' )


//console.log(xyz.people, xyz.ages);

console.log(people)
console.log(ages)

const os = require('os');
console.log(os.platform(), os.homedir());