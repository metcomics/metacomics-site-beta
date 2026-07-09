/* =========================================
   1. NAVEGAÇÃO DO FOOTER
   ========================================= */
function irParaWebcomics() { window.location.href = "webcomics.html"; }
function irParaTutoriais() { window.location.href = "tutoriais.html"; }
function irParaComunidade() { window.location.href = "comunidade.html"; }

/* =========================================
   2. MODAIS GLOBAIS
   ========================================= */
window.openModal = function(htmlContent) {
    const modalOverlayG = document.getElementById('global-modal-overlay');
    const modalContentG = document.getElementById('global-modal-content');
    const modalBodyG = document.getElementById('global-modal-body');

    if(!modalBodyG) return;
    modalBodyG.innerHTML = htmlContent;
    modalOverlayG.classList.remove('hidden');
    void modalOverlayG.offsetWidth; 
    modalOverlayG.classList.remove('opacity-0');
    modalContentG.classList.remove('scale-95');
    modalContentG.classList.add('scale-100');
    document.body.style.overflow = 'hidden'; 
    if(typeof lucide !== 'undefined') lucide.createIcons(); 
}

window.closeModal = function() {
    const modalOverlayG = document.getElementById('global-modal-overlay');
    const modalContentG = document.getElementById('global-modal-content');
    const modalBodyG = document.getElementById('global-modal-body');

    if(!modalOverlayG) return;
    modalOverlayG.classList.add('opacity-0');
    modalContentG.classList.remove('scale-100');
    modalContentG.classList.add('scale-95');
    setTimeout(() => {
        modalOverlayG.classList.add('hidden');
        modalBodyG.innerHTML = '';
    }, 300); 
    document.body.style.overflow = ''; 
}

window.openFanartModal = function(imgSrc, title, author) {
    const html = `
        <div class="flex flex-col items-center text-center">
            <h3 class="text-5xl font-bangers mb-2 text-[var(--comic-black)] uppercase">${title}</h3>
            <p class="text-xl text-gray-600 mb-6 font-bold">Arte enviada por: <span class="text-[var(--comic-red)]">${author}</span></p>
            <div class="relative inline-block border-8 border-black shadow-[10px_10px_0_0_var(--comic-yellow)]">
                <img src="${imgSrc}" alt="${title}" class="w-full max-w-2xl max-h-[60vh] object-contain">
            </div>
        </div>
    `;
    openModal(html);
}

window.openNewsModal = function(imgSrc, tag, date, title, text) {
    const html = `
        <div class="flex flex-col">
            <div class="mb-8 border-b-4 border-black pb-8">
                <div class="relative w-full h-64 md:h-96 border-4 border-black mb-6 shadow-[10px_10px_0_0_var(--comic-blue)] overflow-hidden">
                    <img src="${imgSrc}" alt="${title}" class="w-full h-full object-cover">
                </div>
                <div class="flex gap-4 mb-4 items-center">
                    <span class="bg-[var(--comic-red)] text-white text-sm font-bold px-3 py-1 brutal-border uppercase">${tag}</span>
                    <span class="text-gray-600 font-bold text-lg">${date}</span>
                </div>
                <h2 class="text-4xl md:text-6xl font-bangers text-[var(--comic-black)] leading-tight uppercase">${title}</h2>
            </div>
            <div class="text-xl leading-relaxed text-gray-800 space-y-6 font-medium"><p>${text}</p></div>
        </div>
    `;
    openModal(html);
}

