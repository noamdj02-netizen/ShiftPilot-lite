"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

/**
 * Navbar - Refonte complète avec design minimaliste Apple/Vercel/Linear
 * Background opaque, barre de recherche intégrée, responsive optimisé
 */
export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/59348709-a1b6-42da-8246-9da9fee4df4a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:18',message:'Navbar component initialized',data:{isMobileMenuOpen,isSearchOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }, []);
  // #endregion

  // Fermer le menu mobile quand on clique ailleurs et désactiver le scroll
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/59348709-a1b6-42da-8246-9da9fee4df4a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:23',message:'useEffect triggered',data:{isMobileMenuOpen,isSearchOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    if (isMobileMenuOpen || isSearchOpen) {
      // Empêcher le scroll du body quand le menu est ouvert
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      // Ajouter classe pour CSS
      document.body.classList.add("mobile-menu-open");
    } else {
      // Réactiver le scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("mobile-menu-open");
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      // Cleanup: s'assurer que le scroll est réactivé
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const navLinks = [
    { href: "/", label: "Vue d'ensemble" },
    { href: "/#fonctionnalites", label: "Fonctionnalités" },
    { href: "/about", label: "Entreprise" },
    { href: "/#tarifs", label: "Tarifs" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/59348709-a1b6-42da-8246-9da9fee4df4a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:83',message:'handleLinkClick closing menu (hash link)',data:{href},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
        // #endregion
        setIsMobileMenuOpen(false);
      }
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/59348709-a1b6-42da-8246-9da9fee4df4a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:86',message:'handleLinkClick closing menu (normal link)',data:{href},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
      // #endregion
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pour l'instant, juste visuel - à implémenter plus tard
    console.log("Search:", searchQuery);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div data-navbar-wrapper="true">
      {/* Navbar fixed collée en haut */}
      <motion.nav
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
        role="navigation"
        aria-label="Navigation principale"
        data-navbar="true"
        className="fixed top-0 left-0 z-50 w-full h-14 rounded-none px-4 md:px-5 lg:px-6 py-0 flex items-center justify-between gap-2 md:gap-3 lg:gap-4 bg-white backdrop-blur-xl border-b border-slate-200/50 shadow-sm"
      >
        {/* Left section - Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Accueil ShiftPilot"
        >
          <Logo size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          <span className="font-semibold text-slate-900 text-xs sm:text-sm md:text-base lg:text-lg">
            ShiftPilot
          </span>
        </Link>

        {/* Center section - Nav links (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`
                text-sm font-medium transition-colors px-2 py-1 rounded-md
                ${
                  isActive(link.href)
                    ? "text-slate-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Search bar - Desktop only */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-md"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                aria-label="Rechercher"
              />
            </div>
          </form>

          {/* Login button - Desktop */}
          <Link
            href="/login"
            className="hidden md:block px-3 md:px-4 py-1.5 md:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all bg-slate-900 text-white active:bg-slate-800 min-h-[36px] sm:min-h-[44px] flex items-center touch-manipulation"
            aria-label="Se connecter"
          >
            Connexion
          </Link>

          {/* Mobile menu button (44px minimum pour touch) - z-index élevé pour être cliquable */}
          <button
            onClick={(e) => {
              // #region agent log
              fetch('http://127.0.0.1:7242/ingest/59348709-a1b6-42da-8246-9da9fee4df4a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:170',message:'Mobile menu button clicked',data:{currentState:isMobileMenuOpen,newState:!isMobileMenuOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
              // #endregion
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-md transition-all active:opacity-70 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation relative z-[100002]"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-600" />
            ) : (
              <Menu className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Search Drawer - FULL SCREEN avec z-index maximum */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop/Overlay - z-index très élevé */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
            />
            {/* Search Drawer Full Screen - z-index maximum */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 bg-white dark:bg-[#1C1C1E] z-[9999] md:hidden overflow-y-auto pt-20"
            >
              <div className="p-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Rechercher
                  </h2>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 rounded-md active:bg-slate-100 dark:active:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                    aria-label="Fermer la recherche"
                  >
                    <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label="Rechercher"
                  />
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile menu drawer - FULL SCREEN avec z-index MAXIMUM */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* #region agent log */}
            {(() => { fetch('http://127.0.0.1:7242/ingest/59348709-a1b6-42da-8246-9da9fee4df4a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:241',message:'Mobile menu rendering condition true',data:{isMobileMenuOpen,windowWidth:typeof window !== 'undefined' ? window.innerWidth : 'SSR'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{}); return null; })()}
            {/* #endregion */}
            {/* BACKDROP - Overlay sombre cliquable avec z-index très élevé */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onAnimationStart={() => {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/59348709-a1b6-42da-8246-9da9fee4df4a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:244',message:'Backdrop animation started',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                // #endregion
              }}
              onClick={(e) => {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/59348709-a1b6-42da-8246-9da9fee4df4a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:248',message:'Backdrop clicked - closing menu',data:{target:e.target,currentTarget:e.currentTarget},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
                // #endregion
                setIsMobileMenuOpen(false);
              }}
              className="mobile-menu-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000] lg:hidden"
              data-mobile-backdrop="true"
              aria-hidden="true"
            />
            
            {/* MENU MOBILE - Doit être AU-DESSUS de TOUT */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onAnimationStart={() => {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/59348709-a1b6-42da-8246-9da9fee4df4a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:255',message:'Menu container animation started',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                // #endregion
              }}
              className="mobile-menu-container fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-white dark:bg-[#1C1C1E] z-[100001] lg:hidden overflow-hidden"
              data-mobile-menu="true"
              style={{ willChange: 'transform' }}
            >
              {/* Header du menu avec X */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#1C1C1E]">
                <div className="flex items-center gap-2">
                  <Logo size={24} />
                  <span className="font-semibold text-slate-900 dark:text-white text-lg">
                    ShiftPilot
                  </span>
                </div>
                <button
                  onClick={() => {
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/59348709-a1b6-42da-8246-9da9fee4df4a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:303',message:'Close button clicked in menu',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
                    // #endregion
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-lg active:bg-slate-100 dark:active:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Contenu du menu - SCROLLABLE */}
              <div className="px-6 py-8 overflow-y-auto h-[calc(100vh-64px)] bg-white dark:bg-[#1C1C1E]">
                <nav className="flex flex-col space-y-1" role="navigation" aria-label="Menu mobile">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        handleLinkClick(e, link.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        text-lg font-medium px-4 py-4 rounded-lg transition-all min-h-[48px] flex items-center touch-manipulation
                        ${
                          isActive(link.href)
                            ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10"
                            : "text-slate-700 dark:text-slate-300 active:bg-slate-100 dark:active:bg-white/10 active:text-blue-600 dark:active:text-blue-400"
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* SÉPARATEUR */}
                  <div className="h-px bg-slate-200 dark:bg-white/10 my-6" />

                  {/* BOUTONS D'ACTION */}
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 active:bg-slate-200 dark:active:bg-white/20 px-6 py-4 rounded-lg transition-all text-center min-h-[48px] flex items-center justify-center touch-manipulation"
                  >
                    Connexion
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-semibold bg-blue-600 text-white active:bg-blue-700 px-6 py-5 rounded-lg transition-all text-center shadow-lg shadow-blue-600/30 min-h-[52px] flex items-center justify-center touch-manipulation"
                  >
                    Commencer
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
