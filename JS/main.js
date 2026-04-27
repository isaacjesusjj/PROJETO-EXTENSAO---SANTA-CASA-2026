document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('.close-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu a');

  function openMenu() {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.classList.add('active');
    menuButton.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeButton) closeButton.focus();
  }

  function closeMenu() {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (menuButton) menuButton.addEventListener('click', openMenu);
  if (closeButton) closeButton.addEventListener('click', closeMenu);
  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

  if (mobileMenu) {
    mobileMenu.addEventListener('click', (event) => {
      if (event.target === mobileMenu) closeMenu();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;

      tabButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      tabPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === target);
      });
    });
  });

  const contactForm = document.querySelector('#contact-form');
  const feedback = document.querySelector('.form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const nome = String(formData.get('nome') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const telefone = String(formData.get('telefone') || '').trim();
      const assunto = String(formData.get('assunto') || '').trim();
      const mensagem = String(formData.get('mensagem') || '').trim();

      if (!nome || !email || !assunto || !mensagem) {
        if (feedback) feedback.textContent = 'Preencha os campos obrigatórios antes de enviar.';
        return;
      }

      const texto = `Olá, Rede Liga do Bem! Meu nome é ${nome}.\nE-mail: ${email}\nTelefone: ${telefone || 'Não informado'}\nAssunto: ${assunto}\nMensagem: ${mensagem}`;
      const url = `https://wa.me/5511980485370?text=${encodeURIComponent(texto)}`;

      if (feedback) feedback.textContent = 'Abrindo WhatsApp com sua mensagem pronta.';
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
});
