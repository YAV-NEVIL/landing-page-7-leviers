import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Compass, 
  Terminal, 
  Calendar, 
  MousePointer, 
  BookOpen, 
  Award, 
  Lock, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Flame 
} from 'lucide-react';
import CheckoutModal from './components/CheckoutModal.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  // États pour la Carte 1 (Mélangeur Diagnostique)
  const [diagnosticCards, setDiagnosticCards] = useState([
    { id: 1, title: "Levier #1 : Certitude vs Scepticisme", status: "Diagnostic Actif", code: "LEV-01", desc: "Désamorce le filtre analytique en injectant une preuve irréfutable immédiate.", color: "border-gold/40 text-gold-bright" },
    { id: 2, title: "Levier #2 : Statut vs Peur du Ridicule", status: "Calibrage Prêt", code: "LEV-02", desc: "Élève l'identité perçue de l'acheteur avant même qu'il ne voie le prix.", color: "border-amber-500/40 text-amber-400" },
    { id: 3, title: "Levier #5 : Identité vs Faux Consensus", status: "Ancrage Établi", code: "LEV-05", desc: "Transforme l'achat en une revendication d'appartenance à un cercle d'initiés.", color: "border-yellow-400/40 text-yellow-300" }
  ]);

  // États pour la Carte 2 (Machine à Écrire Télémétrie)
  const telemetryLogs = [
    "Initialisation du protocole neuro-persuasif...",
    "Détection résistance acheteur : Scepticisme levé à 98.4%",
    "Injection déclencheur : Micro-victoire cognitive activée.",
    "Synchronisation onde émotionnelle : Résonance optimale atteinte.",
    "Statut de décision : Conversion éthique déclenchée sans friction."
  ];
  const [typedText, setTypedText] = useState("");
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  // États pour la Carte 3 (Planificateur Protocole Curseur)
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const [activeDayIndex, setActiveDayIndex] = useState(3); // Jeudi par défaut
  const [cursorPos, setCursorPos] = useState({ x: 30, y: 40 });
  const [isClicking, setIsClicking] = useState(false);

  // Refs pour GSAP
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
  const protocolContainerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  // Cycle Mélangeur Diagnostique (array.unshift(array.pop()) toutes les 3.2s)
  useEffect(() => {
    const interval = setInterval(() => {
      setDiagnosticCards(prev => {
        const copy = [...prev];
        const last = copy.pop();
        copy.unshift(last);
        return copy;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Machine à Écrire Télémétrie
  useEffect(() => {
    let charIndex = 0;
    const currentTarget = telemetryLogs[currentLogIndex];
    setTypedText("");

    const typingInterval = setInterval(() => {
      if (charIndex < currentTarget.length) {
        setTypedText(currentTarget.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentLogIndex((prev) => (prev + 1) % telemetryLogs.length);
        }, 2000);
      }
    }, 45);

    return () => clearInterval(typingInterval);
  }, [currentLogIndex]);

  // Simulation Curseur Interactif Planificateur
  useEffect(() => {
    const cursorAnim = setInterval(() => {
      const nextDay = (activeDayIndex + 1) % 7;
      setCursorPos({ x: 18 + nextDay * 11, y: 45 });
      setTimeout(() => {
        setIsClicking(true);
        setActiveDayIndex(nextDay);
        setTimeout(() => {
          setIsClicking(false);
          setCursorPos({ x: 75, y: 78 }); // Va vers le bouton sauvegarder
        }, 350);
      }, 700);
    }, 3800);
    return () => clearInterval(cursorAnim);
  }, [activeDayIndex]);

  // Navbar morphing on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animations GSAP context
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero fade-up en décalage
      gsap.from(".hero-element", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out"
      });

      // 2. Parallaxe Hero Mockup
      gsap.to(".hero-mockup", {
        y: -30,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // 3. Section Philosophie / Manifeste (ScrollTrigger Split/Fade-up)
      gsap.from(".manifesto-line", {
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out"
      });

      // 4. Cartes Protocole Empilées Sticky (Pin & Scale & Blur Effect)
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
      cards.forEach((card, i) => {
        if (!card) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top 15%",
          end: "+=500",
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            if (i < cards.length - 1 && cards[i + 1]) {
              const nextCard = cards[i + 1];
              const rect = nextCard.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.35) {
                gsap.to(card, {
                  scale: 0.92,
                  filter: "blur(8px)",
                  opacity: 0.5,
                  duration: 0.3,
                  overwrite: "auto"
                });
              } else {
                gsap.to(card, {
                  scale: 1,
                  filter: "blur(0px)",
                  opacity: 1,
                  duration: 0.3,
                  overwrite: "auto"
                });
              }
            }
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openCheckout = (tier) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  return (
    <div ref={containerRef} className="bg-obsidian text-white min-h-screen font-sans selection:bg-gold-champagne selection:text-obsidian">
      
      {/* ======================================================== */}
      {/* A. NAVBAR — "L'ÎLE FLOTTANTE"                           */}
      {/* ======================================================== */}
      <nav 
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[94%] max-w-5xl rounded-full px-6 py-3.5 flex items-center justify-between ${
          isScrolled 
            ? 'bg-obsidian/85 backdrop-blur-xl border border-gold-champagne/30 shadow-card-dark' 
            : 'bg-transparent border border-white/10'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold-champagne/40 flex items-center justify-center font-display font-black text-gold-bright text-xs shadow-gold-sm group-hover:scale-105 transition-transform">
            7L
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-wider text-sm text-white uppercase leading-none">
              LES 7 LEVIERS
            </span>
            <span className="font-mono text-[9px] text-gold-champagne tracking-widest uppercase mt-0.5">
              Par Jean Deluizet
            </span>
          </div>
        </a>

        {/* Liens Desktop */}
        <div className="hidden md:flex items-center gap-7 font-mono text-xs tracking-wider text-slate-300">
          <a href="#fonctionnalites" className="hover:text-gold-champagne hover-lift">NEURO-CONVERSION</a>
          <a href="#philosophie" className="hover:text-gold-champagne hover-lift">MANIFESTE</a>
          <a href="#protocole" className="hover:text-gold-champagne hover-lift">PROTOCOLE</a>
          <a href="#tarification" className="hover:text-gold-champagne hover-lift">LE PACK (10 000 F)</a>
        </div>

        {/* CTA Navbar */}
        <button 
          onClick={() => openCheckout({
            name: "Système Intégral Performance",
            price: "10 000 FCFA",
            referencePrice: "25 000 FCFA",
            badge: "Offre Fondateur Recommandée"
          })}
          className="btn-magnetic px-5 py-2.5 rounded-full bg-gradient-to-r from-gold via-gold-bright to-amber-600 text-obsidian font-display font-black text-xs uppercase tracking-wider shadow-gold-sm flex items-center gap-2"
        >
          <span className="btn-slide"></span>
          <span>ACCÉDER</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </nav>

      {/* ======================================================== */}
      {/* B. HERO SECTION — "LE PLAN D'OUVERTURE"                 */}
      {/* ======================================================== */}
      <header ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid overflow-hidden">
        {/* Dégradé primaire-vers-noir */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-transparent pointer-events-none z-10"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Badge Hero */}
        <div className="relative z-20 hero-element">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold-champagne/30 font-mono text-xs font-bold text-gold-bright tracking-widest uppercase shadow-gold-sm">
            <span className="w-2 h-2 rounded-full bg-gold-bright animate-pulse"></span>
            MANUEL STRATÉGIQUE DE PERSUASION DIGITALE
          </div>
        </div>

        {/* Contenu Principal Hero */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end my-auto py-8">
          {/* Tiers inférieur gauche */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <p className="hero-element font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-200 tracking-tight">
                La Neuro-Conversion rencontre
              </p>
              <h1 className="hero-element font-serif italic font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-gold-bright via-gold-champagne to-white tracking-tight leading-[1.05]">
                L'Émotion Pure.
              </h1>
            </div>

            <p className="hero-element text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-sans font-normal">
              Arrêtez de vendre froidement avec de la fausse urgence. Maîtrisez les <strong className="text-white">7 déclencheurs psychologiques profonds</strong> qui transforment l'acte d'achat en une évidence irrépressible pour votre prospect.
            </p>

            {/* CTA + Auteur */}
            <div className="hero-element flex flex-wrap items-center gap-5 pt-3">
              <button
                onClick={() => openCheckout({
                  name: "Système Intégral Performance",
                  price: "10 000 FCFA",
                  referencePrice: "25 000 FCFA",
                  badge: "Offre Fondateur Recommandée"
                })}
                className="btn-magnetic px-8 py-4 rounded-full bg-gradient-to-r from-gold via-gold-bright to-amber-600 text-obsidian font-display font-black text-sm uppercase tracking-wider shadow-gold-glow flex items-center gap-3"
              >
                <span className="btn-slide"></span>
                <span>Débloquer le Système Complet — 10 000 FCFA</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-gold-bright" />
                <span>90 pages réelles · PDF + EPUB · Chariow</span>
              </div>
            </div>
          </div>

          {/* Visuel Mockup 3D Hero */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end hero-mockup z-20">
            <div className="relative group max-w-sm sm:max-w-md">
              <div className="absolute inset-0 bg-gold-champagne/15 rounded-full blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>
              <img 
                src="./assets/mockup-3d.webp" 
                alt="Livre 3D Les 7 Leviers Émotionnels par Jean Deluizet"
                className="relative z-10 w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] transform hover:rotate-1 transition-transform duration-500"
              />
              <div className="absolute -bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-obsidian-surface/90 border border-gold-champagne/40 font-mono text-[11px] text-gold-bright flex items-center gap-2 shadow-card-dark">
                <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
                Édition Fondateur 2026
              </div>
            </div>
          </div>
        </div>

        {/* Télémétrie basse Hero */}
        <div className="relative z-20 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-6">
            <span>AUTEUR : <strong className="text-white">JEAN DELUIZET</strong></span>
            <span className="hidden sm:inline">FORMAT : <strong className="text-white">90 PAGES HD</strong></span>
          </div>
          <div className="flex items-center gap-2 text-gold-champagne">
            <Activity className="w-4 h-4 text-gold-bright animate-pulse" />
            <span>SYSTÈME VALIDÉ QA (20/20 PASS)</span>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* C. FONCTIONNALITÉS — "ARTEFACTS FONCTIONNELS"           */}
      {/* ======================================================== */}
      <section id="fonctionnalites" className="py-28 px-6 sm:px-12 md:px-16 lg:px-24 bg-obsidian-deep relative border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="space-y-3 text-center sm:text-left">
            <span className="font-mono text-xs text-gold-champagne tracking-widest uppercase font-bold">
              // 01. ARTEFACTS DE NEURO-CONVERSION
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Trois instruments tactiques intégrés.
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Ce n'est pas de la théorie littéraire : chaque levier est un commutateur psychologique calibré pour déverrouiller la décision d'achat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARTE 1 — "MÉLANGEUR DIAGNOSTIQUE" */}
            <div className="bg-obsidian-card border border-gold-champagne/20 rounded-[2.5rem] p-7 shadow-card-dark flex flex-col justify-between relative overflow-hidden group hover:border-gold-champagne/40 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 font-mono text-[10px] text-gold-bright uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-gold-bright" />
                    Mélangeur Diagnostique
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">Auto-cycle 3s</span>
                </div>

                <h3 className="font-display font-bold text-xl text-white">
                  Diagnostic de résistance acheteur
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rotation dynamique des 3 principaux verrous psychologiques et leur contre-mesure neuro-émotionnelle.
                </p>

                {/* Stack de Cartes rotatives */}
                <div className="relative h-44 mt-4">
                  {diagnosticCards.map((card, idx) => {
                    const isTop = idx === 0;
                    const isMiddle = idx === 1;
                    return (
                      <div
                        key={card.id}
                        className={`absolute inset-x-0 p-4 rounded-2xl bg-obsidian-surface border transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${card.color} ${
                          isTop 
                            ? 'top-0 z-30 shadow-card-dark scale-100 opacity-100' 
                            : isMiddle 
                              ? 'top-4 z-20 scale-95 opacity-70 blur-[0.5px]' 
                              : 'top-8 z-10 scale-90 opacity-40 blur-[1px]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                          <span className="font-bold">{card.code}</span>
                          <span className="text-[10px] opacity-80">{card.status}</span>
                        </div>
                        <p className="font-display font-bold text-sm text-white mb-1">{card.title}</p>
                        <p className="text-[11px] text-slate-300 leading-snug">{card.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Algorithme : Anti-Scepticisme</span>
                <span className="text-gold-bright">Actif</span>
              </div>
            </div>

            {/* CARTE 2 — "MACHINE À ÉCRIRE TÉLÉMÉTRIE" */}
            <div className="bg-obsidian-card border border-gold-champagne/20 rounded-[2.5rem] p-7 shadow-card-dark flex flex-col justify-between relative overflow-hidden group hover:border-gold-champagne/40 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 font-mono text-[10px] text-gold-bright uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-gold-bright" />
                    Flux en Direct
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    En direct
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white">
                  Télémétrie neuro-émotionnelle
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Observation en temps réel des signaux de conversion et de validation décisionnelle.
                </p>

                {/* Écran Monospace Terminal */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-slate-300 h-44 flex flex-col justify-between">
                  <div className="space-y-1.5 overflow-hidden">
                    <p className="text-[10px] text-slate-500">// Terminal Télémétrie v2.6</p>
                    <p className="text-gold-champagne leading-relaxed">
                      &gt; {typedText}
                      <span className="inline-block w-2 h-3.5 bg-gold-bright ml-1 cursor-blink align-middle"></span>
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Flux : 28 SCRIPTS COPIER-COLLER</span>
                    <span>99.2% SYNCHRO</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Protocole : 7 Déclencheurs</span>
                <span className="text-gold-bright">Calibré</span>
              </div>
            </div>

            {/* CARTE 3 — "PLANIFICATEUR PROTOCOLE CURSEUR" */}
            <div className="bg-obsidian-card border border-gold-champagne/20 rounded-[2.5rem] p-7 shadow-card-dark flex flex-col justify-between relative overflow-hidden group hover:border-gold-champagne/40 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 font-mono text-[10px] text-gold-bright uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-gold-bright" />
                    Planificateur Pas à Pas
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">Routine Hebdo</span>
                </div>

                <h3 className="font-display font-bold text-xl text-white">
                  Planificateur de closing éthique
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Curseur automatique simulant l'activation programmée de chaque levier émotionnel jour après jour.
                </p>

                {/* Grille Hebdo avec Curseur Virtuel */}
                <div className="relative p-4 rounded-2xl bg-obsidian-surface border border-white/10 h-44 flex flex-col justify-between overflow-hidden">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Grille d'action hebdomadaire</span>
                    <div className="grid grid-cols-7 gap-1.5 mt-2">
                      {days.map((day, idx) => (
                        <div
                          key={idx}
                          className={`h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                            activeDayIndex === idx
                              ? 'bg-gradient-to-b from-gold to-amber-600 text-obsidian shadow-gold-sm scale-105'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-[10px] text-slate-300 uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <Check className="w-3 h-3 text-gold" />
                    Sauvegarder le protocole
                  </button>

                  {/* Curseur Animé SVG */}
                  <div 
                    className="absolute pointer-events-none transition-all duration-700 ease-out z-30"
                    style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
                  >
                    <div className={`transform transition-transform ${isClicking ? 'scale-75' : 'scale-100'}`}>
                      <MousePointer className="w-5 h-5 text-gold-bright fill-gold-bright drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Étape : Grille de 70 points</span>
                <span className="text-gold-bright">Prêt</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* D. PHILOSOPHIE — "LE MANIFESTE"                         */}
      {/* ======================================================== */}
      <section id="philosophie" ref={manifestoRef} className="py-32 px-6 sm:px-12 md:px-16 lg:px-24 bg-obsidian relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-gold-champagne uppercase tracking-widest manifesto-line">
            <Compass className="w-3.5 h-3.5 text-gold-champagne" />
            02. LA DIFFÉRENCE FONDATRICE
          </div>

          <div className="space-y-6">
            <p className="manifesto-line text-lg sm:text-xl md:text-2xl text-slate-400 font-sans font-medium leading-relaxed">
              La plupart des infopreneurs et créateurs se concentrent sur : <span className="text-slate-300 underline decoration-crimson/50">les caractéristiques froides, les tunnels agressifs et la fausse rareté</span>.
            </p>

            <h2 className="manifesto-line font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.25]">
              Nous nous concentrons sur : <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-bright via-gold-champagne to-amber-400">les 7 déclencheurs neuro-émotionnels invisibles</span> qui transforment la décision d'achat en un acte d'évidence naturelle.
            </h2>
          </div>

          <div className="manifesto-line pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-gold-bright font-bold">01 / ZÉRO MANIPULATION</span>
              <p className="text-slate-400">Alignement éthique total avec le désir profond de l'acheteur.</p>
            </div>
            <div className="space-y-1">
              <span className="text-gold-bright font-bold">02 / 90 PAGES D'ACTION</span>
              <p className="text-slate-400">Zéro blabla : des grilles, des comparatifs et 28 scripts prêts.</p>
            </div>
            <div className="space-y-1">
              <span className="text-gold-bright font-bold">03 / APPLICATION IMMÉDIATE</span>
              <p className="text-slate-400">Testé et validé sur Chariow et Amazon KDP.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* E. PROTOCOLE — "ARCHIVE EMPILÉE STICKY"                 */}
      {/* ======================================================== */}
      <section id="protocole" ref={protocolContainerRef} className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-obsidian-deep relative border-t border-white/5">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="space-y-3">
            <span className="font-mono text-xs text-gold-champagne tracking-widest uppercase font-bold">
              // 03. ARCHIVE EMPILÉE STICKY
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Le Protocole en 3 Phases d'Élite.
            </h2>
          </div>

          {/* Cartes empilées au scroll */}
          <div className="space-y-8 relative">
            
            {/* CARTE 1 — Rotation Géométrique */}
            <div 
              ref={card1Ref} 
              className="bg-obsidian-card border border-gold-champagne/25 rounded-[3rem] p-8 sm:p-12 shadow-card-dark min-h-[420px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="space-y-5 max-w-lg z-10">
                <span className="font-mono text-sm text-gold-bright font-bold tracking-widest">
                  PHASE 01 // LEVIERS #1 & #2
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Cartographie de la Vulnérabilité Émotionnelle
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Identifiez avec précision chirurgicale les doutes inavoués de votre client idéal. Éliminez la peur du ridicule et installez une certitude inébranlable avant toute offre commerciale.
                </p>
                <div className="flex items-center gap-4 font-mono text-xs text-gold-champagne">
                  <span>• Diagnostic Scepticisme</span>
                  <span>• Matrice de Statut</span>
                </div>
              </div>

              {/* Animation SVG Rotation Lente */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center relative shrink-0">
                <svg className="w-full h-full spin-slow" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(201, 168, 76, 0.2)" strokeWidth="2" strokeDasharray="6 6" />
                  <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" />
                  <circle cx="100" cy="100" r="45" fill="none" stroke="#C9A84C" strokeWidth="2" strokeDasharray="12 4" />
                  <polygon points="100,20 170,140 30,140" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <polygon points="100,180 30,60 170,60" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
                </svg>
                <div className="absolute font-mono text-xs font-bold text-gold-bright">
                  01
                </div>
              </div>
            </div>

            {/* CARTE 2 — Ligne Laser Balayage */}
            <div 
              ref={card2Ref} 
              className="bg-obsidian-card border border-gold-champagne/25 rounded-[3rem] p-8 sm:p-12 shadow-card-dark min-h-[420px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              {/* Ligne Laser Scanner */}
              <div className="scanner-line"></div>

              <div className="space-y-5 max-w-lg z-10">
                <span className="font-mono text-sm text-gold-bright font-bold tracking-widest">
                  PHASE 02 // LEVIERS #3, #4 & #5
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Injection des Déclencheurs de Statut et de Clarté
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Déployez la banque de scripts neuro-persuasifs. Structurez votre message pour que chaque paragraphe élève le statut de l'acheteur et élimine l'angoisse du regret futur.
                </p>
                <div className="flex items-center gap-4 font-mono text-xs text-gold-champagne">
                  <span>• 28 Scripts Clés en Main</span>
                  <span>• Ancrage d'Identité</span>
                </div>
              </div>

              {/* Grille de points avec effet scanner */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-black/50 border border-white/10 p-4 flex flex-col justify-between shrink-0 relative overflow-hidden">
                <div className="grid grid-cols-6 gap-3 opacity-60">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gold/40"></div>
                  ))}
                </div>
                <div className="font-mono text-[10px] text-slate-400 text-center">
                  SCANNER NEURO-ACTIF
                </div>
                <div className="text-center font-mono text-xs font-bold text-gold-bright">
                  02
                </div>
              </div>
            </div>

            {/* CARTE 3 — Forme d'Onde Pulsante ECG */}
            <div 
              ref={card3Ref} 
              className="bg-obsidian-card border border-gold-champagne/25 rounded-[3rem] p-8 sm:p-12 shadow-card-dark min-h-[420px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="space-y-5 max-w-lg z-10">
                <span className="font-mono text-sm text-gold-bright font-bold tracking-widest">
                  PHASE 03 // LEVIERS #6 & #7
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Libération Éthique de la Décision d'Achat
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  L'alignement final : déclenchez la micro-victoire immédiate et l'effet de réciprocité. Le prospect ne se sent pas vendu ; il s'offre sa propre transformation.
                </p>
                <div className="flex items-center gap-4 font-mono text-xs text-gold-champagne">
                  <span>• Grille de 70 points</span>
                  <span>• Clôture Immédiate Chariow</span>
                </div>
              </div>

              {/* Animation SVG Forme d'onde ECG */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0 relative overflow-hidden">
                <svg className="w-full px-4" viewBox="0 0 200 80">
                  <path
                    d="M 10 40 L 50 40 L 65 15 L 80 65 L 95 30 L 110 50 L 125 40 L 190 40"
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                  />
                </svg>
                <div className="absolute bottom-3 font-mono text-xs font-bold text-gold-bright">
                  03
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* F. ADHÉSION / TARIFICATION — "GRILLE 3 NIVEAUX"          */}
      {/* ======================================================== */}
      <section id="tarification" className="py-28 px-6 sm:px-12 md:px-16 lg:px-24 bg-obsidian relative border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-gold-champagne tracking-widest uppercase font-bold">
              // 04. CHOIX DE L'OFFRE OFFICIELLE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Investissez dans un instrument qui paie pour lui-même.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Une seule vente supplémentaire grâce à ces 7 leviers rembourse intégralement votre accès à vie.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* TIER 1 : ESSENTIEL */}
            <div className="bg-obsidian-card border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-white/20 transition-all">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Formule Découverte</span>
                  <h3 className="font-display font-bold text-2xl text-white mt-1">Essentiel Ebook</h3>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-mono line-through">15 000 FCFA</span>
                  <div className="font-display font-black text-3xl text-white">5 000 FCFA</div>
                  <span className="text-[11px] text-slate-400 font-mono">Paiement unique · Accès immédiat</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    <span>Livre complet 90 pages en PDF HD</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    <span>Format liseuse EPUB pour smartphone</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    <span>Synthèse des 7 Déclencheurs</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-white/5">
                <button
                  onClick={() => openCheckout({
                    name: "Formule Essentiel",
                    price: "5 000 FCFA",
                    referencePrice: "15 000 FCFA",
                    badge: "Formule Découverte"
                  })}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-bold text-xs uppercase tracking-wider transition-colors hover-lift"
                >
                  Choisir Essentiel
                </button>
              </div>
            </div>

            {/* TIER 2 : PERFORMANCE (RECOMMANDÉ / BEST-SELLER) */}
            <div className="bg-obsidian-surface border-2 border-gold-bright rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between relative shadow-gold-glow lg:-translate-y-4">
              {/* Badge Flottant Best-Seller */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold via-gold-bright to-amber-600 text-obsidian font-mono text-[11px] font-black uppercase tracking-wider shadow-gold-sm flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-obsidian" />
                PACK SYSTÈME INTÉGRAL · RECOMMANDÉ
              </div>

              <div className="space-y-6 pt-2">
                <div>
                  <span className="font-mono text-xs text-gold-champagne uppercase tracking-wider font-bold">L'Arme Complète</span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">Pack Performance 360°</h3>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-400 font-mono line-through">25 000 FCFA</span>
                  <div className="font-display font-black text-4xl text-gold-bright">10 000 FCFA</div>
                  <span className="text-[11px] text-gold-champagne font-mono">Paiement unique · Licence complète</span>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 font-sans">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-bright shrink-0" />
                    <span><strong>Livre 90 pages PDF A5 HD</strong> + Version EPUB</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-bright shrink-0" />
                    <span><strong>Bonus #1 :</strong> Grille d'Audit Anti-Scepticisme (70 pts)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-bright shrink-0" />
                    <span><strong>Bonus #2 :</strong> Banque des 28 Scripts d'Ancrage</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-bright shrink-0" />
                    <span>Modèle de page de vente en 11 blocs Chariow</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-bright shrink-0" />
                    <span>Téléchargement immédiat + Mises à jour à vie</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-gold/20">
                <button
                  onClick={() => openCheckout({
                    name: "Pack Performance 360°",
                    price: "10 000 FCFA",
                    referencePrice: "25 000 FCFA",
                    badge: "Pack Système Intégral"
                  })}
                  className="btn-magnetic w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-gold via-gold-bright to-amber-600 text-obsidian font-display font-black text-sm uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <span className="btn-slide"></span>
                  <span>Obtenir le Pack Intégral (10 000 FCFA)</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
                <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-mono text-slate-400">
                  <span>Wave · Orange · MTN · Cartes</span>
                </div>
              </div>
            </div>

            {/* TIER 3 : MASTERY */}
            <div className="bg-obsidian-card border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-white/20 transition-all">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Accompagnement Élite</span>
                  <h3 className="font-display font-bold text-2xl text-white mt-1">Mastery & Audit Privé</h3>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-mono line-through">90 000 FCFA</span>
                  <div className="font-display font-black text-3xl text-white">45 000 FCFA</div>
                  <span className="text-[11px] text-slate-400 font-mono">Limité à 5 créateurs par mois</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    <span>Tout le contenu du Pack Performance</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    <span>Audit 1-on-1 de votre page de vente (60 min)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    <span>Réécriture optimisée de vos 3 accroches</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    <span>Accès direct WhatsApp Jean Deluizet 30 jours</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-white/5">
                <button
                  onClick={() => openCheckout({
                    name: "Mastery & Audit Privé",
                    price: "45 000 FCFA",
                    referencePrice: "90 000 FCFA",
                    badge: "Accompagnement Élite"
                  })}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-bold text-xs uppercase tracking-wider transition-colors hover-lift"
                >
                  Réserver un Audit Privé
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* G. PIED DE PAGE — "LE SOCLE D'ÉLITE"                    */}
      {/* ======================================================== */}
      <footer className="bg-obsidian-deep rounded-t-[4rem] border-t border-white/10 pt-16 pb-12 px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
            {/* Identité */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold-champagne/40 flex items-center justify-center font-display font-black text-gold-bright text-xs">
                  7L
                </div>
                <span className="font-display font-black text-lg text-white uppercase tracking-wider">
                  LES 7 LEVIERS ÉMOTIONNELS
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Le système fondateur de neuro-conversion éthique pour vendre avec puissance vos produits digitaux en Afrique et à l'international.
              </p>
              <p className="font-mono text-xs text-gold-champagne">
                Auteur : <strong>Jean Deluizet</strong>
              </p>
            </div>

            {/* Navigation & Liens */}
            <div className="md:col-span-4 grid grid-cols-2 gap-6 font-mono text-xs">
              <div className="space-y-3">
                <span className="text-white font-bold uppercase tracking-wider">Navigation</span>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#fonctionnalites" className="hover:text-gold-bright transition-colors">Instruments</a></li>
                  <li><a href="#philosophie" className="hover:text-gold-bright transition-colors">Manifeste</a></li>
                  <li><a href="#protocole" className="hover:text-gold-bright transition-colors">Protocole 3 Étapes</a></li>
                  <li><a href="#tarification" className="hover:text-gold-bright transition-colors">Tarifs & Accès</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <span className="text-white font-bold uppercase tracking-wider">Conformité</span>
                <ul className="space-y-2 text-slate-400">
                  <li><span className="text-slate-500">Chariow Verified</span></li>
                  <li><span className="text-slate-500">KDP Amazon Spec</span></li>
                  <li><span className="text-slate-500">Paiements SSL 256</span></li>
                  <li><span className="text-slate-500">Droit Commercial</span></li>
                </ul>
              </div>
            </div>

            {/* Statut Système Opérationnel */}
            <div className="md:col-span-3 space-y-3 p-5 rounded-2xl bg-obsidian border border-white/10">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block">
                Infrastructure Télémétrique
              </span>
              <div className="flex items-center gap-2.5 font-mono text-xs text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SYSTÈME OPÉRATIONNEL</span>
              </div>
              <p className="font-mono text-[11px] text-slate-400 leading-tight">
                Distribution numérique active sur Chariow · Guichet instantané.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Jean Deluizet — Tous droits réservés.</p>
            <p>Construit selon le standard Cinématographique Luxe de Minuit.</p>
          </div>

        </div>
      </footer>

      {/* Modale de Commande Express */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTier={selectedTier}
      />

    </div>
  );
}