window.openTutorialModal = function(category, time, title, contentHtml, bgClass) {
    const html = `
        <div class="flex flex-col">
            <div class="mb-8 border-b-4 border-black pb-8">
                <div class="${bgClass} relative w-full h-48 md:h-64 border-4 border-black mb-6 shadow-[10px_10px_0_0_var(--comic-black)] flex items-center justify-center overflow-hidden">
                    <i data-lucide="terminal" class="text-white opacity-50 w-32 h-32 transform rotate-12 absolute -right-4 -bottom-4"></i>
                    <h2 class="text-white font-bangers text-5xl md:text-7xl drop-shadow-[4px_4px_0_var(--comic-black)] z-10 text-center px-4">LABORATÓRIO</h2>
                </div>
                <div class="flex gap-4 mb-4 items-center">
                    <span class="bg-[var(--comic-black)] text-white text-sm font-bold px-3 py-1 brutal-border uppercase">${category}</span>
                    <span class="text-gray-600 font-bold text-lg flex items-center gap-1"><i data-lucide="clock" class="w-5 h-5"></i> ${time}</span>
                </div>
                <h2 class="text-4xl md:text-6xl font-bangers text-[var(--comic-black)] leading-tight uppercase">${title}</h2>
            </div>
            <div class="text-xl leading-relaxed text-gray-800 space-y-6 font-medium">${contentHtml}</div>
        </div>
    `;
    openModal(html);
}

/* =========================================
   3. FUNÇÕES DE RENDERIZAÇÃO DE CONTEÚDO
   ========================================= */

