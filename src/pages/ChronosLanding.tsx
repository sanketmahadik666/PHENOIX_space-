import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Disc, Monitor, Cpu, Network, Play, ChevronRight, Zap } from "lucide-react";

// --- Components ---

const GridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-slate-950"></div>
    {/* Retro Grid Floor */}
    <div className="absolute bottom-0 w-full h-[50vh] bg-[linear_gradient(to_bottom,transparent_0%,rgba(168,85,247,0.1)_100%)] opacity-20 transform-gpu perspective-[1000px]">
      <div className="w-full h-full border-t border-purple-500/20 origin-bottom transform rotate-x-[60deg] scale-y-[2]">
        <div className="absolute inset-0 bg-[linear_gradient(to_right,rgba(168,85,247,0.2)_1px,transparent_1px),linear_gradient(to_bottom,rgba(168,85,247,0.2)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear_gradient(to_bottom,transparent_10%,black_100%)]"></div>
      </div>
    </div>
    {/* Starfield */}
    <div className="absolute inset-0 opacity-40">
        {[...Array(50)].map((_, i) => (
            <div 
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: Math.random() < 0.5 ? '2px' : '3px',
                    height: Math.random() < 0.5 ? '2px' : '3px',
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    opacity: Math.random() * 0.7 + 0.3
                }}
            ></div>
        ))}
    </div>
    {/* Scanlines */}
    <div className="absolute inset-0 bg-[linear_gradient(to_bottom,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0)_50%)] bg-[size:100%_4px] pointer-events-none z-50 opacity-20"></div>
  </div>
);

const CRTOverlay = () => (
    <div className="fixed inset-0 z-[100] pointer-events-none mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>
);

const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 border-b border-cyan-500/30 bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded border border-cyan-400 flex items-center justify-center bg-cyan-900/20 group-hover:bg-cyan-400/20 transition-all duration-300">
                <Disc className="w-5 h-5 text-cyan-400 animate-[spin_5s_linear_infinite]" />
            </div>
            <span className="text-xl font-bold tracking-widest text-cyan-50 font-mono uppercase glowing-text">CHRONOS<span className="text-purple-400">_ARCHIVE</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-mono text-cyan-300/70">
            <a href="#features" className="hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all px-2 py-1 uppercase">_Modules</a>
            <a href="#process" className="hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all px-2 py-1 uppercase">_Algorithms</a>
            <div className="flex items-center gap-2 text-green-400 animate-pulse">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>SYSTEM ONLINE</span>
            </div>
        </div>
        <button className="px-6 py-2 border border-purple-500 text-purple-400 font-mono font-bold uppercase text-xs hover:bg-purple-500 hover:text-white transition-all duration-200 tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]">
            Insert_Coin
        </button>
    </nav>
);

const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-[2px] opacity-0 group-hover:opacity-70 text-red-500 animate-[glitch_0.3s_infinite] clip-path-inset-1">
        {text}
      </span>
      <span className="absolute top-0 left-0 ml-[2px] opacity-0 group-hover:opacity-70 text-cyan-400 animate-[glitch_0.3s_infinite_reverse] clip-path-inset-2">
        {text}
      </span>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
    <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        viewport={{ once: true }}
        className="relative group bg-black/40 border border-slate-800 hover:border-cyan-500/50 p-6 transition-all duration-300 backdrop-blur-sm"
    >
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
        
        <div className="w-12 h-12 bg-slate-900 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
        </div>
        
        <h3 className="text-xl font-mono text-cyan-100 mb-2 uppercase tracking-wide group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm font-mono leading-relaxed border-l-2 border-slate-800 pl-3 group-hover:border-purple-500/50 transition-colors">
            {desc}
        </p>
    </motion.div>
);

