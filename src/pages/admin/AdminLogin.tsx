import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Loader2, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  // Motion Values for Magnetic/Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for "Rapid" but smooth cursor tracking
  const springConfig = { damping: 25, stiffness: 150 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform for tilt/parallax
  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);
  const translateX = useTransform(x, [-300, 300], [-20, 20]);
  const translateY = useTransform(y, [-300, 300], [-20, 20]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    mouseX.set(e.clientX - rect.left - centerX);
    mouseY.set(e.clientY - rect.top - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.6, // Wait for curtain
        duration: 0.7,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 0, opacity: 0 }, // Removed y: 30 (Bottom to up)
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const focusRingClass = "focus:ring-[#8C9A84] focus:ring-2 focus:ring-offset-2 focus:border-[#8C9A84]";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#FAFAF9] overflow-hidden font-sans text-slate-800">
      
      {/* CURTAIN REVEAL OVERLAY (Global) */}
      <motion.div 
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-0 bg-[#ffe8f1] z-50 origin-top pointer-events-none"
      />

      {/* HERO IMAGE SECTION */}
      <div className="relative w-full lg:w-1/2 aspect-[3/4] lg:aspect-auto lg:h-screen overflow-hidden order-1 lg:order-1">
        <motion.div
           className="w-full h-full"
           initial={{ x: "100%" }} 
           animate={{ x: 0 }}      
           whileHover={{ scale: 1.05 }}
           transition={{ 
             type: "spring", // "Limit buffer" / "Slide buffer" - Spring feels like a buffer
             stiffness: 40,
             damping: 20,
             delay: 0.2
           }} 
        >
          <img 
            src="/supposina.webp" 
            alt="Supposina Art" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* LOGIN FORM SECTION - Interactive Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 py-16 lg:p-24 order-2 lg:order-2 bg-[#ffe8f1] relative z-10 perspective-1000"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            x: translateX,
            y: translateY,
            perspective: 1000
          }}
          className="w-full max-w-md space-y-12 -mt-16 lg:-mt-24" // Lifted up ("Widget lift")
        >
            {/* Idle Animation Wrapper - REMOVED IDLE FLOAT (Bottom to Up removal) */}
            <div> 
                {/* Header */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h1 className="text-5xl lg:text-8xl font-light tracking-tighter text-slate-900 leading-[0.9]">
                        Elegant<br />
                        <span className="italic font-serif text-[#8C9A84]">Access</span>
                    </h1>
                    <p className="text-lg lg:text-xl font-light text-slate-500 max-w-sm leading-relaxed">
                        Enter the sanctuary of your training empire.
                    </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8 mt-8">
                    <motion.div variants={itemVariants} className="space-y-6">
                        <motion.div className="group" whileHover={{ x: 5 }}>
                            <label className="block text-sm font-medium text-slate-500 mb-2 ml-1 transition-colors group-focus-within:text-[#8C9A84] duration-300">
                                Email Address
                            </label>
                            <Input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@elegant.ae"
                                className={`h-14 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl px-4 text-lg shadow-sm transition-all duration-300 ${focusRingClass}`}
                                required
                                name="email"
                                autoComplete="username"
                            />
                        </motion.div>
                        <motion.div className="group" whileHover={{ x: 5 }}>
                            <label className="block text-sm font-medium text-slate-500 mb-2 ml-1 transition-colors group-focus-within:text-[#8C9A84] duration-300">
                                Password
                            </label>
                            <Input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••" 
                                className={`h-14 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl px-4 text-lg shadow-sm transition-all duration-300 ${focusRingClass}`}
                                required
                                name="password"
                                autoComplete="current-password"
                            />
                        </motion.div>
                    </motion.div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm font-medium bg-red-50 p-4 rounded-xl border border-red-100"
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.div variants={itemVariants}>
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full h-16 bg-slate-900 hover:bg-opacity-90 text-white rounded-full text-lg font-medium tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                            style={{ transitionDuration: '300ms' }}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <span className="flex items-center justify-center gap-3 relative z-10">
                                    Sign In <ArrowRight className="w-5 h-5" />
                                </span>
                            )}
                            {/* Button Fill Animation on Hover */}
                            <motion.div 
                                className="absolute inset-0 bg-[#8C9A84] opacity-0 hover:opacity-100 transition-opacity duration-300" 
                                initial={false}
                            />
                        </Button>
                    </motion.div>
                </form>
                
                <motion.div variants={itemVariants} className="pt-8 border-t border-slate-200/50 mt-8">
                    <p className="text-sm text-slate-400 font-light">
                        Protected by reCAPTCHA. <span className="hover:text-[#8C9A84] cursor-pointer transition-colors duration-300">Privacy Policy</span>
                    </p>
                </motion.div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;