// Script Node.js per generare le icone PNG dall'SVG
// Richiede: npm install sharp (oppure usa il metodo canvas qui sotto senza dipendenze)
// Esegui con: node icons/generate-icons.js

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas'); // opzionale, se disponibile

// Prova prima con sharp, poi con canvas, poi fallback base64 SVG embedded
async function trySharp() {
  try {
    const sharp = require('sharp');
    const svgBuffer = fs.readFileSync(path.join(__dirname, 'icon.svg'));
    await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(__dirname, 'icon-192.png'));
    await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(__dirname, 'icon-512.png'));
    console.log('Icone generate con sharp!');
    return true;
  } catch {
    return false;
  }
}

async function tryCanvas() {
  try {
    const { createCanvas, loadImage } = require('canvas');
    const svgPath = path.join(__dirname, 'icon.svg');

    for (const size of [192, 512]) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      const img = await loadImage(svgPath);
      ctx.drawImage(img, 0, 0, size, size);
      fs.writeFileSync(path.join(__dirname, `icon-${size}.png`), canvas.toBuffer('image/png'));
    }
    console.log('Icone generate con canvas!');
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (await trySharp()) return;
  if (await tryCanvas()) return;
  console.log('Nessuna libreria disponibile. Usa Inkscape, SVGOMG o converti manualmente icon.svg in icon-192.png e icon-512.png');
}

main();
