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
  Layers, 
  CheckCircle2, 
  Cpu, 
  Radio,
  Eye,
  Workflow
} from 'lucide-react';
import CheckoutModal from './components/CheckoutModal.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  // États pour Carte 1 (Mélangeur Diagnostique Holographique)
  const [diagnosticCards, setDiagnosticCards] = useState([
    { id: 1, title: "Levier #1 : Certitude vs Scepticisme", status: "Synapse Active", code: "NEURO-01", desc: "Désamorce le filtre analytique en injectant une preuve irréfutable immédiate.", color: "border-plasma/40 bg-plasma/10 text-cyanCustom" },
    { id: 2, title: "Levier #2 : Statut vs Peur du Ridicule", status: "Calibrage Thêta", code: "NEURO-02", desc: "Élève l'identité perçue de l'acheteur avant même qu'il ne découvre le prix.", color: "border-cyanCustom/40 bg-cyanCustom/10 text-plasma-bright" },
    { id: 3, title: "Levier #5 : Identité vs Faux Consensus", status: "Ancrage Cortex", code: "NEURO-05", desc: "Transforme l'acte d'achat en une revendication d'appartenance à un cercle d'initiés.", color: "border-neonRose/40 bg-neonRose/10 text-white" }
  ]);

  // États pour Carte 2 (Machine à Écrire Télémétrie)
  const telemetryLogs = [
    "Scan du cortex décisionnel en cours...",
    "Détection du frein d'achat : Scepticisme neutralisé à 98.7%",
    "Injection déclencheur : Micro-victoire cognitive validée.",
    "Synchronisation onde émotionnelle : Résonance optimale atteinte.",
    "Statut de décision : Conversion synaptique sans friction déclenchée."
  ];
  const [typedText, setTypedText] = useState("");
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  // États pour Carte 3 (Planificateur Protocole Curseur)
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const [activeDayIndex, setActiveDayIndex] = useState(3);
  const [cursorPos, setCursorPos] = useState({ x: 32, y: 42 });
  const [isClicking, setIsClicking] = useState(false);

  // Refs GSAP
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
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
        }, 2100);
      }
    }, 40);

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
          setCursorPos({ x: 74, y: 78 });
        }, 350);
      }, 700);
    }, 3600);
    return () => clearInterval(cursorAnim);
  }, [activeDayIndex]);

  // Morphing Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animations GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrée du Hero
      gsap.from(".hero-vapor-element", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out"
      });

      // 2. Parallaxe Mockup
      gsap.to(".hero-vapor-mockup", {
        y: -35,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });

      // 3. Manifeste
      gsap.from(".manifesto-vapor-line", {
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

      // 4. Cartes Protocole Empilées Sticky
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
      cards.forEach((card, i) => {
        if (!card) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top 16%",
          end: "+=520",
          pin: true,
          pinSpacing: false,
          onUpdate: () => {
            if (i < cards.length - 1 && cards[i + 1]) {
              const nextCard = cards[i + 1];
              const rect = nextCard.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.35) {
                gsap.to(card, {
                  scale: 0.91,
                  filter: "blur(10px)",
                  opacity: 0.45,
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
    <div ref={containerRef} className="bg-void text-ghost min-h-screen font-sans selection:bg-plasma selection:text-white relative">
      
      {/* Halos bioluminescents de fond Neuro-Vapor */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-plasma/10 rounded-full blur-[160px] pointer-events-none z-0 pulse-synaptic"></div>
      <div className="fixed top-1/3 -right-20 w-[550px] h-[550px] bg-cyanCustom/10 rounded-full blur-[180px] pointer-events-none z-0"></div>
      <div className="fixed bottom-10 left-10 w-[500px] h-[500px] bg-neonRose/5 rounded-full blur-[170px] pointer-events-none z-0"></div>

      {/* ======================================================== */}
      {/* A. NAVBAR — "L'ÎLE FLOTTANTE NEURO-VAPOR"                */}
      {/* ======================================================== */}
      <nav 
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[94%] max-w-5xl rounded-full px-6 py-3.5 flex items-center justify-between ${
          isScrolled 
            ? 'bg-void-card/90 backdrop-blur-2xl border border-plasma/35 shadow-plasma-glow' 
            : 'bg-transparent border border-white/10'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-plasma/20 border border-cyanCustom/40 flex items-center justify-center font-sans font-black text-cyanCustom text-xs shadow-cyan-glow group-hover:scale-105 transition-transform">
            7L
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold tracking-wider text-sm text-white uppercase leading-none">
              LES 7 LEVIERS
            </span>
            <span className="font-mono text-[9px] text-cyanCustom tracking-widest uppercase mt-0.5">
              Par Jean Deluizet
            </span>
          </div>
        </a>

        {/* Liens Desktop */}
        <div className="hidden md:flex items-center gap-7 font-mono text-xs tracking-wider text-ghost-muted">
          <a href="#fonctionnalites" className="hover:text-cyanCustom hover-lift">NEURO-CONVERSION</a>
          <a href="#philosophie" className="hover:text-cyanCustom hover-lift">MANIFESTE</a>
          <a href="#protocole" className="hover:text-cyanCustom hover-lift">PROTOCOLE</a>
          <a href="#tarification" className="hover:text-cyanCustom hover-lift">LE PACK (10 000 F)</a>
        </div>

        {/* CTA Navbar */}
        <button 
          onClick={() => openCheckout({
            name: "Pack Performance Neuro-Vapor",
            price: "10 000 FCFA",
            referencePrice: "25 000 FCFA",
            badge: "Système Intégral Recommandé"
          })}
          className="btn-magnetic px-5 py-2.5 rounded-full bg-gradient-to-r from-plasma via-plasma-bright to-cyanCustom text-void-deep font-sans font-black text-xs uppercase tracking-wider shadow-cyan-glow flex items-center gap-2"
        >
          <span className="btn-slide"></span>
          <span>ACCÉDER</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </nav>

      {/* ======================================================== */}
      {/* B. HERO SECTION — "LE PLAN D'OUVERTURE NEURO-VAPOR"     */}
      {/* ======================================================== */}
      <header ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-synaptic overflow-hidden">
        {/* Dégradé lourd vers le noir */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/85 to-transparent pointer-events-none z-10"></div>

        {/* Badge Hero */}
        <div className="relative z-20 hero-vapor-element">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-plasma/15 border border-plasma/40 font-mono text-xs font-bold text-cyanCustom tracking-widest uppercase shadow-cyan-glow">
            <Radio className="w-3.5 h-3.5 text-cyanCustom animate-pulse" />
            SYSTÈME DE NEURO-CONVERSION // SÉQUENCE OPTIMALE
          </div>
        </div>

        {/* Contenu Principal Hero */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end my-auto py-8">
          {/* Tiers inférieur gauche */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <p className="hero-vapor-element font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-ghost-muted tracking-tight">
                La Neuro-Persuasion au-delà de
              </p>
              <h1 className="hero-vapor-element font-serif italic font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-cyanCustom via-plasma-bright to-neonRose tracking-tight leading-[1.05]">
                L'Instinct Brut.
              </h1>
            </div>

            <p className="hero-vapor-element text-ghost-muted text-base sm:text-lg max-w-xl leading-relaxed font-sans font-normal">
              Oubliez le copywriting agressif et les designs d'un autre temps. Activez les <strong className="text-white">7 déclencheurs neuro-émotionnels profonds</strong> qui alignent le cerveau décisionnel de votre prospect avec une certitude absolue d'achat.
            </p>

            {/* CTA + Auteur */}
            <div className="hero-vapor-element flex flex-wrap items-center gap-5 pt-3">
              <button
                onClick={() => openCheckout({
                  name: "Pack Performance Neuro-Vapor",
                  price: "10 000 FCFA",
                  referencePrice: "25 000 FCFA",
                  badge: "Système Intégral Recommandé"
                })}
                className="btn-magnetic px-8 py-4 rounded-full bg-gradient-to-r from-plasma via-plasma-bright to-cyanCustom text-void-deep font-sans font-black text-sm uppercase tracking-wider shadow-plasma-glow flex items-center gap-3"
              >
                <span className="btn-slide"></span>
                <span>Débloquer le Système Complet — 10 000 FCFA</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-void-surface/90 border border-plasma/30 font-mono text-xs text-ghost-muted">
                <ShieldCheck className="w-4 h-4 text-cyanCustom" />
                <span>90 pages HD · PDF + EPUB · Chariow</span>
              </div>
            </div>
          </div>

          {/* Visuel Mockup 3D Hero avec aura bioluminescente */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end hero-vapor-mockup z-20">
            <div className="relative group max-w-sm sm:max-w-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-plasma/30 via-cyanCustom/20 to-neonRose/20 rounded-full blur-3xl transform group-hover:scale-115 transition-transform duration-700"></div>
              <img 
                src="./assets/mockup-3d.webp" 
                alt="Livre 3D Les 7 Leviers Émotionnels par Jean Deluizet"
                className="relative z-10 w-full drop-shadow-[0_25px_60px_rgba(123,97,255,0.35)] transform hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute -bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-void-surface/95 border border-cyanCustom/40 font-mono text-[11px] text-cyanCustom flex items-center gap-2 shadow-cyan-glow">
                <Sparkles className="w-3.5 h-3.5 text-cyanCustom" />
                Édition Fondateur 2026
              </div>
            </div>
          </div>
        </div>

        {/* Télémétrie basse Hero */}
        <div className="relative z-20 pt-6 border-t border-plasma/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ghost-muted">
          <div className="flex items-center gap-6">
            <span>AUTEUR : <strong className="text-white">JEAN DELUIZET</strong></span>
            <span className="hidden sm:inline">CALIBRAGE : <strong className="text-cyanCustom">90 PAGES HD</strong></span>
          </div>
          <div className="flex items-center gap-2 text-cyanCustom">
            <Activity className="w-4 h-4 text-cyanCustom animate-pulse" />
            <span>FRÉQUENCE SYNAPTIQUE : 100% VALIDÉE</span>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* C. FONCTIONNALITÉS — "ARTEFACTS NEURO-VAPOR"             */}
      {/* ======================================================== */}
      <section id="fonctionnalites" className="py-28 px-6 sm:px-12 md:px-16 lg:px-24 bg-void-deep relative border-t border-plasma/15">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="space-y-3 text-center sm:text-left">
            <span className="font-mono text-xs text-cyanCustom tracking-widest uppercase font-bold flex items-center gap-2">
              <Workflow className="w-3.5 h-3.5 text-cyanCustom" />
              // 01. ARTEFACTS DE NEURO-CONVERSION
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Trois instruments tactiques intégrés.
            </h2>
            <p className="text-ghost-muted max-w-2xl text-sm sm:text-base leading-relaxed">
              Une technologie d'influence éthique : chaque levier est un commutateur psychologique calibré pour éliminer les verrous d'achat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARTE 1 — "MÉLANGEUR DIAGNOSTIQUE HOLOGRAPHIQUE" */}
            <div className="bg-void-card border border-plasma/25 rounded-[2.5rem] p-7 shadow-plasma-glow flex flex-col justify-between relative overflow-hidden group hover:border-cyanCustom/50 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-plasma/15 border border-plasma/30 font-mono text-[10px] text-cyanCustom uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-cyanCustom" />
                    Mélangeur Diagnostique
                  </span>
                  <span className="font-mono text-[10px] text-ghost-dark">Cycle 3.2s</span>
                </div>

                <h3 className="font-sans font-bold text-xl text-white">
                  Diagnostic de résistance acheteur
                </h3>
                <p className="text-xs text-ghost-muted leading-relaxed">
                  Rotation dynamique des 3 principaux verrous psychologiques et leur contre-mesure synaptique.
                </p>

                {/* Stack de Cartes rotatives */}
                <div className="relative h-44 mt-4">
                  {diagnosticCards.map((card, idx) => {
                    const isTop = idx === 0;
                    const isMiddle = idx === 1;
                    return (
                      <div
                        key={card.id}
                        className={`absolute inset-x-0 p-4 rounded-2xl border backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${card.color} ${
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
                        <p className="font-sans font-bold text-sm text-white mb-1">{card.title}</p>
                        <p className="text-[11px] text-ghost-muted leading-snug">{card.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-plasma/15 flex items-center justify-between text-[11px] font-mono text-ghost-muted">
                <span>Algorithme : Anti-Scepticisme</span>
                <span className="text-cyanCustom">Actif</span>
              </div>
            </div>

            {/* CARTE 2 — "MACHINE À ÉCRIRE TÉLÉMÉTRIE CYBER" */}
            <div className="bg-void-card border border-plasma/25 rounded-[2.5rem] p-7 shadow-plasma-glow flex flex-col justify-between relative overflow-hidden group hover:border-cyanCustom/50 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-cyanCustom/15 border border-cyanCustom/30 font-mono text-[10px] text-cyanCustom uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-cyanCustom" />
                    Flux en Direct
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-cyanCustom">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyanCustom animate-ping"></span>
                    En direct
                  </span>
                </div>

                <h3 className="font-sans font-bold text-xl text-white">
                  Télémétrie neuro-émotionnelle
                </h3>
                <p className="text-xs text-ghost-muted leading-relaxed">
                  Observation en direct des signaux synaptiques et de validation décisionnelle du prospect.
                </p>

                {/* Écran Monospace Terminal */}
                <div className="p-4 rounded-2xl bg-black/70 border border-plasma/30 font-mono text-xs text-ghost-muted h-44 flex flex-col justify-between">
                  <div className="space-y-1.5 overflow-hidden">
                    <p className="text-[10px] text-plasma-bright">// Séquenceur Neuro-Persuasif v3.0</p>
                    <p className="text-cyanCustom leading-relaxed">
                      &gt; {typedText}
                      <span className="inline-block w-2 h-3.5 bg-cyanCustom ml-1 cursor-blink align-middle shadow-cyan-glow"></span>
                    </p>
                  </div>
                  <div className="pt-2 border-t border-plasma/20 flex items-center justify-between text-[10px] text-ghost-dark">
                    <span>28 SCRIPTS PRÊTS</span>
                    <span className="text-plasma-bright">100% SYNCHRO</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-plasma/15 flex items-center justify-between text-[11px] font-mono text-ghost-muted">
                <span>Protocole : 7 Déclencheurs</span>
                <span className="text-cyanCustom">Verrouillé</span>
              </div>
            </div>

            {/* CARTE 3 — "PLANIFICATEUR PROTOCOLE CURSEUR" */}
            <div className="bg-void-card border border-plasma/25 rounded-[2.5rem] p-7 shadow-plasma-glow flex flex-col justify-between relative overflow-hidden group hover:border-cyanCustom/50 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-neonRose/15 border border-neonRose/30 font-mono text-[10px] text-neonRose-bright uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-neonRose-bright" />
                    Planificateur Pas à Pas
                  </span>
                  <span className="font-mono text-[10px] text-ghost-dark">Routine Hebdo</span>
                </div>

                <h3 className="font-sans font-bold text-xl text-white">
                  Planificateur de closing éthique
                </h3>
                <p className="text-xs text-ghost-muted leading-relaxed">
                  Curseur automatique simulant l'activation programmée de chaque levier émotionnel jour après jour.
                </p>

                {/* Grille Hebdo avec Curseur Laser Virtuel */}
                <div className="relative p-4 rounded-2xl bg-void-surface border border-plasma/25 h-44 flex flex-col justify-between overflow-hidden">
                  <div>
                    <span className="text-[10px] font-mono text-ghost-muted uppercase">Matrice hebdomadaire</span>
                    <div className="grid grid-cols-7 gap-1.5 mt-2">
                      {days.map((day, idx) => (
                        <div
                          key={idx}
                          className={`h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                            activeDayIndex === idx
                              ? 'bg-gradient-to-b from-plasma via-plasma-bright to-cyanCustom text-void-deep shadow-cyan-glow scale-105'
                              : 'bg-white/5 text-ghost-muted'
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-2 rounded-xl bg-plasma/10 border border-plasma/30 font-mono text-[10px] text-cyanCustom uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm">
                    <Check className="w-3 h-3 text-cyanCustom" />
                    Enregistrer la séquence
                  </button>

                  {/* Curseur Animé SVG */}
                  <div 
                    className="absolute pointer-events-none transition-all duration-700 ease-out z-30"
                    style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
                  >
                    <div className={`transform transition-transform ${isClicking ? 'scale-75' : 'scale-100'}`}>
                      <MousePointer className="w-5 h-5 text-cyanCustom fill-cyanCustom drop-shadow-[0_2px_12px_rgba(0,245,212,0.9)]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-plasma/15 flex items-center justify-between text-[11px] font-mono text-ghost-muted">
                <span>Étape : Grille de 70 points</span>
                <span className="text-cyanCustom">Prêt</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* D. PHILOSOPHIE — "LE MANIFESTE SYNAPTIQUE"              */}
      {/* ======================================================== */}
      <section id="philosophie" ref={manifestoRef} className="py-32 px-6 sm:px-12 md:px-16 lg:px-24 bg-void relative overflow-hidden border-t border-plasma/15">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-plasma/10 border border-plasma/30 font-mono text-xs text-cyanCustom uppercase tracking-widest manifesto-vapor-line">
            <Compass className="w-3.5 h-3.5 text-cyanCustom" />
            02. LA DIFFÉRENCE FONDATRICE
          </div>

          <div className="space-y-6">
            <p className="manifesto-vapor-line text-lg sm:text-xl md:text-2xl text-ghost-muted font-sans font-medium leading-relaxed">
              La plupart des infopreneurs et créateurs se concentrent sur : <span className="text-white underline decoration-neonRose/60">les tunnels anxiogènes, la fausse urgence et les caractéristiques froides</span>.
            </p>

            <h2 className="manifesto-vapor-line font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.25]">
              Nous nous concentrons sur : <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyanCustom via-plasma-bright to-neonRose">les 7 déclencheurs neuro-émotionnels invisibles</span> qui synchronisent le cortex décisionnel avec la confiance absolue.
            </h2>
          </div>

          <div className="manifesto-vapor-line pt-8 border-t border-plasma/20 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-cyanCustom font-bold">01 / PERSUASION ÉTHIQUE</span>
              <p className="text-ghost-muted">Zéro manipulation : résonance pure avec le besoin réel.</p>
            </div>
            <div className="space-y-1">
              <span className="text-plasma-bright font-bold">02 / 90 PAGES D'ACTION</span>
              <p className="text-ghost-muted">Zéro théorie creuse : grilles de notation et 28 scripts prêts.</p>
            </div>
            <div className="space-y-1">
              <span className="text-neonRose-bright font-bold">03 / CONVERSION CHARIOW</span>
              <p className="text-ghost-muted">Paiements locaux Mobile Money et cartes bancaires intégrés.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* E. PROTOCOLE — "ARCHIVE EMPILÉE STICKY NEURO-VAPOR"     */}
      {/* ======================================================== */}
      <section id="protocole" className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-void-deep relative border-t border-plasma/15">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="space-y-3">
            <span className="font-mono text-xs text-cyanCustom tracking-widest uppercase font-bold">
              // 03. PROTOCOLE SYNAPTIQUE EN 3 ÉTAPES
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              L'Architecture en 3 Phases d'Élite.
            </h2>
          </div>

          {/* Cartes empilées au scroll */}
          <div className="space-y-8 relative">
            
            {/* CARTE 1 — Rotation Géométrique Néon */}
            <div 
              ref={card1Ref} 
              className="bg-void-card border border-plasma/30 rounded-[3rem] p-8 sm:p-12 shadow-plasma-glow min-h-[420px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="space-y-5 max-w-lg z-10">
                <span className="font-mono text-sm text-cyanCustom font-bold tracking-widest">
                  PHASE 01 // LEVIERS #1 & #2
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Cartographie de la Vulnérabilité Émotionnelle
                </h3>
                <p className="text-ghost-muted text-sm sm:text-base leading-relaxed">
                  Identifiez avec précision les doutes inavoués de votre client idéal. Éliminez la peur du ridicule et installez une certitude inébranlable avant d'aborder le tarif.
                </p>
                <div className="flex items-center gap-4 font-mono text-xs text-cyanCustom">
                  <span>• Diagnostic Scepticisme</span>
                  <span>• Matrice de Statut</span>
                </div>
              </div>

              {/* Animation SVG Rotation Néon */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center relative shrink-0">
                <svg className="w-full h-full spin-slow" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(123, 97, 255, 0.3)" strokeWidth="2" strokeDasharray="6 6" />
                  <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(0, 245, 212, 0.5)" strokeWidth="1.5" />
                  <circle cx="100" cy="100" r="45" fill="none" stroke="#7B61FF" strokeWidth="2" strokeDasharray="12 4" />
                  <polygon points="100,20 170,140 30,140" fill="none" stroke="rgba(0,245,212,0.4)" strokeWidth="1.5" />
                  <polygon points="100,180 30,60 170,60" fill="none" stroke="rgba(244,63,94,0.4)" strokeWidth="1.5" />
                </svg>
                <div className="absolute font-mono text-xs font-bold text-cyanCustom">
                  01
                </div>
              </div>
            </div>

            {/* CARTE 2 — Ligne Laser Scanner Cyan/Plasma */}
            <div 
              ref={card2Ref} 
              className="bg-void-card border border-plasma/30 rounded-[3rem] p-8 sm:p-12 shadow-plasma-glow min-h-[420px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="scanner-line-vapor"></div>

              <div className="space-y-5 max-w-lg z-10">
                <span className="font-mono text-sm text-cyanCustom font-bold tracking-widest">
                  PHASE 02 // LEVIERS #3, #4 & #5
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Injection des Déclencheurs de Statut et de Clarté
                </h3>
                <p className="text-ghost-muted text-sm sm:text-base leading-relaxed">
                  Déployez la banque de 28 scripts neuro-persuasifs. Structurez votre offre pour que chaque ligne élève le statut de l'acheteur et dissolve l'angoisse de regret.
                </p>
                <div className="flex items-center gap-4 font-mono text-xs text-cyanCustom">
                  <span>• 28 Scripts Clés en Main</span>
                  <span>• Ancrage d'Identité</span>
                </div>
              </div>

              {/* Matrice neurale de points */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-black/60 border border-plasma/30 p-4 flex flex-col justify-between shrink-0 relative overflow-hidden">
                <div className="grid grid-cols-6 gap-3 opacity-70">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-cyanCustom/50"></div>
                  ))}
                </div>
                <div className="font-mono text-[10px] text-ghost-muted text-center">
                  SCANNER SYNAPTIQUE
                </div>
                <div className="text-center font-mono text-xs font-bold text-cyanCustom">
                  02
                </div>
              </div>
            </div>

            {/* CARTE 3 — Forme d'Onde Pulsante ECG Bioluminescente */}
            <div 
              ref={card3Ref} 
              className="bg-void-card border border-plasma/30 rounded-[3rem] p-8 sm:p-12 shadow-plasma-glow min-h-[420px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="space-y-5 max-w-lg z-10">
                <span className="font-mono text-sm text-cyanCustom font-bold tracking-widest">
                  PHASE 03 // LEVIERS #6 & #7
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Libération Éthique de la Décision d'Achat
                </h3>
                <p className="text-ghost-muted text-sm sm:text-base leading-relaxed">
                  L'alignement final : déclenchez la micro-victoire immédiate et l'effet de réciprocité. Le client ne se sent pas vendu ; il s'offre sa propre élévation.
                </p>
                <div className="flex items-center gap-4 font-mono text-xs text-cyanCustom">
                  <span>• Grille de 70 points</span>
                  <span>• Paiement Instantané Chariow</span>
                </div>
              </div>

              {/* Animation Onde Cérébrale SVG */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-black/60 border border-plasma/30 flex items-center justify-center shrink-0 relative overflow-hidden">
                <svg className="w-full px-4" viewBox="0 0 200 80">
                  <path
                    d="M 10 40 L 45 40 L 60 10 L 75 70 L 95 20 L 115 55 L 130 40 L 190 40"
                    fill="none"
                    stroke="#00F5D4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_12px_rgba(0,245,212,0.9)]"
                  />
                </svg>
                <div className="absolute bottom-3 font-mono text-xs font-bold text-cyanCustom">
                  03
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* F. ADHÉSION / TARIFICATION — "GRILLE NEURO-VAPOR"        */}
      {/* ======================================================== */}
      <section id="tarification" className="py-28 px-6 sm:px-12 md:px-16 lg:px-24 bg-void relative border-t border-plasma/15">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-cyanCustom tracking-widest uppercase font-bold">
              // 04. CHOIX DE L'OFFRE OFFICIELLE
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Investissez dans un instrument qui se rentabilise dès la première vente.
            </h2>
            <p className="text-ghost-muted text-sm sm:text-base leading-relaxed">
              Une seule transaction conclue grâce à ces 7 leviers rembourse intégralement votre accès à vie.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* TIER 1 : ESSENTIEL */}
            <div className="bg-void-card border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-plasma/40 transition-all">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-ghost-muted uppercase tracking-wider">Formule Découverte</span>
                  <h3 className="font-sans font-bold text-2xl text-white mt-1">Essentiel Ebook</h3>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-ghost-dark font-mono line-through">15 000 FCFA</span>
                  <div className="font-sans font-black text-3xl text-white">5 000 FCFA</div>
                  <span className="text-[11px] text-ghost-muted font-mono">Paiement unique · Accès immédiat</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-ghost-muted font-sans">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyanCustom shrink-0" />
                    <span>Livre complet 90 pages en PDF HD</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyanCustom shrink-0" />
                    <span>Format liseuse EPUB pour mobile</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyanCustom shrink-0" />
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
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors hover-lift"
                >
                  Choisir Essentiel
                </button>
              </div>
            </div>

            {/* TIER 2 : PERFORMANCE (RECOMMANDÉ / NÉON PLASMA) */}
            <div className="bg-void-surface border-2 border-cyanCustom rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between relative shadow-cyan-glow lg:-translate-y-4">
              {/* Badge Flottant */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-plasma via-plasma-bright to-cyanCustom text-void-deep font-mono text-[11px] font-black uppercase tracking-wider shadow-cyan-glow flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-void-deep" />
                PACK SYSTÈME INTÉGRAL · RECOMMANDÉ
              </div>

              <div className="space-y-6 pt-2">
                <div>
                  <span className="font-mono text-xs text-cyanCustom uppercase tracking-wider font-bold">L'Arme Complète</span>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl text-white mt-1">Pack Performance 360°</h3>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-ghost-muted font-mono line-through">25 000 FCFA</span>
                  <div className="font-sans font-black text-4xl text-cyanCustom">10 000 FCFA</div>
                  <span className="text-[11px] text-plasma-bright font-mono">Paiement unique · Licence complète</span>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-white font-sans">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyanCustom shrink-0" />
                    <span><strong>Livre 90 pages PDF A5 HD</strong> + Version EPUB</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyanCustom shrink-0" />
                    <span><strong>Bonus #1 :</strong> Grille d'Audit Anti-Scepticisme (70 pts)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyanCustom shrink-0" />
                    <span><strong>Bonus #2 :</strong> Banque des 28 Scripts d'Ancrage</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyanCustom shrink-0" />
                    <span>Modèle de page de vente en 11 blocs Chariow</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyanCustom shrink-0" />
                    <span>Téléchargement immédiat + Mises à jour à vie</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-plasma/30">
                <button
                  onClick={() => openCheckout({
                    name: "Pack Performance 360°",
                    price: "10 000 FCFA",
                    referencePrice: "25 000 FCFA",
                    badge: "Pack Système Intégral"
                  })}
                  className="btn-magnetic w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-plasma via-plasma-bright to-cyanCustom text-void-deep font-sans font-black text-sm uppercase tracking-wider shadow-plasma-glow flex items-center justify-center gap-2"
                >
                  <span className="btn-slide"></span>
                  <span>Obtenir le Pack Intégral (10 000 FCFA)</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
                <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-mono text-ghost-muted">
                  <span>Wave · Orange · MTN · Cartes</span>
                </div>
              </div>
            </div>

            {/* TIER 3 : MASTERY */}
            <div className="bg-void-card border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-plasma/40 transition-all">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-ghost-muted uppercase tracking-wider">Accompagnement Élite</span>
                  <h3 className="font-sans font-bold text-2xl text-white mt-1">Mastery & Audit Privé</h3>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-ghost-dark font-mono line-through">90 000 FCFA</span>
                  <div className="font-sans font-black text-3xl text-white">45 000 FCFA</div>
                  <span className="text-[11px] text-ghost-muted font-mono">Limité à 5 créateurs par mois</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-ghost-muted font-sans">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyanCustom shrink-0" />
                    <span>Tout le contenu du Pack Performance</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyanCustom shrink-0" />
                    <span>Audit 1-on-1 de votre offre (60 min)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyanCustom shrink-0" />
                    <span>Réécriture optimisée de vos 3 accroches</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyanCustom shrink-0" />
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
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors hover-lift"
                >
                  Réserver un Audit Privé
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* G. PIED DE PAGE — "LE SOCLE NEURO-VAPOR"                */}
      {/* ======================================================== */}
      <footer className="bg-void-deep rounded-t-[4rem] border-t border-plasma/25 pt-16 pb-12 px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
            {/* Identité */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-plasma/20 border border-cyanCustom/40 flex items-center justify-center font-sans font-black text-cyanCustom text-xs">
                  7L
                </div>
                <span className="font-sans font-black text-lg text-white uppercase tracking-wider">
                  LES 7 LEVIERS ÉMOTIONNELS
                </span>
              </div>
              <p className="text-ghost-muted text-xs sm:text-sm leading-relaxed max-w-sm">
                Le système fondateur de neuro-conversion éthique pour vendre avec puissance vos produits digitaux en Afrique et à l'international.
              </p>
              <p className="font-mono text-xs text-cyanCustom">
                Auteur : <strong>Jean Deluizet</strong>
              </p>
            </div>

            {/* Navigation & Liens */}
            <div className="md:col-span-4 grid grid-cols-2 gap-6 font-mono text-xs">
              <div className="space-y-3">
                <span className="text-white font-bold uppercase tracking-wider">Navigation</span>
                <ul className="space-y-2 text-ghost-muted">
                  <li><a href="#fonctionnalites" className="hover:text-cyanCustom transition-colors">Instruments</a></li>
                  <li><a href="#philosophie" className="hover:text-cyanCustom transition-colors">Manifeste</a></li>
                  <li><a href="#protocole" className="hover:text-cyanCustom transition-colors">Protocole 3 Étapes</a></li>
                  <li><a href="#tarification" className="hover:text-cyanCustom transition-colors">Tarifs & Accès</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <span className="text-white font-bold uppercase tracking-wider">Conformité</span>
                <ul className="space-y-2 text-ghost-muted">
                  <li><span className="text-ghost-dark">Chariow Verified</span></li>
                  <li><span className="text-ghost-dark">KDP Amazon Spec</span></li>
                  <li><span className="text-ghost-dark">Paiements SSL 256</span></li>
                  <li><span className="text-ghost-dark">Droit Commercial</span></li>
                </ul>
              </div>
            </div>

            {/* Statut Système Opérationnel */}
            <div className="md:col-span-3 space-y-3 p-5 rounded-2xl bg-void-surface border border-plasma/30">
              <span className="font-mono text-[10px] text-ghost-dark uppercase tracking-widest block">
                Infrastructure Télémétrique
              </span>
              <div className="flex items-center gap-2.5 font-mono text-xs text-cyanCustom font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-cyanCustom animate-ping"></span>
                <span>RÉSEAU SYNAPTIQUE ACTIF</span>
              </div>
              <p className="font-mono text-[11px] text-ghost-muted leading-tight">
                Distribution numérique instantanée sur Chariow · Guichet ouvert.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-plasma/15 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ghost-dark">
            <p>© {new Date().getFullYear()} Jean Deluizet — Tous droits réservés.</p>
            <p>Construit selon le standard Cinématographique Preset D (Neuro-Vapor).</p>
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
