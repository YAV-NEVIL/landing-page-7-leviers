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
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  selectedTier, 
  onConfirmOrder
}) {
  const chariowCheckoutBaseUrl = "https://chariow.com";

  // États locaux
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wave');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Gestion de la touche Echap et du scroll
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
    name: "Système Intégral Performance",
    price: "10 000 FCFA",
    referencePrice: "25 000 FCFA",
    badge: "Offre Fondateur Recommandée"
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

    // Déclenchement de confetti festif de conversion
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FBBF24', '#C9A84C', '#FAF8F5']
      });
    } catch (err) {
      // Ignorer si indisponible
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onConfirmOrder) {
        onConfirmOrder({ clientName, clientPhone, clientEmail, paymentMethod });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-obsidian-card border border-gold-champagne/30 rounded-[2.5rem] shadow-card-dark overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ligne d'accent lumineuse supérieure */}
        <div className="h-1.5 w-full bg-gradient-to-r from-gold via-gold-bright to-gold-champagne"></div>

        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-bright font-mono text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
              {currentTier.badge}
            </span>
            <span className="font-mono text-xs text-slate-400">Paiement Sécurisé Chariow</span>
          </div>

          <h3 className="font-title font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2">
            Finalisez votre accès immédiat
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
            Vous recevez le manuel de 90 pages (<span className="text-gold font-semibold">PDF HD + EPUB</span>) et les 2 Boîtes à Outils opérationnelles par l'auteur <span className="text-white font-medium">Jean Deluizet</span>.
          </p>

          {/* Récapitulatif Prix */}
          <div className="p-4 rounded-2xl bg-obsidian-surface border border-white/10 mb-6 flex items-center justify-between">
            <div>
              <p className="font-title font-bold text-base text-white">{currentTier.name}</p>
              <p className="text-xs text-slate-400">Téléchargement instantané & Accès à vie</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 line-through mr-2 font-mono">{currentTier.referencePrice}</span>
              <span className="font-title font-black text-2xl text-gold-bright">{currentTier.price}</span>
            </div>
          </div>

          {isSuccess ? (
            /* Écran de Succès & Redirection */
            <div className="text-center py-8 space-y-4 animate-scale-up">
              <div className="w-16 h-16 mx-auto rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold">
                <CheckCircle className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h4 className="font-title font-black text-2xl text-white">Commande Enregistrée !</h4>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Merci <strong className="text-white">{clientName}</strong>. Votre session de paiement sécurisé Chariow est prête pour <strong className="text-gold font-mono">{clientPhone}</strong>.
              </p>
              <div className="pt-4">
                <a
                  href={`${chariowCheckoutBaseUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-gold via-gold-bright to-amber-600 text-obsidian font-title font-black text-base uppercase tracking-wider shadow-gold-glow"
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
              {/* Nom */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                  Votre Nom Complet
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex : Moussa Traoré"
                  className={`w-full px-4 py-3 rounded-xl bg-obsidian-surface border ${errors.name ? 'border-crimson' : 'border-white/10 focus:border-gold'} text-white placeholder-slate-500 text-sm focus:outline-none transition-colors font-sans`}
                />
                {errors.name && <p className="text-crimson text-xs mt-1 flex items-center gap-1 font-mono"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
              </div>

              {/* Téléphone WhatsApp / Mobile Money */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                  Numéro Mobile Money / WhatsApp
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-500 font-mono text-xs"><Smartphone className="w-4 h-4" /></span>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+225 07 00 00 00 / +221 77 000 00 00"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-obsidian-surface border ${errors.phone ? 'border-crimson' : 'border-white/10 focus:border-gold'} text-white placeholder-slate-500 text-sm focus:outline-none transition-colors font-mono`}
                  />
                </div>
                {errors.phone && <p className="text-crimson text-xs mt-1 flex items-center gap-1 font-mono"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                  Adresse E-mail (Réception des Fichiers)
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className={`w-full px-4 py-3 rounded-xl bg-obsidian-surface border ${errors.email ? 'border-crimson' : 'border-white/10 focus:border-gold'} text-white placeholder-slate-500 text-sm focus:outline-none transition-colors font-sans`}
                />
                {errors.email && <p className="text-crimson text-xs mt-1 flex items-center gap-1 font-mono"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
              </div>

              {/* Choix de Paiement */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-2 uppercase tracking-wider">
                  Mode de règlement préféré
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'wave', label: 'Wave Mobile Money', badge: 'Recommandé' },
                    { id: 'orange', label: 'Orange Money', badge: 'Instantané' },
                    { id: 'mtn', label: 'MTN / Moov Money', badge: 'Direct' },
                    { id: 'card', label: 'Carte Visa / Master', badge: 'International' },
                  ].map((method) => (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === method.id 
                          ? 'border-gold bg-gold/10 text-white shadow-gold-sm' 
                          : 'border-white/10 bg-obsidian-surface/60 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <span className="font-title font-bold text-xs text-white">{method.label}</span>
                      <span className="font-mono text-[10px] text-gold mt-1">{method.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bouton de Soumission */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-magnetic w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-gold via-gold-bright to-amber-600 text-obsidian font-title font-black text-base uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <span className="btn-slide"></span>
                  {isSubmitting ? (
                    <>
                      <RotateCw className="w-5 h-5 animate-spin" />
                      <span>Connexion au Guichet Chariow...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirmer et Obtenir l'Accès ({currentTier.price})</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>

              {/* Garanties */}
              <div className="pt-2 flex items-center justify-center gap-4 text-slate-400 text-[11px] font-mono">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-gold" /> Chariow Secure 256-Bit</span>
                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-gold-bright" /> Téléchargement Immédiat</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
