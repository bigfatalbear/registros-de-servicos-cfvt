// Esqueleto do frontend PWA.
// Nenhum segredo ou chave de API deve ser inserido aqui.
// Toda comunicação com o backend passa por endpoints das Cloud Functions.

const API_BASE = ''; // Preenchido em tempo de execução via configuração separada (não commitada)

document.querySelectorAll('nav button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view').forEach((v) => v.classList.replace('active', 'hidden'));
    document.querySelectorAll('nav button').forEach((b) => b.classList.remove('active'));
    const view = document.getElementById(btn.dataset.view);
    if (view) view.classList.replace('hidden', 'active');
    btn.classList.add('active');
  });
});
