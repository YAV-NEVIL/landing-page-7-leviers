import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  RotateCw, 
  AlertCircle, 
  Zap, 
  Smartphone, 
  Activity, 
  Cpu 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  selectedTier, 
  onConfirmOrder 
}) {
  const chariowCheckoutBaseUrl = "https://chariow.com";

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wave');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      setErrors({});
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentTier = selectedTier || {
    name: "Système Intégral Neuro-Vapor",
    price: "10 000 FCFA",
    referencePrice: "25 000 FCFA",
    badge: "Protocole Synaptique Recommandé"
  };

  const handleValidation = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!clientName.trim()) {
      newErrors.name = "Veuillez entrer votre nom complet.";
    }
    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 8) {
      newErrors.phone = "Veuillez entrer un numéro de téléphone valide (WhatsApp / Mobile Money).";
    }
    if (!clientEmail.trim() || !/^\S+@\S+\.\S+$/.test(clientEmail)) {
      newErrors.email = "Veuillez entrer une adresse e-mail valide pour recevoir vos fichiers.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#7B61FF', '#00F5D4', '#F43F5E', '#FFFFFF']
      });
    } catch (err) {}

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onConfirmOrder) {
        onConfirmOrder({ clientName, clientPhone, clientEmail, paymentMethod });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fade-in font-sans">
      <div 
        className="relative w-full max-w-xl bg-void-card border border-plasma/30 rounded-[2.5rem] shadow-plasma-glow overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ligne d'accent lumineuse supérieure */}
        <div className="h-1.5 w-full bg-gradient-to-r from-plasma via-cyanCustom to-neonRose"></div>

        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-ghost-muted hover:text-white transition-colors z-20"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-plasma/15 border border-plasma/40 text-cyanCustom font-mono text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyanCustom" />
              {currentTier.badge}
            </span>
            <span className="font-mono text-xs text-ghost-muted">Guichet Chariow SSL 256</span>
          </div>

          <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2">
            Déverrouillez le Système Complet
          </h3>
          <p className="text-ghost-muted text-sm leading-relaxed mb-6 font-sans">
            Accès immédiat au livre de 90 pages (<strong className="text-cyanCustom">PDF A5 HD + EPUB</strong>) et aux 2 Boîtes à Outils opérationnelles par <strong className="text-white">Jean Deluizet</strong>.
          </p>

          {/* Récapitulatif Prix */}
          <div className="p-4 rounded-2xl bg-void-surface border border-plasma/25 mb-6 flex items-center justify-between shadow-inner">
            <div>
              <p className="font-sans font-bold text-base text-white">{currentTier.name}</p>
              <p className="text-xs text-ghost-muted font-mono">Téléchargement instantané · Accès à vie</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-ghost-dark line-through mr-2 font-mono">{currentTier.referencePrice}</span>
              <span className="font-sans font-black text-2xl text-cyanCustom">{currentTier.price}</span>
            </div>
          </div>

          {isSuccess ? (
            /* Écran de Succès & Redirection */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-cyanCustom/20 border border-cyanCustom flex items-center justify-center text-cyanCustom shadow-cyan-glow">
                <CheckCircle className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h4 className="font-sans font-black text-2xl text-white">Protocole Activé !</h4>
              <p className="text-sm text-ghost-muted max-w-sm mx-auto">
                Merci <strong className="text-white">{clientName}</strong>. Votre session de paiement sécurisé Chariow est prête pour <strong className="text-cyanCustom font-mono">{clientPhone}</strong>.
              </p>
              <div className="pt-4">
                <a
                  href={`${chariowCheckoutBaseUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-plasma via-plasma-bright to-cyanCustom text-void-deep font-sans font-black text-base uppercase tracking-wider shadow-plasma-glow"
                >
                  <span className="btn-slide"></span>
                  <span>Ouvrir le Guichet Chariow</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          ) : (
            /* Formulaire Express */
            <form onSubmit={handleValidation} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-ghost-muted mb-1.5 uppercase tracking-wider">
                  Votre Nom Complet
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex : Moussa Traoré"
                  className={`w-full px-4 py-3 rounded-xl bg-void-surface border ${errors.name ? 'border-neonRose' : 'border-plasma/20 focus:border-cyanCustom'} text-white placeholder-ghost-dark text-sm focus:outline-none transition-colors font-sans`}
                />
                {errors.name && <p className="text-neonRose text-xs mt-1 flex items-center gap-1 font-mono"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-ghost-muted mb-1.5 uppercase tracking-wider">
                  Numéro Mobile Money / WhatsApp
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-ghost-dark font-mono text-xs"><Smartphone className="w-4 h-4" /></span>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+225 07 00 00 00 / +221 77 000 00 00"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-void-surface border ${errors.phone ? 'border-neonRose' : 'border-plasma/20 focus:border-cyanCustom'} text-white placeholder-ghost-dark text-sm focus:outline-none transition-colors font-mono`}
                  />
                </div>
                {errors.phone && <p className="text-neonRose text-xs mt-1 flex items-center gap-1 font-mono"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-ghost-muted mb-1.5 uppercase tracking-wider">
                  Adresse E-mail (Réception des Fichiers)
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className={`w-full px-4 py-3 rounded-xl bg-void-surface border ${errors.email ? 'border-neonRose' : 'border-plasma/20 focus:border-cyanCustom'} text-white placeholder-ghost-dark text-sm focus:outline-none transition-colors font-sans`}
                />
                {errors.email && <p className="text-neonRose text-xs mt-1 flex items-center gap-1 font-mono"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-ghost-muted mb-2 uppercase tracking-wider">
                  Mode de règlement instantané
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'wave', label: 'Wave Mobile Money', badge: '0% Frais' },
                    { id: 'orange', label: 'Orange Money', badge: 'Instantané' },
                    { id: 'mtn', label: 'MTN / Moov', badge: 'Direct' },
                    { id: 'card', label: 'Carte Bancaire', badge: 'Visa/Master' },
                  ].map((method) => (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === method.id 
                          ? 'border-cyanCustom bg-cyanCustom/10 text-white shadow-cyan-glow' 
                          : 'border-plasma/20 bg-void-surface/70 text-ghost-muted hover:border-plasma/40'
                      }`}
                    >
                      <span className="font-sans font-bold text-xs text-white">{method.label}</span>
                      <span className="font-mono text-[10px] text-cyanCustom mt-1">{method.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-magnetic w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-plasma via-plasma-bright to-cyanCustom text-void-deep font-sans font-black text-base uppercase tracking-wider shadow-plasma-glow flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <span className="btn-slide"></span>
                  {isSubmitting ? (
                    <>
                      <RotateCw className="w-5 h-5 animate-spin" />
                      <span>Connexion au Guichet Chariow...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirmer et Télécharger ({currentTier.price})</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-4 text-ghost-muted text-[11px] font-mono">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-cyanCustom" /> Chariow Secure 256-Bit</span>
                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-plasma-bright" /> Téléchargement Immédiat</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
