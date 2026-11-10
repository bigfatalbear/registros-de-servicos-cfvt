// REGISTRO DE SERVIÇOS CFTV — Frontend PWA
// Nenhum segredo é armazenado aqui. apiKey do Firebase é pública por design.

const { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, collection, addDoc, getDocs, query, where } = window.__firebase;

const API_BASE = ''; // Preencha com a URL da Cloud Function após deploy

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').catch(() => {});
}

// Navegação
document.querySelectorAll('nav button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view').forEach((v) => v.classList.replace('active', 'hidden'));
    document.querySelectorAll('nav button').forEach((b) => b.classList.remove('active'));
    const view = document.getElementById(btn.dataset.view);
    if (view) view.classList.replace('hidden', 'active');
    btn.classList.add('active');
  });
});

// Auth status
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById('auth-status');
  const area = document.getElementById('auth-area');
  if (user) {
    status.textContent = user.email;
    area.innerHTML = `<button id="btn-logout">Sair</button>`;
    document.getElementById('btn-logout').addEventListener('click', () => signOut(auth));
    carregarDados();
  } else {
    status.textContent = 'Não autenticado';
    area.innerHTML = `
      <input id="email" type="email" placeholder="E-mail">
      <input id="senha" type="password" placeholder="Senha">
      <button id="btn-login">Entrar</button>
      <button id="btn-registrar">Registrar</button>
    `;
    document.getElementById('btn-login').addEventListener('click', () => {
      signInWithEmailAndPassword(auth, document.getElementById('email').value, document.getElementById('senha').value).catch((e) => alert(e.message));
    });
    document.getElementById('btn-registrar').addEventListener('click', () => {
      createUserWithEmailAndPassword(auth, document.getElementById('email').value, document.getElementById('senha').value).catch((e) => alert(e.message));
    });
  }
});

// Helpers de CRUD no Firestore
async function listarColecao(nome, containerId) {
  const user = auth.currentUser;
  if (!user) return;
  const q = query(collection(db, nome), where('tecnicoId', '==', user.uid));
  const snap = await getDocs(q);
  const ul = document.getElementById(containerId);
  ul.innerHTML = '';
  snap.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = JSON.stringify(doc.data());
    ul.appendChild(li);
  });
}

async function adicionarDoc(nome, data) {
  const user = auth.currentUser;
  if (!user) { alert('Faça login primeiro'); return; }
  await addDoc(collection(db, nome), { ...data, tecnicoId: user.uid, criadoEm: new Date() });
}

// Orçamentos
document.getElementById('form-orcamento').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  await adicionarDoc('orcamentos', { cliente: f.cliente.value, valor: parseFloat(f.valor.value), status: 'pendente' });
  f.reset();
  listarColecao('orcamentos', 'lista-orcamentos');
});

// OS
document.getElementById('form-os').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  await adicionarDoc('ordensServico', { cliente: f.cliente.value, status: f.status.value });
  f.reset();
  listarColecao('ordensServico', 'lista-os');
});

// Clientes
document.getElementById('form-cliente').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  await adicionarDoc('clientes', { nome: f.nome.value, telefone: f.telefone.value, endereco: f.endereco.value });
  f.reset();
  listarColecao('clientes', 'lista-clientes');
});

// Peças
document.getElementById('form-peca').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  await adicionarDoc('pecas', { nome: f.nome.value, quantidade: parseInt(f.quantidade.value, 10), numeroSerie: f.numeroSerie.value });
  f.reset();
  listarColecao('pecas', 'lista-pecas');
});

// Pagamentos
document.getElementById('form-pagamento').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  await adicionarDoc('pagamentos', { descricao: f.descricao.value, valor: parseFloat(f.valor.value), status: f.status.value });
  f.reset();
  listarColecao('pagamentos', 'lista-pagamentos');
});

function carregarDados() {
  listarColecao('orcamentos', 'lista-orcamentos');
  listarColecao('ordensServico', 'lista-os');
  listarColecao('clientes', 'lista-clientes');
  listarColecao('pecas', 'lista-pecas');
  listarColecao('pagamentos', 'lista-pagamentos');
}
