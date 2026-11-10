const functions = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// Exemplo de endpoint protegido. Implementar os demais conforme o escopo.
exports.health = functions.onRequest((req, res) => {
  res.json({ status: 'ok', service: 'cfvt-functions' });
});
