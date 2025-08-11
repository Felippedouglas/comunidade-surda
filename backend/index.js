const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

if (!process.env.SERVICE_ACCOUNT_JSON) {
  console.error('FATAL: variável de ambiente SERVICE_ACCOUNT_JSON não definida');
  process.exit(1);
}

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined,
});

const auth = admin.auth();
const db = admin.firestore();

async function verifyFirebaseIdToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Não autenticado' });
  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

app.get('/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.get('/me', verifyFirebaseIdToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const doc = await db.collection('users').doc(uid).get();
    const data = doc.exists ? doc.data() : null;
    res.json({ uid, data });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/create-profile', verifyFirebaseIdToken, async (req, res) => {
  const uid = req.user.uid;
  const { displayName, city } = req.body;
  try {
    await db.collection('users').doc(uid).set({ displayName, city, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
