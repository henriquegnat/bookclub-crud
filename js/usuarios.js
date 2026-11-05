// CRUD de Usuários: front-end -> PHP -> MySQL.
const base = '../php/usuarios/';
const corpo = document.getElementById('lista_usuarios');
const campo = id => document.getElementById(id);
let selecionado = null;

async function requisitar(arquivo, dados = null) {
    const opcoes = dados ? {method:'POST', body:dados} : {};
    const resposta = await fetch(base + arquivo, opcoes);
    const json = await resposta.json();
    if (json.status !== 'ok') throw new Error(json.mensagem);
    return json;
}
function formulario() {
    const dados = new FormData();
    for (const id of ['nome','email','meta_leitura']) dados.append(id,campo(id).value.trim());
    return dados;
}
function limpar() {
    for (const id of ['nome','email','meta_leitura']) campo(id).value='';
    selecionado=null;
    campo('alterar').replaceChildren();
    campo('btn_adicionar').disabled=false;
}
async function listar() {
    try {
        const resultado = await requisitar('usuario_get.php');
        corpo.replaceChildren();
        for (const usuario of resultado.data) {
            const linha=document.createElement('tr');
            for (const chave of ['id_usuario','nome','email','meta_leitura']) {
                const celula=document.createElement('td');
                celula.textContent=usuario[chave];
                linha.appendChild(celula);
            }
            const acoes=document.createElement('td');
            const editar=document.createElement('button');
            editar.textContent='Carregar'; editar.className='btn btn-secondary btn-sm me-2';
            editar.addEventListener('click',()=>carregar(usuario));
            const apagar=document.createElement('button');
            apagar.textContent='Excluir'; apagar.className='btn btn-danger btn-sm';
            apagar.addEventListener('click',()=>excluir(usuario.id_usuario));
            acoes.append(editar,apagar); linha.appendChild(acoes); corpo.appendChild(linha);
        }
    } catch (erro) { alert('Erro ao listar: '+erro.message); }
}
function carregar(usuario) {
    selecionado=usuario.id_usuario;
    for (const chave of ['nome','email','meta_leitura']) campo(chave).value=usuario[chave];
    campo('btn_adicionar').disabled=true;
    const botao=document.createElement('button');
    botao.textContent='Salvar alteração';botao.className='btn btn-warning me-2';
    botao.addEventListener('click',alterar);
    const cancelar=document.createElement('button');
    cancelar.textContent='Cancelar';cancelar.className='btn btn-outline-secondary';
    cancelar.addEventListener('click',limpar);
    campo('alterar').replaceChildren(botao,cancelar);
}
async function alterar() {
    if (selecionado===null) return;
    const dados=formulario();dados.append('id_usuario',selecionado);
    try { const r=await requisitar('usuario_alterar.php',dados); alert(r.mensagem);limpar();await listar(); }
    catch(erro){alert(erro.message);}
}
async function excluir(id) {
    if (!confirm('Deseja realmente excluir este leitor?')) return;
    const dados=new FormData();dados.append('id_usuario',id);
    try { const r=await requisitar('usuario_excluir.php',dados);alert(r.mensagem);limpar();await listar(); }
    catch(erro){alert(erro.message);}
}
campo('btn_adicionar').addEventListener('click',async()=>{
    try { const r=await requisitar('usuario_novo.php',formulario());alert(r.mensagem);limpar();await listar(); }
    catch(erro){alert(erro.message);}
});
listar();
