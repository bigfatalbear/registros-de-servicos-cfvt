const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage();

// Middleware de autenticação
async function requireAuth(req, res) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: 'Não autenticado' });
    return null;
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded.uid;
  } catch (e) {
    res.status(401).json({ error: 'Token inválido' });
    return null;
  }
}

// Health check
exports.health = onRequest((req, res) => {
  res.json({ status: 'ok', service: 'cfvt-functions' });
});

// Clientes
exports.clientes = onRequest(async (req, res) => {
  const uid = await requireAuth(req, res);
  if (!uid) return;
  const col = db.collection('clientes');

  if (req.method === 'GET') {
    const snap = await col.where('tecnicoId', '==', uid).get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    return;
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const doc = await col.add({ ...body, tecnicoId: uid, criadoEm: admin.firestore.FieldValue.serverTimestamp() });
    res.status(201).json({ id: doc.id });
    return;
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body || {};
    if (!id) { res.status(400).json({ error: 'id obrigatório' }); return; }
    await col.doc(id).update({ ...data, atualizadoEm: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ ok: true });
    return;
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {};
    if (!id) { res.status(400).json({ error: 'id obrigatório' }); return; }
    await col.doc(id).delete();
    res.json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Método não permitido' });
});

// Orçamentos
exports.orcamentos = onRequest(async (req, res) => {
  const uid = await requireAuth(req, res);
  if (!uid) return;
  const col = db.collection('orcamentos');

  if (req.method === 'GET') {
    const snap = await col.where('tecnicoId', '==', uid).get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    return;
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const doc = await col.add({ ...body, tecnicoId: uid, status: 'pendente', criadoEm: admin.firestore.FieldValue.serverTimestamp() });
    res.status(201).json({ id: doc.id });
    return;
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body || {};
    if (!id) { res.status(400).json({ error: 'id obrigatório' }); return; }
    await col.doc(id).update({ ...data, atualizadoEm: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Método não permitido' });
});

// Ordens de Serviço
exports.ordensServico = onRequest(async (req, res) => {
  const uid = await requireAuth(req, res);
  if (!uid) return;
  const col = db.collection('ordensServico');

  if (req.method === 'GET') {
    const snap = await col.where('tecnicoId', '==', uid).get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    return;
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const doc = await col.add({ ...body, tecnicoId: uid, status: 'agendado', criadoEm: admin.firestore.FieldValue.serverTimestamp() });
    res.status(201).json({ id: doc.id });
    return;
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body || {};
    if (!id) { res.status(400).json({ error: 'id obrigatório' }); return; }
    await col.doc(id).update({ ...data, atualizadoEm: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Método não permitido' });
});

// Peças / Estoque
exports.pecas = onRequest(async (req, res) => {
  const uid = await requireAuth(req, res);
  if (!uid) return;
  const col = db.collection('pecas');

  if (req.method === 'GET') {
    const snap = await col.where('tecnicoId', '==', uid).get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    return;
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const doc = await col.add({ ...body, tecnicoId: uid, criadoEm: admin.firestore.FieldValue.serverTimestamp() });
    res.status(201).json({ id: doc.id });
    return;
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body || {};
    if (!id) { res.status(400).json({ error: 'id obrigatório' }); return; }
    await col.doc(id).update({ ...data, atualizadoEm: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ ok: true });
    return;
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {};
    if (!id) { res.status(400).json({ error: 'id obrigatório' }); return; }
    await col.doc(id).delete();
    res.json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Método não permitido' });
});

// Pagamentos
exports.pagamentos = onRequest(async (req, res) => {
  const uid = await requireAuth(req, res);
  if (!uid) return;
  const col = db.collection('pagamentos');

  if (req.method === 'GET') {
    const snap = await col.where('tecnicoId', '==', uid).get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    return;
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const doc = await col.add({ ...body, tecnicoId: uid, status: 'pendente', criadoEm: admin.firestore.FieldValue.serverTimestamp() });
    res.status(201).json({ id: doc.id });
    return;
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body || {};
    if (!id) { res.status(400).json({ error: 'id obrigatório' }); return; }
    await col.doc(id).update({ ...data, atualizadoEm: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Método não permitido' });
});

// Upload de foto/assinatura (gera URL assinada para upload direto ao Storage)
exports.uploadUrl = onRequest(async (req, res) => {
  const uid = await requireAuth(req, res);
  if (!uid) return;
  const { path } = req.body || {};
  if (!path) { res.status(400).json({ error: 'path obrigatório' }); return; }
  const bucket = storage.bucket();
  const file = bucket.file(`${uid}/${path}`);
  const [url] = await file.getSignedUrl({
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000,
    contentType: req.body.contentType || 'application/octet-stream',
  });
  res.json({ url, path: `${uid}/${path}` });
});
