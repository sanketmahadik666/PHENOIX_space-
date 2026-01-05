import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Wind, BookOpen, Coffee, Sun } from "lucide-react";
import { FadeIn } from "../components/enso/FadeIn";
import { Section } from "../components/enso/Section";
import { ShojiCard } from "../components/enso/ShojiCard";

const JapandiLanding = () => {
    // Parallax logic for Hero
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

    // Typography styles
    const fontSerif = "font-serif"; // Using default serif, in a real project would be Playfair/Merriweather
    const fontSans = "font-sans"; // Default sans

    return (
        <div className={`min-h-screen bg-[#EBE9E4] text-[#2C2C2C] selection:bg-[#C47F6B] selection:text-white overflow-hidden`}>
            
            {/* Texture Overlay (Grain) */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Navigation (Minimal) */}
            <nav className="fixed top-0 w-full p-8 md:px-16 flex justify-between items-center z-40 mix-blend-darken bg-[#EBE9E4]/80 backdrop-blur-sm">
                <span className={`${fontSerif} text-xl tracking-widest font-bold text-[#2C2C2C]`}>ENSŌ.</span>
                <div className="hidden md:flex gap-12 text-sm font-medium tracking-wide text-[#5c5c5c]">
                    <a href="#philosophy" className="hover:text-[#C47F6B] transition-colors duration-500">Philosophy</a>
                    <a href="#paths" className="hover:text-[#C47F6B] transition-colors duration-500">Paths</a>
                    <a href="#journal" className="hover:text-[#C47F6B] transition-colors duration-500">Journal</a>
                </div>
                <button className={`px-6 py-2 border border-[#2C2C2C] text-xs uppercase tracking-widest hover:bg-[#2C2C2C] hover:text-[#EBE9E4] transition-all duration-500 rounded-full`}>
                    Inquire
                </button>
            </nav>

            <main>
                {/* HERO SECTION */}
                <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
                    <motion.div 
                        className="text-center z-10 max-w-4xl"
                        style={{ y: y1, opacity: opacityHero }}
                    >
                        <FadeIn>
                            <span className="block text-[#8DA399] tracking-[0.3em] text-xs uppercase mb-6 font-medium">The Art of Growth</span>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <h1 className={`${fontSerif} text-5xl md:text-8xl leading-none font-medium mb-8 text-[#2C2C2C]`}>
                                Mastery in <br/>
                                <span className="italic font-light text-[#5c5c5c]">Stillness</span>
                            </h1>
                        </FadeIn>
                        <FadeIn delay={0.4}>
                            <p className={`${fontSans} text-lg md:text-xl text-[#5c5c5c] max-w-lg mx-auto leading-loose font-light`}>
                                A professional sanctuary designed to cultivate expertise through calm, disciplined learning.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.6}>
                            <div className="mt-12">
                                <span className="w-[1px] h-24 bg-[#2C2C2C] inline-block mb-4"></span>
                                <div className="text-xs uppercase tracking-widest text-[#5c5c5c] mt-2">Scroll to Begin</div>
                            </div>
                        </FadeIn>
                    </motion.div>

                    {/* Abstract Circle (Ensō visual) - Background Element */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] rounded-full border border-[#2C2C2C] z-0"
                    ></motion.div>
                </section>

                {/* PHILOSOPHY SECTION (Shoji Screen Horizontal Scroll feel) */}
                <Section className="relative z-10 bg-white py-32" id="philosophy">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4 sticky top-32">
                            <FadeIn>
                                <h2 className={`${fontSerif} text-4xl mb-6 text-[#2C2C2C]`}>Harmonious <span className="text-[#C47F6B]">Duality</span></h2>
                                <p className="text-[#5c5c5c] leading-relaxed mb-8">
                                    We believe true expertise is not rushed. It is built layer by layer, like high-quality lacquerware. Our approach fuses the disciplined structure of Japanese pedagogy with the approachable warmth of Scandinavian learning environments.
                                </p>
                                <a href="#" className="inline-flex items-center gap-2 text-sm border-b border-[#2C2C2C] pb-1 hover:text-[#C47F6B] hover:border-[#C47F6B] transition-colors duration-300">
                                    Read our Manifest <ArrowRight className="w-4 h-4" />
                                </a>
                            </FadeIn>
                        </div>
                        
                        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ShojiCard 
                                icon={Wind} 
                                title="Clarity" 
                                desc="Curriculum stripped of the non-essential. We focus only on what truly matters for your professional ascent."
                                delay={0.2}
                            />
                            <ShojiCard 
                                icon={BookOpen} 
                                title="Depth" 
                                desc="Learning that respects your intelligence. Deep dive sessions that allow for nuance and complex problem solving."
                                delay={0.4}
                            />
                            <ShojiCard 
                                icon={Coffee} 
                                title="Comfort" 
                                desc="An environment that invites you to stay. Learning shouldn't be a struggle, but a nourishing daily ritual."
                                delay={0.6}
                            />
                            <ShojiCard 
                                icon={Sun} 
                                title="Presence" 
                                desc="Live, interactive cohorts where listening is as valued as speaking. A community of thoughtful practitioners."
                                delay={0.8}
                            />
                        </div>
                    </div>
                </Section>

                {/* IMAGE / ATMOSPHERE BREAK */}
                <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
                    <motion.div 
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center grayscale-[20%] contrast-[90%]"
                    >
                         <div className="absolute inset-0 bg-[#8DA399]/20 mix-blend-multiply"></div>
                    </motion.div>
                </section>

                {/* PATHS (Grid Collection) */}
                <Section id="paths">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <span className="text-[#8DA399] uppercase tracking-widest text-xs font-semibold">Curated Paths</span>
                            <h2 className={`${fontSerif} text-4xl mt-4`}>Craft Your <span className="italic font-normal">Trajectory</span></h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
                         {[
                            { title: "Strategic Leadership", meta: "12 Weeks • Executive", color: "bg-[#D6D3CD]" },
                            { title: "Design Systems", meta: "8 Weeks • Advanced", color: "bg-[#E0E5E2]" },
                            { title: "Mindful Management", meta: "6 Weeks • Core", color: "bg-[#E8DCC4]" }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                                className="group cursor-pointer"
                            >
                                <div className={`aspect-[4/5] ${item.color} mb-6 relative overflow-hidden`}>
                                     {/* Subtle hover effect on image block */}
                                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700"></div>
                                </div>
                                <div className="text-xs text-[#8DA399] font-medium tracking-wide mb-2 uppercase">{item.meta}</div>
                                <h3 className={`${fontSerif} text-2xl group-hover:text-[#C47F6B] transition-colors duration-500`}>{item.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </Section>

                {/* CTA */}
                <section className="bg-[#2C2C2C] text-[#EBE9E4] py-32 px-6 text-center relative overflow-hidden">
                     {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                         <div className="absolute top-10 left-10 w-32 h-32 border border-[#EBE9E4] rounded-full"></div>
                         <div className="absolute bottom-10 right-10 w-64 h-64 border border-[#EBE9E4] rounded-full"></div>
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <FadeIn>
                            <h2 className={`${fontSerif} text-4xl md:text-6xl mb-8`}>Begin your journey.</h2>
                            <p className="text-[#EBE9E4]/60 text-lg leading-relaxed mb-12 font-light">
                                Spaces are deliberately limited to maintain the integrity of the cohort. 
                                Apply for the upcoming season.
                            </p>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                                className="px-10 py-4 bg-[#8DA399] text-white text-sm uppercase tracking-widest hover:bg-[#C47F6B] transition-colors duration-500 shadow-2xl"
                            >
                                Request Invitation
                            </motion.button>
                        </FadeIn>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#EBE9E4] py-12 text-center text-[#5c5c5c] text-xs uppercase tracking-widest border-t border-[#dcdad5]">
                    <p>&copy; 2024 Ensō Academy. Kyoto • Copenhagen.</p>
                </footer>

            </main>
        </div>
    );
};

export default JapandiLanding;
