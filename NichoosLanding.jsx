import React, { useEffect, useRef, useState } from 'react';

const styles = `
  @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap');

  :root {
    --bg: #080808;
    --card: #0F0F0F;
    --card-hover: #141414;
    --primary: #8B5CF6;
    --primary-hover: #A78BFA;
    --cta: #00FF87;
    --cta-hover: #00C96A;
    --border: rgba(139, 92, 246, 0.2);
    --border-hover: rgba(139, 92, 246, 0.5);
    --text: #F5F5F5;
    --muted: #888;
    --dimmed: #555;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: 'Satoshi';
  }

  button,
  input {
    font-family: 'Satoshi';
  }

  .nichoos-page {
    min-height: 100vh;
    background:
      radial-gradient(circle at 20% 0%, rgba(139, 92, 246, 0.10), transparent 30%),
      radial-gradient(circle at 80% 10%, rgba(0, 255, 135, 0.05), transparent 26%),
      #080808;
    color: var(--text);
    font-family: 'Satoshi';
    overflow-x: hidden;
    position: relative;
  }

  .nichoos-page::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.18;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
    mix-blend-mode: screen;
  }

  .glow-orb {
    position: fixed;
    width: 320px;
    height: 320px;
    border-radius: 999px;
    pointer-events: none;
    filter: blur(90px);
    opacity: 0.24;
    z-index: 0;
  }

  .glow-orb.one {
    top: -120px;
    left: -90px;
    background: var(--primary);
  }

  .glow-orb.two {
    right: -130px;
    bottom: 10%;
    background: rgba(0, 255, 135, 0.65);
  }

  .content-layer {
    position: relative;
    z-index: 1;
  }

  .urgency-bar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: linear-gradient(90deg, #160a2f, #2d145f 48%, #160a2f);
    border-bottom: 1px solid rgba(139, 92, 246, 0.3);
    padding: 10px 18px;
  }

  .urgency-inner {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    text-align: center;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
  }

  .urgency-button,
  .primary-button,
  .submit-button {
    border: 0;
    cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
  }

  .urgency-button {
    background: var(--primary);
    color: #fff;
    border-radius: 999px;
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
  }

  .urgency-button:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }

  .section {
    max-width: 1180px;
    margin: 0 auto;
    padding: 72px 20px;
  }

  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 700ms ease, transform 700ms ease;
    transition-delay: var(--delay, 0ms);
  }

  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero {
    min-height: calc(100vh - 52px);
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 48px;
    padding-top: 56px;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--border);
    background: rgba(139, 92, 246, 0.10);
    color: #d8ccff;
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .hero h1,
  .stores-copy h2,
  .section-title,
  .final-cta h2 {
    margin: 0;
    letter-spacing: -0.03em;
    line-height: 0.96;
    font-weight: 900;
  }

  .hero h1 {
    max-width: 680px;
    margin-top: 18px;
    font-size: clamp(36px, 5vw, 62px);
  }

  .purple {
    color: var(--primary);
  }

  .hero-subtitle {
    max-width: 570px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 17px;
    line-height: 1.65;
  }

  .primary-button {
    margin-top: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 56px;
    padding: 0 26px;
    border-radius: 12px;
    background: var(--cta);
    color: #04130a;
    font-size: 15px;
    font-weight: 900;
    box-shadow: 0 0 28px rgba(0, 255, 135, 0.18);
  }

  .primary-button:hover,
  .submit-button:hover {
    background: var(--cta-hover);
    transform: translateY(-2px);
    box-shadow: 0 0 36px rgba(0, 255, 135, 0.22);
  }

  .hero-visual,
  .stores-visual {
    display: flex;
    justify-content: center;
  }

  .phone {
    width: min(100%, 310px);
    height: 630px;
    border: 2px solid rgba(139, 92, 246, 0.55);
    border-radius: 40px;
    padding: 14px;
    background: linear-gradient(145deg, #111, #060606);
    box-shadow: 0 0 0 8px rgba(139, 92, 246, 0.04), 0 0 70px rgba(139, 92, 246, 0.36);
    position: relative;
  }

  .phone::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 50%;
    width: 94px;
    height: 25px;
    transform: translateX(-50%);
    background: #050505;
    border-radius: 0 0 18px 18px;
    z-index: 2;
  }

  .phone-screen {
    height: 100%;
    border-radius: 30px;
    overflow: hidden;
    background: linear-gradient(180deg, #15111f, #090909 42%, #0b0b0b);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 42px 18px 18px;
  }

  .app-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .app-icon {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--primary), #4c1d95);
    display: grid;
    place-items: center;
    font-weight: 900;
  }

  .app-name {
    font-weight: 900;
    font-size: 15px;
  }

  .app-caption {
    color: var(--muted);
    font-size: 11px;
    margin-top: 2px;
  }

  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--cta);
    box-shadow: 0 0 16px rgba(0, 255, 135, 0.7);
  }

  .phone-card {
    margin-top: 20px;
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 16px;
    background: rgba(15, 15, 15, 0.82);
  }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 14px;
  }

  .metric {
    border-radius: 14px;
    background: #111;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .metric strong {
    display: block;
    font-size: 18px;
  }

  .metric span,
  .mini-label {
    color: var(--muted);
    font-size: 11px;
  }

  .course-list {
    display: grid;
    gap: 10px;
    margin-top: 18px;
  }

  .course-row {
    display: grid;
    grid-template-columns: 42px 1fr auto;
    align-items: center;
    gap: 10px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.035);
    padding: 10px;
  }

  .course-thumb {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(0, 255, 135, 0.22));
  }

  .progress {
    height: 6px;
    width: 46px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }

  .progress span {
    display: block;
    height: 100%;
    width: 72%;
    background: var(--cta);
  }

  .store-badges {
    display: flex;
    gap: 8px;
    margin-top: 20px;
  }

  .store-badge {
    flex: 1;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 9px;
    background: #0b0b0b;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    text-align: center;
  }

  .logo-wall {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 36px;
    padding-bottom: 42px;
  }

  .logo-label,
  .section-kicker {
    color: var(--dimmed);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 10px;
    font-weight: 900;
    text-align: center;
  }

  .logos {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    align-items: center;
  }

  .logo-item {
    color: #333;
    font-size: 16px;
    font-weight: 900;
    text-align: center;
    transition: color 180ms ease;
  }

  .logo-item:hover {
    color: #555;
  }

  .section-heading {
    max-width: 720px;
    margin: 0 auto 34px;
    text-align: center;
  }

  .section-title {
    margin-top: 12px;
    font-size: clamp(28px, 3.4vw, 46px);
  }

  .features-grid,
  .testimonials-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .feature-card,
  .testimonial-card,
  .integration-pill {
    border: 1px solid var(--border);
    background: var(--card);
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
  }

  .feature-card:hover,
  .testimonial-card:hover,
  .integration-pill:hover {
    background: var(--card-hover);
    border-color: var(--border-hover);
    transform: translateY(-2px);
    box-shadow: 0 0 0 1px rgba(139,92,246,0.5), 0 8px 32px rgba(139,92,246,0.08);
  }

  .feature-card {
    border-radius: 12px;
    padding: 24px;
  }

  .feature-icon {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: rgba(139, 92, 246, 0.16);
  }

  .feature-icon svg,
  .badge-button svg {
    width: 20px;
    height: 20px;
    stroke: #fff;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feature-card h3 {
    margin: 18px 0 8px;
    font-size: 15px;
    font-weight: 700;
  }

  .feature-card p,
  .stores-copy p,
  .final-cta p {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.6;
  }

  .stores-block {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 42px;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(8, 8, 8, 0.4));
    padding: 28px;
  }

  .stores-copy h2 {
    margin-top: 18px;
    font-size: clamp(28px, 3vw, 44px);
  }

  .stores-copy p {
    max-width: 530px;
    margin-top: 18px;
    font-size: 16px;
  }

  .badge-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 26px;
  }

  .badge-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    background: #111;
    color: #fff;
    padding: 12px 16px;
    font-weight: 900;
    font-size: 13px;
  }

  .store-listing {
    margin-top: 20px;
    border-radius: 20px;
    padding: 16px;
    background: #f4f4f6;
    color: #111;
  }

  .store-search {
    border-radius: 12px;
    background: #e6e6ea;
    color: #777;
    padding: 10px 12px;
    font-size: 12px;
  }

  .listing-row {
    display: grid;
    grid-template-columns: 58px 1fr;
    gap: 12px;
    margin-top: 18px;
    align-items: center;
  }

  .listing-icon {
    width: 58px;
    height: 58px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--primary), #00c96a);
  }

  .listing-title {
    font-size: 14px;
    font-weight: 900;
  }

  .listing-subtitle {
    color: #666;
    font-size: 11px;
    margin-top: 3px;
  }

  .rating-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 16px;
    color: #555;
    font-size: 11px;
    text-align: center;
  }

  .rating-row strong {
    display: block;
    color: #111;
    font-size: 15px;
  }

  .preview-blocks {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 18px;
  }

  .preview-blocks span {
    height: 118px;
    border-radius: 14px;
    background: linear-gradient(180deg, #15111f, #090909);
  }

  .testimonial-card {
    border-radius: 12px;
    padding: 28px;
  }

  .quote-mark {
    color: var(--primary);
    font-size: 48px;
    line-height: 0.8;
    opacity: 0.3;
  }

  .testimonial-card p {
    margin: 14px 0 24px;
    color: #d8d8d8;
    font-size: 15px;
    font-style: italic;
    line-height: 1.7;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: rgba(139, 92, 246, 0.18);
    color: #e7ddff;
    font-size: 12px;
    font-weight: 900;
  }

  .author-name {
    font-size: 14px;
    font-weight: 900;
  }

  .author-company {
    color: var(--muted);
    font-size: 12px;
    margin-top: 2px;
  }

  .integrations {
    text-align: center;
  }

  .integration-grid {
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  .integration-pill {
    border-radius: 100px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 700;
  }

  .faq-wrap {
    max-width: 820px;
    margin: 0 auto;
  }

  .faq-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 20px 0;
  }

  .faq-question {
    width: 100%;
    border: 0;
    padding: 0;
    background: transparent;
    color: var(--text);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    cursor: pointer;
    text-align: left;
    font-size: 15px;
    font-weight: 700;
  }

  .faq-icon {
    color: var(--primary);
    font-size: 22px;
    line-height: 1;
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 260ms ease, opacity 260ms ease;
    opacity: 0;
  }

  .faq-answer.open {
    max-height: 160px;
    opacity: 1;
  }

  .faq-answer p {
    margin: 0;
    padding-top: 12px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.7;
  }

  .final-cta {
    border: 1px solid var(--border);
    border-radius: 16px;
    background: linear-gradient(135deg, #0d0820, #080808);
    padding: 28px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    box-shadow: 0 0 60px rgba(139, 92, 246, 0.08);
  }

  .final-cta h2 {
    font-size: clamp(26px, 3vw, 42px);
  }

  .final-cta p {
    margin-top: 14px;
    font-size: 15px;
  }

  .lead-fields {
    display: grid;
    gap: 12px;
  }

  .field-label {
    display: grid;
    gap: 8px;
    color: #cfcfcf;
    font-size: 12px;
    font-weight: 700;
  }

  .input-wrap {
    display: flex;
    align-items: center;
    background: #111;
    border: 1px solid var(--border);
    border-radius: 8px;
    transition: border-color 180ms ease, box-shadow 180ms ease;
  }

  .input-wrap:focus-within {
    border-color: var(--border-hover);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.12);
  }

  .prefix {
    padding-left: 16px;
    color: var(--muted);
    font-size: 14px;
  }

  .lead-input {
    width: 100%;
    border: 0;
    outline: none;
    background: transparent;
    color: #fff;
    padding: 14px 16px;
    font-size: 14px;
  }

  .lead-input::placeholder {
    color: #555;
  }

  .submit-button {
    width: 100%;
    border-radius: 10px;
    padding: 18px;
    background: var(--cta);
    color: #04130a;
    font-size: 16px;
    font-weight: 900;
  }

  .footer {
    max-width: 1180px;
    margin: 0 auto;
    border-top: 1px solid var(--border);
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: var(--muted);
  }

  .footer-logo {
    color: #fff;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.04em;
  }

  @media (min-width: 680px) {
    .logos {
      grid-template-columns: repeat(3, 1fr);
    }

    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .final-cta {
      padding: 42px;
    }

    .footer {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  @media (min-width: 960px) {
    .hero,
    .stores-block,
    .final-cta {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .features-grid,
    .testimonials-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .logos {
      grid-template-columns: repeat(6, 1fr);
    }

    .stores-block {
      padding: 52px;
    }
  }

  @media (max-width: 520px) {
    .urgency-inner {
      flex-direction: column;
      gap: 8px;
    }

    .section {
      padding: 56px 18px;
    }

    .phone {
      height: 570px;
    }

    .store-badges,
    .badge-buttons {
      flex-direction: column;
    }
  }
`;