// --- Renderizar HQs ---
window.renderComics = function(filter = 'Todos') {
    const grid = document.getElementById('comics-grid');
    if(!grid || typeof comicsData === 'undefined') return;
    
    grid.innerHTML = ''; 
    const filtered = filter === 'Todos' ? comicsData : comicsData.filter(c => c.category === filter);
    
    if(filtered.length === 0) {
        grid.innerHTML = `<p class="text-2xl font-bold p-8 bg-white brutal-border col-span-full text-center">Nenhuma HQ encontrada :(</p>`;
        return;
    }

    filtered.forEach(comic => {
        const card = document.createElement('div');
        card.className = 'comic-card-interactive flex flex-col h-full';
        
        const imageSource = comic.coverImage ? comic.coverImage : `https://via.placeholder.com/400x500/${comic.color}/ffffff?text=${comic.title.replace(/ /g,'+')}`;

        card.innerHTML = `
            <div class="relative overflow-hidden border-b-4 border-black group/image flex-1">
                <span class="absolute top-3 left-3 bg-white px-3 py-1 text-sm font-bangers border-2 border-black z-20 uppercase tracking-widest shadow-[2px_2px_0_#000]">${comic.category}</span>
                <div class="action-bubble">${comic.action}</div>
                <img src="${imageSource}" class="w-full h-[320px] object-cover transition-transform duration-700 group-hover/image:scale-110 group-hover/image:rotate-1" alt="Capa de ${comic.title}">
                <div class="comic-synopsis-overlay">
                    <h4 class="text-3xl font-bangers text-[var(--comic-yellow)] mb-2">Sinopse</h4>
                    <p class="text-sm leading-relaxed mb-4">${comic.synopsis}</p>
                    <a href="${comic.link || '#'}" class="w-full inline-block text-center bg-white text-black font-bangers text-xl py-2 brutal-border hover:bg-[var(--comic-red)] hover:text-white transition-colors">Começar Leitura</a>
                </div>
            </div>
            <div class="p-5 bg-white relative z-10 flex-shrink-0">
                <h3 class="text-4xl leading-none mb-2 text-[var(--comic-black)] truncate">${comic.title}</h3>
                <p class="text-gray-500 text-sm">Escrito por: <span class="text-black font-bold">${comic.author}</span></p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- Renderizar Tutoriais ---
window.renderTutoriais = function() {
    const list = document.getElementById('tutoriais-list');
    if(!list || typeof tutoriaisData === 'undefined') {
        if(list) list.innerHTML = `<p class="text-xl font-bold p-6 bg-white brutal-border text-center">Arquivo de dados não encontrado.</p>`;
        return;
    }

    list.innerHTML = ''; 
    tutoriaisData.forEach(tutorial => {
        const card = document.createElement('div');
        card.className = "bg-white brutal-border brutal-shadow flex flex-col sm:flex-row overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform";
        card.onclick = () => openTutorialModal(tutorial.category, tutorial.time, tutorial.title, tutorial.content, tutorial.bgClass);

        card.innerHTML = `
            <div class="w-full sm:w-2/5 relative border-b-4 sm:border-b-0 sm:border-r-4 border-black flex items-center justify-center p-8 ${tutorial.bgClass}">
                <i data-lucide="play-circle" class="text-white w-16 h-16 group-hover:scale-125 transition-transform duration-300"></i>
                <div class="absolute top-2 left-2 text-xs font-bold px-2 py-1 brutal-border uppercase ${tutorial.tagClass}">${tutorial.category}</div>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-center">
                <h4 class="text-3xl mb-2 transition-colors ${tutorial.hoverTextClass}">${tutorial.title}</h4>
                <p class="text-sm text-gray-600 mb-4">${tutorial.description}</p>
                <span class="text-[var(--comic-black)] font-bold text-sm flex items-center gap-1"><i data-lucide="clock" class="w-4 h-4"></i> ${tutorial.time} de leitura</span>
            </div>
        `;
        list.appendChild(card);
    });

    if(typeof lucide !== 'undefined') lucide.createIcons();
};

// --- Renderizar Notícias ---
window.renderNoticias = function() {
    const container = document.getElementById('noticias-container');
    if(!container || typeof noticiasData === 'undefined') {
        if(container) container.innerHTML = `<p class="text-xl font-bold p-6 bg-white brutal-border text-center">Arquivo noticias-data.js não encontrado!</p>`;
        return;
    }

    container.innerHTML = '';

    const destaque = noticiasData.find(n => n.isDestaque) || noticiasData[0];
    const outras = noticiasData.filter(n => n.id !== destaque.id);

    const gridDiv = document.createElement('div');
    gridDiv.className = 'grid grid-cols-1 md:grid-cols-2 gap-10';

    const destaqueHTML = `
        <article onclick="openNewsModal('${destaque.imageFull}', '${destaque.category}', '${destaque.date}', '${destaque.title}', '${destaque.content.replace(/'/g, "\\'")}')" class="bg-white brutal-border brutal-shadow flex flex-col group cursor-pointer md:col-span-2 lg:col-span-1">
            <div class="h-64 bg-black overflow-hidden border-b-4 border-black">
                <img src="${destaque.imageThumb || destaque.imageFull}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="${destaque.title}">
            </div>
            <div class="p-8 flex-1 flex flex-col">
                <div class="flex gap-2 mb-4">
                    <span class="bg-[var(--comic-red)] text-white text-xs font-bold px-2 py-1 brutal-border uppercase">${destaque.category}</span>
                    <span class="text-sm text-gray-500 pt-1 font-bold">${destaque.date}</span>
                </div>
                <h3 class="text-5xl mb-4 group-hover:text-[var(--comic-red)] transition-colors font-bangers">${destaque.title}</h3>
                <p class="text-lg text-gray-700 mb-6 leading-relaxed font-medium">${destaque.excerpt}</p>
                <button class="mt-auto self-start border-b-4 border-black text-xl font-bangers hover:text-[var(--comic-red)] hover:border-[var(--comic-red)] transition-colors">Ler Matéria Completa >></button>
            </div>
        </article>
    `;

    let outrasHTML = `<div class="flex flex-col gap-6">`;
    outras.forEach(noticia => {
        if (noticia.category === 'Podcast') {
            outrasHTML += `
                <article onclick="openNewsModal('${noticia.imageFull}', '${noticia.category}', '${noticia.date}', '${noticia.title}', '${noticia.content.replace(/'/g, "\\'")}')" class="bg-[var(--comic-blue)] text-black p-6 brutal-border brutal-shadow flex flex-col sm:flex-row gap-6 group cursor-pointer relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 opacity-20"><i data-lucide="radio" width="120" height="120"></i></div>
                    <div class="flex-1 z-10">
                        <span class="bg-white text-black text-xs font-bold px-2 py-1 brutal-border uppercase inline-block mb-3">${noticia.category}</span>
                        <h3 class="text-3xl mb-2 text-black font-bangers">${noticia.title}</h3>
                        <p class="text-sm text-black/80 mb-4 font-medium">${noticia.excerpt}</p>
                        <button class="bg-black text-white px-4 py-2 font-bangers text-xl brutal-border hover:bg-white hover:text-black transition-colors">Ver Detalhes</button>
                    </div>
                </article>
            `;
        } else {
            outrasHTML += `
                <article onclick="openNewsModal('${noticia.imageFull}', '${noticia.category}', '${noticia.date}', '${noticia.title}', '${noticia.content.replace(/'/g, "\\'")}')" class="bg-white p-6 brutal-border brutal-shadow flex flex-col sm:flex-row gap-6 group cursor-pointer">
                    <img src="${noticia.imageThumb || noticia.imageFull}" class="w-full sm:w-32 h-32 object-cover border-2 border-black" alt="${noticia.title}">
                    <div class="flex-1">
                        <span class="text-xs text-gray-500 block mb-2 font-bold">${noticia.date}</span>
                        <h3 class="text-3xl mb-2 group-hover:text-[var(--comic-blue)] transition-colors font-bangers">${noticia.title}</h3>
                        <p class="text-sm text-gray-600 font-medium">${noticia.excerpt}</p>
                    </div>
                </article>
            `;
        }
    });
    outrasHTML += `</div>`;

    gridDiv.innerHTML = destaqueHTML + outrasHTML;
    container.appendChild(gridDiv);

    if(typeof lucide !== 'undefined') lucide.createIcons();
};

/* =========================================
   3. FUNÇÕES DE RENDERIZAÇÃO DE CONTEÚDO (COMUNIDADE)
   ========================================= */

// --- Renderizar Fanarts (Comunidade) com Estilização Polaroid, Animação e CTA ---
window.renderFanarts = function() {
    const container = document.getElementById('fanarts-grid');
    // Só executa se estiver na página da comunidade e o dado existir
    if(!container || typeof fanartsData === 'undefined') {
        if(container) container.innerHTML = `<p class="text-xl font-bold p-6 bg-white brutal-border text-center">Arquivo comunidade-data.js não encontrado!</p>`;
        return;
    }

    container.innerHTML = ''; 

    // Lista de rotações sutis para dar o visual Polaroid espalhado
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2'];

    // 1. Renderiza as Fanarts Reais
    fanartsData.forEach((art, index) => {
        const card = document.createElement('div');
        // Adiciona a rotação com base no índice (cria um loop)
        const rotationClass = rotations[index % rotations.length];
        
        // Estilização do card como Polaroid (fundo branco, padding, sombra)
        // MODIFICAÇÃO: Mudamos 'transition-transform' para 'transition-all' e adicionamos 'hover:-translate-y-2'
        card.className = `bg-white brutal-border brutal-shadow transform ${rotationClass} p-3 transition-all duration-300 cursor-pointer flex flex-col group/polaroid hover:-translate-y-2`; // <-- AQUI ESTÁ A MUDANÇA!
        
        // Chama a função do Modal que já existe no seu script!
        card.onclick = () => openFanartModal(art.image, art.title, art.author);

        card.innerHTML = `
            <div class="polaroid-img-container">
                <div class="absolute inset-0 bg-black/10 group-hover/polaroid:bg-transparent transition-colors z-10"></div>
                <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover group-hover/polaroid:scale-105 transition-transform duration-500">
            </div>
            <div class="pt-4 pb-2 px-1 flex-1 flex flex-col justify-end">
                <h3 class="text-2xl font-bangers leading-none text-[var(--comic-black)] group-hover/polaroid:text-[var(--comic-red)] transition-colors line-clamp-1">${art.title}</h3>
                <p class="text-gray-600 font-bold text-xs mt-1">Por: <span class="text-black">${art.author}</span></p>
            </div>
        `;
        container.appendChild(card);
    });

    // 2. ADICIONA O CARD ESPECIAL "SUA ARTE AQUI" NO FINAL (Exatamente como na imagem)
    const ctaCard = document.createElement('div');
    // Adiciona uma rotação única para ele
    // MODIFICAÇÃO: Certifique-se de que ele também use 'transition-all' e 'hover:-translate-y-2'
    ctaCard.className = `bg-[var(--comic-yellow)] brutal-border brutal-shadow transform rotate-2 p-8 transition-all duration-300 flex flex-col justify-center items-center text-center min-h-[300px] gap-4 hover:-translate-y-2`; // <-- AQUI ESTÁ A MUDANÇA (Garanta que esteja igual)!
    
    // Constrói o HTML do card especial (Ícone grande, texto, botão)
    ctaCard.innerHTML = `
        <i data-lucide="image-plus" class="text-black w-24 h-24 mb-4"></i>
        <h3 class="text-4xl font-bangers tracking-wider text-black uppercase leading-tight">SUA ARTE AQUI</h3>
        <a href="contato.html" class="bg-white text-black text-2xl font-bangers py-3 px-8 brutal-border brutal-shadow-sm hover:translate-x-1 hover:-translate-y-1 hover:bg-black hover:text-white transition-all uppercase whitespace-nowrap">
            ENVIAR AGORA
        </a>
    `;
    container.appendChild(ctaCard);

    // Reinicia os ícones Lucide para o novo card
    if(typeof lucide !== 'undefined') lucide.createIcons();
};


/* =========================================
   4. INICIALIZAÇÃO AO CARREGAR A PÁGINA
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // Iniciar ícones
    if(typeof lucide !== 'undefined') lucide.createIcons();

    // Lógica do Menu Mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');

    function openSidebar() {
        if(mobileSidebar) mobileSidebar.classList.remove('-translate-x-full');
        if(mobileOverlay) {
            mobileOverlay.classList.remove('hidden');
            setTimeout(() => { mobileOverlay.classList.remove('opacity-0'); }, 10);
        }
        document.body.style.overflow = 'hidden'; 
    }

    function closeSidebar() {
        if(mobileSidebar) mobileSidebar.classList.add('-translate-x-full');
        if(mobileOverlay) {
            mobileOverlay.classList.add('opacity-0');
            setTimeout(() => { mobileOverlay.classList.add('hidden'); }, 300); 
        }
        document.body.style.overflow = '';
    }

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeSidebar);
    if(mobileOverlay) mobileOverlay.addEventListener('click', closeSidebar);

    // Fechar Modal Clicando Fora
    const modalOverlayG = document.getElementById('global-modal-overlay');
    if(modalOverlayG) {
        modalOverlayG.addEventListener('click', (e) => {
            if(e.target === modalOverlayG) closeModal();
        });
    }

    // DISPARAR AS FUNÇÕES DE ACORDO COM A PÁGINA ATUAL
    if(document.getElementById('comics-grid')) {
        renderComics('Todos');
        
        // Ativar filtros das Webcomics
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => { 
                    b.classList.remove('bg-[var(--comic-yellow)]'); 
                    b.classList.add('bg-white'); 
                });
                e.currentTarget.classList.remove('bg-white'); 
                e.currentTarget.classList.add('bg-[var(--comic-yellow)]');
                renderComics(e.currentTarget.getAttribute('data-filter'));
            });
        });
    }

    if(document.getElementById('tutoriais-list')) {
        renderTutoriais();
    }

    if(document.getElementById('noticias-container')) {
        renderNoticias();
    }
    if(document.getElementById('fanarts-grid')) {
        renderFanarts();
    }
});