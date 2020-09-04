import { readFileSync, writeFileSync } from 'fs'
import MarkovChain from './chain.js'

const entrenar = (source) => {
    const cadena = new MarkovChain(source, w => w.toLowerCase())
    console.log(cadena.process())
    writeFileSync('chain.json', JSON.stringify(cadena.wordBank), 'utf8')
}

switch (process.argv[2]) {
    case 'entrenar':
        entrenar(readFileSync(process.argv[3],"utf8"))
        break;
    case 'probar':
        break;
}