const features = [
  ['App na App Store e Google Play', 'Sua marca publicada nas duas lojas pela Nichoos'],
  ['Área de membros completa', 'Aulas, lives e arquivos dentro do seu app'],
  ['Comunidade integrada', 'Feed, posts e interações entre membros'],
  ['Trilhas de aprendizado', 'Conteúdo sequenciado e organizado por você'],
  ['Gamificação', 'Pontos, medalhas, ranking e recompensas'],
  ['Notificações Push', 'Engaje sua base sem depender de e-mail'],
  ['Monetização recorrente', 'Assinaturas e upsells dentro da plataforma'],
  ['Vitrine estilo Netflix', 'Seus produtos organizados visualmente'],
  ['Relatórios e dados', 'Acesso, engajamento e progresso em tempo real'],
];

const testimonials = [
  {
    quote: 'A Nichoos virou o centro da nossa operação. O app aumentou a retenção dos alunos e deixou a experiência com cara de marca grande.',
    name: 'Mariana Costa',
    company: 'Método Alta Performance',
    initials: 'MC',
  },
  {
    quote: 'Saímos de uma área de membros comum para um app com comunidade, push e gamificação. A percepção de valor mudou imediatamente.',
    name: 'Renato Alves',
    company: 'Comunidade Venda Todo Dia',
    initials: 'RA',
  },
  {
    quote: 'O lançamento na App Store e Google Play foi o diferencial que faltava para vender planos anuais e criar recorrência de verdade.',
    name: 'Bianca Rocha',
    company: 'Studio Creator Pro',
    initials: 'BR',
  },
];

