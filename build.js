const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Function to generate a random nonce
function generateNonce() {
    return crypto.randomUUID();
}

const nonce = generateNonce();

// Read the manifest file
const manifestPath = path.join(__dirname, 'manifest.json');
let manifest = fs.readFileSync(manifestPath, 'utf8');

// Replace the placeholder with the actual nonce
manifest = manifest.replace('PLACEHOLDER_NONCE', nonce);

// Write the updated manifest back to the file
fs.writeFileSync(manifestPath, manifest, 'utf8');
