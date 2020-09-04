import { readFileSync, writeFileSync } from "fs"
import {EOL} from'os'
import MarkovChain from "./chain.js"
import Twit from 'twit'
const chainfile = "chain.json"
const configFile = '.config.json'

const entrenar = (source) => {
  const cadena = new MarkovChain(source)
  console.log(cadena.process())
  writeFileSync(chainfile, JSON.stringify(cadena.wordBank), "utf8")
};

const cargarCadena = () => {
    const grabada = JSON.parse(readFileSync(chainfile, "utf8"))
    const cadena = new MarkovChain('')
    cadena.end((sentence)=> sentence.split('jump').length > 5)
    cadena.wordBank = grabada
    return cadena
};

const generar = () => {
    const cadena = cargarCadena()
    return cadena.process().replace(/ ?jump ?/g,EOL).trim()
}

const probar = () => {
    console.log(generar())
}

const twitear = () => {
    const tweet = generar()
    const Tw = new Twit(JSON.parse(readFileSync(configFile, "utf8")))
    Tw.post('statuses/update', { status: tweet })
}

switch (process.argv[2]) {
    case "entrenar":
        entrenar(readFileSync(process.argv[3], "utf8"))
        break
    case "probar":
        probar()
        break;
    case "twittear":
        twitear()
        break
}