const integrations = ['Hotmart', 'Kiwify', 'ActiveCampaign', 'Stripe', 'Zapier', 'WhatsApp', 'Typeform', 'Pagar.me'];

const faqs = [
  ['Quanto tempo para publicar meu app?', 'Em média, o processo leva de 30 a 60 dias, considerando configuração visual, organização do conteúdo, testes e aprovação nas lojas.'],
  ['Preciso saber programar?', 'Não. A Nichoos cuida da estrutura técnica, publicação e manutenção para que você foque no conteúdo, comunidade e vendas.'],
  ['Posso migrar meus alunos de outra plataforma?', 'Sim. Nosso time orienta a importação de alunos, organização de turmas e comunicação para uma transição simples e segura.'],
  ['Tem limite de alunos?', 'Os planos são desenhados para crescer com sua operação. A estrutura suporta comunidades grandes e pode ser ajustada conforme sua base evolui.'],
  ['Posso personalizar 100% com minha marca?', 'Você personaliza nome, cores, ícones, vitrines, jornadas e experiência visual para que o app pareça uma extensão nativa da sua marca.'],
];

function Icon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
      <path d="M9 12l2 2 4-5" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4l10 8L7 20V4z" />
      <path d="M17 12h3" />
    </svg>
  );
}

function PhoneMockup({ store = false }) {
  return (
    <div className="phone" aria-label={store ? 'Mockup de app publicado na loja' : 'Mockup de app white-label'}>
      <div className="phone-screen">
        {store ? (
          <div className="store-listing">
            <div className="store-search">Buscar na App Store</div>
            <div className="listing-row">
              <div className="listing-icon" />
              <div>
                <div className="listing-title">Nicho Fitness Club</div>
                <div className="listing-subtitle">Cursos, desafios e comunidade</div>
              </div>
            </div>
            <div className="rating-row">
              <span><strong>4.8★</strong>Avaliação</span>
              <span><strong>12+</strong>Idade</span>
              <span><strong>#8</strong>Educação</span>
            </div>
            <div className="preview-blocks">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : (
          <>
            <div className="app-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="app-icon">N</div>
                <div>
                  <div className="app-name">Nicho Pro</div>
                  <div className="app-caption">Comunidade premium</div>
                </div>
              </div>
              <div className="status-dot" />
            </div>
            <div className="phone-card">
              <div className="mini-label">Receita recorrente</div>
              <div style={{ marginTop: 6, fontSize: 28, fontWeight: 900 }}>R$ 84.7k</div>
              <div className="metric-grid">
                <div className="metric"><strong>9.2k</strong><span>alunos</span></div>
                <div className="metric"><strong>83%</strong><span>engaj.</span></div>
              </div>
            </div>
            <div className="course-list">
              {['Trilha de lançamento', 'Comunidade VIP', 'Desafio 21 dias'].map((item) => (
                <div className="course-row" key={item}>
                  <div className="course-thumb" />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 900 }}>{item}</div>
                    <div className="mini-label">Aulas liberadas</div>
                  </div>
                  <div className="progress"><span /></div>
                </div>
              ))}
            </div>
            <div className="store-badges">
              <div className="store-badge">App Store</div>
              <div className="store-badge">Google Play</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function NichoosLanding() {
  const rootRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [lead, setLead] = useState({ name: '', whatsapp: '', email: '', instagram: '' });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const sections = Array.from(root.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -80px 0px' },
    );

    sections.forEach((section, index) => {
      section.style.setProperty('--delay', `${Math.min(index * 90, 360)}ms`);
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const updateLead = (field) => (event) => {
    setLead((current) => ({ ...current, [field]: event.target.value }));
  };

  return (
    <div className="nichoos-page" ref={rootRef}>
      <style>{styles}</style>
      <div className="glow-orb one" />
      <div className="glow-orb two" />
      <div className="content-layer">
        <div className="urgency-bar">
          <div className="urgency-inner">
            <span>🔥 Condições especiais para os primeiros apps publicados este mês</span>
            <button className="urgency-button" type="button">Resgatar Oferta</button>
          </div>
        </div>

        <main>
          <section className="section hero reveal">
            <div>
              <span className="pill">App White-Label</span>
              <h1>Transforme sua audiência em um <span className="purple">app com a sua marca</span></h1>
              <p className="hero-subtitle">Publique seu próprio app na App Store e Google Play. Comunidade, cursos, gamificação e receita recorrente — tudo com o seu branding.</p>
              <button className="primary-button" type="button">Quero meu app agora <span>→</span></button>
            </div>
            <div className="hero-visual">
              <PhoneMockup />
            </div>
          </section>

          <section className="section logo-wall reveal">
            <div className="logo-label">Usado pelos maiores infoprodutores do Brasil</div>
            <div className="logos">
              {['SEBRAE', 'MÉTODO MPS', 'SECA 30', 'FLOW.ERS', 'GRUPO MAESTRIA', 'DIGNUS'].map((logo) => (
                <div className="logo-item" key={logo}>{logo}</div>
              ))}
            </div>
          </section>

          <section className="section reveal">
            <div className="section-heading">
              <div className="section-kicker">Plataforma completa</div>
              <h2 className="section-title">Tudo que um infoprodutor precisa para virar aplicativo</h2>
            </div>
            <div className="features-grid">
              {features.map(([title, description]) => (
                <article className="feature-card" key={title}>
                  <div className="feature-icon"><Icon /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section reveal">
            <div className="stores-block">
              <div className="stores-copy">
                <span className="pill">Aplicativos personalizados</span>
                <h2>Sua marca na <span className="purple">Apple Store e Google Play</span></h2>
                <p>A única plataforma white-label com app nativo publicado nas lojas. Planos a partir de R$ 899/mês.</p>
                <div className="badge-buttons">
                  <div className="badge-button"><BadgeIcon /> Google Play</div>
                  <div className="badge-button"><BadgeIcon /> App Store</div>
                </div>
              </div>
              <div className="stores-visual">
                <PhoneMockup store />
              </div>
            </div>
          </section>

          <section className="section reveal">
            <div className="section-heading">
              <div className="section-kicker">Resultados reais</div>
              <h2 className="section-title">Infoprodutores criando experiências premium</h2>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <div className="quote-mark">“</div>
                  <p>{testimonial.quote}</p>
                  <div className="testimonial-author">
                    <div className="avatar">{testimonial.initials}</div>
                    <div>
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-company">{testimonial.company}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section integrations reveal">
            <h2 className="section-title">Conecta com as ferramentas que você já usa</h2>
            <div className="integration-grid">
              {integrations.map((integration) => (
                <div className="integration-pill" key={integration}>{integration}</div>
              ))}
            </div>
          </section>

          <section className="section reveal">
            <div className="section-heading">
              <div className="section-kicker">FAQ</div>
              <h2 className="section-title">Perguntas frequentes</h2>
            </div>
            <div className="faq-wrap">
              {faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <div className="faq-item" key={question}>
                    <button className="faq-question" type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                      <span>{question}</span>
                      <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                      <p>{answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="section reveal">
            <div className="final-cta">
              <div>
                <span className="pill">Demonstração guiada</span>
                <h2>Veja como a Nichoos funciona para o seu negócio</h2>
                <p>Conte sobre sua operação e receba uma análise personalizada para transformar sua audiência em um app com a sua marca.</p>
              </div>
              <div className="lead-fields">
                <label className="field-label">
                  Nome completo
                  <div className="input-wrap">
                    <input className="lead-input" value={lead.name} onChange={updateLead('name')} placeholder="Seu nome" type="text" />
                  </div>
                </label>
                <label className="field-label">
                  WhatsApp
                  <div className="input-wrap">
                    <span className="prefix">+55</span>
                    <input className="lead-input" value={lead.whatsapp} onChange={updateLead('whatsapp')} placeholder="(11) 99999-9999" type="tel" />
                  </div>
                </label>
                <label className="field-label">
                  E-mail
                  <div className="input-wrap">
                    <input className="lead-input" value={lead.email} onChange={updateLead('email')} placeholder="voce@empresa.com" type="email" />
                  </div>
                </label>
                <label className="field-label">
                  @ do Instagram profissional
                  <div className="input-wrap">
                    <input className="lead-input" value={lead.instagram} onChange={updateLead('instagram')} placeholder="@suaempresa" type="text" />
                  </div>
                </label>
                <button className="submit-button" type="button">Quero ver a Nichoos em ação</button>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-logo">nichoos</div>
          <div>© 2025 Nichoos Tecnologia</div>
        </footer>
      </div>
    </div>
  );
}
