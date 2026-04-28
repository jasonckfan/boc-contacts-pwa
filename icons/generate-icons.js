// Generate simple SVG icons for PWA
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const svgTemplate = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#1e3a8a" rx="${size * 0.15}"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.5}" font-weight="bold" fill="white">聯</text>
</svg>`;

sizes.forEach(size => {
    const svg = svgTemplate(size);
    fs.writeFileSync(path.join(__dirname, `icon-${size}x${size}.svg`), svg);
    console.log(`Generated icon-${size}x${size}.svg`);
});

console.log('All icons generated!');
