export function showModal(html){
  const m = document.createElement('div'); m.className='modal'; m.innerHTML = `<div class="card">${html}<div style="margin-top:12px"><button class="btn" onclick="this.closest('.modal').remove()">Fermer</button></div></div>`; document.body.appendChild(m);
}