const ChronosLanding = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans overflow-x-hidden">
        
        {/* Helper Sytles for Glitch effects defined in index.css typically, but inlining critical CSS or assuming standard Tailwind config */}
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syncopate:wght@400;700&display=swap');
            
            .font-mono { font-family: 'Share Tech Mono', monospace; }
            .font-display { font-family: 'Syncopate', sans-serif; }
            
            .glowing-text { text-shadow: 0 0 10px rgba(34,211,238,0.4); }
            .glowing-box { box-shadow: 0 0 20px rgba(168,85,247,0.2); }
            
            @keyframes glitch {
                0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
                20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
                40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
                60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
                80% { clip-path: inset(10% 0 60% 0); transform: translate(-1px, 1px); }
                100% { clip-path: inset(30% 0 70% 0); transform: translate(1px, -1px); }
            }
        `}</style>

        <GridBackground />
        <CRTOverlay />
        <Navbar />

        {/* Scroll Progress */}
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left z-[60]"
            style={{ scaleX }}
        />

        <main className="relative z-10">
            {/* HERO SECTION */}
            <section className="min-h-screen flex items-center justify-center px-4 relative">
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
                <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
                
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 mt-20">
                    <div className="flex-1 space-y-8 z-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/30 rounded bg-cyan-950/30 text-cyan-400 text-xs font-mono uppercase tracking-widest animate-pulse">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                            <span>v2.04.1_BETA_READY</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-white uppercase mix-blend-screen">
                            <GlitchText text="Digitize" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">History</span>
                            <br />
                            <span className="text-2xl md:text-4xl text-slate-400 font-mono mt-4 block border-l-4 border-purple-500 pl-6">
                                The _Future needed your _Past.
                            </span>
                        </h1>
                        
                        <p className="text-slate-400 max-w-xl font-mono text-lg leading-relaxed">
                            Chronos Archive transforms your physical analog memories—film reels, cassettes, polaroids—into immersive 3D digital vaults. <span className="text-cyan-300">Secure. Infinite. Eternal.</span>
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-cyan-600 text-black font-bold font-mono uppercase tracking-widest hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-2"
                            >
                                <Play className="w-4 h-4 fill-current" /> Initialize_Sequence
                            </motion.button>
                            <motion.button 
                                className="px-8 py-4 border border-slate-700 bg-black/50 text-slate-300 font-mono uppercase tracking-widest hover:border-purple-500 hover:text-purple-400 transition-colors backdrop-blur-sm"
                            >
                                Learn_More_
                            </motion.button>
                        </div>
                    </div>

                    <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                        
                        {/* 3D Geometric Logo Representation */}
                        <div className="relative w-64 h-64 md:w-96 md:h-96">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-cyan-500/30 rounded-full"
                            ></motion.div>
                            <motion.div 
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 border border-purple-500/30 rounded-full border-dashed"
                            ></motion.div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Monitor className="w-32 h-32 text-cyan-200 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                            </div>
                            
                            {/* Floating Metadata */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-10 top-10 bg-black/80 border border-cyan-500/50 p-2 text-xs font-mono text-cyan-400"
                            >
                                MEMORY_ALLOC: 98%
                            </motion.div>
                            <motion.div 
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -left-10 bottom-20 bg-black/80 border border-purple-500/50 p-2 text-xs font-mono text-purple-400"
                            >
                                ENCRYPTION: GHOST_PROTO
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="features" className="py-24 relative overflow-hidden">
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl font-display uppercase text-white mb-2">System <span className="text-purple-500">Modules</span></h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                        </div>
                        <p className="font-mono text-slate-400 text-sm max-w-md text-right border-r-2 border-slate-700 pr-4">
                            // Our proprietary algorithms scan, enhance, and encrypt your physical media into a unified digital timeline.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={Network} 
                            title="Neural scanning"
                            desc="High-fidelity 8K capture of film stripes and magnetic tape audio signatures using proprietary laser-grid technology."
                            delay={0.1}
                        />
                        <FeatureCard 
                            icon={Cpu} 
                            title="AI Restoration"
                            desc="Real-time artifact removal and color grading reconstruction based on 1980s Kodak aesthetic profiles."
                            delay={0.3}
                        />
                        <FeatureCard 
                            icon={Disc} 
                            title="Quantum Storage"
                            desc="Decentralized vault distribution ensures your memories survive system crashes, timeline shifts, and hardware rot."
                            delay={0.5}
                        />
                    </div>
                </div>
            </section>

             {/* PARALLAX / ATMOSPHERE SECTION */}
             <section className="py-32 relative flex items-center justify-center overflow-hidden border-y border-slate-800 bg-black/40">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10 blur-sm mix-blend-luminosity"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                    <Monitor className="w-16 h-16 text-cyan-500/50 mx-auto mb-6" />
                    <h3 className="text-2xl md:text-5xl font-display uppercase tracking-widest text-white mb-8 leading-relaxed">
                        "The human memory is a <span className="text-purple-400">flawed hard drive</span>. We offer <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white">redundancy</span>."
                    </h3>
                    <div className="inline-block px-4 py-2 border border-slate-600 bg-black/60 text-slate-400 font-mono text-sm">
                        _ARCHITECT_LOG_7734
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]"></div>
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center max-w-3xl px-6"
                >
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-40 animate-pulse"></div>
                            <Zap className="w-24 h-24 text-cyan-300 relative z-10" />
                        </div>
                    </div>
                    
                    <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-6 uppercase tracking-tighter">
                        System Ready
                    </h2>
                    <p className="text-xl text-purple-200 font-mono mb-12 max-w-2xl mx-auto">
                        Your archive awaits initialization. Slots for this cycle are limited by processing bandwidth.
                        <br/><span className="text-sm text-slate-500 mt-2 block">// CURRENT_LOAD: 94%</span>
                    </p>
                    
                    <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-12 py-6 bg-purple-600 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <span className="relative z-10 text-white font-display font-bold text-2xl uppercase tracking-widest flex items-center gap-4">
                            Connect_Drive <ChevronRight className="w-6 h-6" />
                        </span>
                    </motion.button>
                </motion.div>

                {/* Footer decorations */}
                <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-between text-xs font-mono text-slate-600 uppercase">
                    <div>© 198X-2049 CHRONOS CORP</div>
                    <div className="flex gap-4">
                        <span>Status: Stable</span>
                        <span>Ping: 14ms</span>
                        <span>Ver: 3.1.2</span>
                    </div>
                </div>
            </section>
        </main>
    </div>
  );
};

export default ChronosLanding;
