import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
 
const CHERRY = "#C8102E";
const ESPRESSO = "#1C1009";
const CREAM = "#FFFCF8";
const MUTED = "#a27d5a";
const GOLD = "#B8973A";
 
const GoogleFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { background: ${CREAM}; font-family: 'DM Sans', sans-serif; color: ${ESPRESSO}; overflow-x: hidden; }
    .serif { font-family: 'Cormorant Garamond', serif; }
    ::selection { background: rgba(200,16,46,0.12); }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${CREAM}; }
    ::-webkit-scrollbar-thumb { background: rgba(200,16,46,0.3); border-radius: 2px; }
  `}</style>
);
 
const useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
};
 
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
 
function Navbar() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 60;
  const links = ["Menu", "Story", "Gallery", "Contact"];
  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 3rem",
        background: scrolled ? "rgba(255,252,248,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,16,46,0.08)" : "none",
        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "72px",
      }}>
      <div className="serif" style={{ fontSize: "1.6rem", fontWeight: 400, letterSpacing: "0.06em", color: ESPRESSO }}>
        Cerise <span style={{ color: CHERRY, fontStyle: "italic" }}>Patisserie</span>
      </div>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", color: ESPRESSO, textDecoration: "none", opacity: 0.75, transition: "opacity 0.3s" }}
            onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.75}>{l}</a>
        ))}
        <button style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 22px", border: `1px solid ${CHERRY}`, background: "transparent", color: CHERRY, cursor: "pointer", transition: "all 0.3s" }}
          onMouseEnter={e => { e.target.style.background = CHERRY; e.target.style.color = "#fff"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = CHERRY; }}>
          Order Now
        </button>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  return (
    <section ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 3rem", position: "relative", overflow: "hidden", background: CREAM }}>
      <div style={{ position: "absolute", top: "20%", right: "12%", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,16,46,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "8%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(184,151,58,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", maxWidth: "1200px", margin: "0 auto", width: "100%", paddingTop: "80px" }}>
        <motion.div style={{ y: textY }} initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: CHERRY, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: CHERRY }} /> Paris — New Delhi
          </motion.p>
          <motion.h1 variants={fadeUp} className="serif" style={{ fontSize: "clamp(3.2rem, 6vw, 5.5rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.8rem" }}>
            Freshly<br /><span style={{ fontStyle: "italic", color: CHERRY }}>Baked</span><br />Luxury.
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: "1rem", lineHeight: 1.75, color: MUTED, maxWidth: "340px", marginBottom: "2.8rem" }}>
            Every creation begins with a single obsession — that the person holding it should feel, for a moment, that the world has been made entirely for them.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={{ padding: "14px 34px", background: CHERRY, color: "#fff", border: "none", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}
              onMouseEnter={e => e.target.style.background = "#a50d25"} onMouseLeave={e => e.target.style.background = CHERRY}>
              Explore Collection
            </button>
            <button style={{ padding: "14px 34px", background: "transparent", color: ESPRESSO, border: `1px solid rgba(28,16,9,0.2)`, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
              Our Story
            </button>
          </motion.div>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem" }}>
            {[["1200+", "Cakes Crafted"], ["98%", "Satisfaction"], ["8+", "Years of Art"]].map(([n, l]) => (
              <div key={l}>
                <div className="serif" style={{ fontSize: "1.9rem", fontWeight: 500, color: ESPRESSO, letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ fontSize: "0.72rem", color: MUTED, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "2px" }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div style={{ y: imgY, position: "relative" }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          <div style={{ position: "relative", borderRadius: "4px", overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=90&fit=crop" alt="Luxury cherry cake" style={{ width: "100%", height: "600px", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(28,16,9,0.15) 100%)" }} />
          </div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "2rem", right: "-1.5rem", background: "rgba(255,252,248,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,16,46,0.1)", padding: "1rem 1.25rem", borderRadius: "2px" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>Starting from</div>
            <div className="serif" style={{ fontSize: "1.6rem", fontWeight: 500, color: CHERRY, letterSpacing: "-0.01em" }}>₹2,000</div>
          </motion.div>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ position: "absolute", bottom: "2.5rem", left: "-1.5rem", background: "rgba(28,16,9,0.82)", backdropFilter: "blur(12px)", padding: "0.9rem 1.2rem", borderRadius: "2px", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4CAF50" }} />
            <div>
              <div style={{ fontSize: "0.68rem", color: "rgba(255,252,248,0.6)", letterSpacing: "0.08em" }}>TAKING ORDERS</div>
              <div style={{ fontSize: "0.82rem", color: CREAM, fontWeight: 500 }}>7 days delivery</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const cakes = [
  { name: "Velvet Cherry", desc: "Dark chocolate mousse, Morello cherry compote, mirror glaze", price: "₹3,800", rating: 4.9, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=90&fit=crop" },
  { name: "Golden Macaron Tower", desc: "Vanilla bean cream, rose water, edible gold leaf", price: "₹4,200", rating: 5.0, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=90&fit=crop" },
  { name: "Tiramisu Entremets", desc: "Mascarpone espresso, cocoa snow, Savoiardi base", price: "₹3,200", rating: 4.8, img: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=90&fit=crop" },
  { name: "Praline Millefeuille", desc: "Hazelnut praline, feuilletine crunch, crisp pastry", price: "₹2,800", rating: 4.9, img: "https://images.unsplash.com/photo-1703529021659-d4d45c62f483?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Citrus Tart Royale", desc: "Meyer lemon curd, yuzu, burnt meringue crown", price: "₹2,400", rating: 4.7, img: "https://media.istockphoto.com/id/1299866470/photo/colorful-gourmet-dessert-of-citrus-tart-with-white-chocolate-sticks.jpg?s=2048x2048&w=is&k=20&c=KwVK_MRj6xegt5IzYS7vlW4TRE0ZvYq_SD2OCnnIBB4=" },
  { name: "Paris-Brest Noir", desc: "Praline mousseline, choux pastry, blackcurrant", price: "₹3,600", rating: 4.9, img: "https://images.unsplash.com/photo-1593424718424-cf4d83f3def1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];
 
function Stars({ n }) {
  return (
    <span style={{ color: GOLD, fontSize: "0.75rem", letterSpacing: "2px" }}>{"★".repeat(Math.floor(n))}{n % 1 > 0 ? "½" : ""}</span>
  );
}
 
function FeaturedCollection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(null);
  return (
    <section id="menu" ref={ref} style={{ padding: "8rem 3rem", background: CREAM }}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: CHERRY, marginBottom: "1rem" }}>Featured Collection</motion.p>
        <motion.h2 variants={fadeUp} className="serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "0.8rem" }}>
          The <span style={{ fontStyle: "italic", color: CHERRY }}>Signature</span> Edit
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: "0.95rem", color: MUTED, lineHeight: 1.7, maxWidth: "480px", marginBottom: "4rem" }}>
          Each piece is made to order, finished by hand, and designed to be unforgettable long after the last bite.
        </motion.p>
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {cakes.map((c, i) => (
            <motion.div key={c.name} variants={fadeUp} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(200,16,46,0.08)", borderRadius: "32px", overflow: "hidden", transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s", transform: hovered === i ? "translateY(-10px)" : "translateY(0)", boxShadow: hovered === i ? "0 24px 60px rgba(28,16,9,0.12)" : "0 2px 20px rgba(28,16,9,0.04)", cursor: "pointer" }}>
              <div style={{ overflow: "hidden", height: "260px", position: "relative" }}>
                <motion.img src={c.img} alt={c.name} animate={{ scale: hovered === i ? 1.06 : 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "absolute", inset: 0, background: "rgba(28,16,9,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <button style={{ padding: "10px 24px", background: CREAM, color: ESPRESSO, border: "none", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>Quick View</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <h3 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400 }}>{c.name}</h3>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: CHERRY, fontWeight: 500 }}>{c.price}</span>
                </div>
                <p style={{ fontSize: "0.82rem", color: MUTED, lineHeight: 1.6, marginBottom: "0.75rem" }}>{c.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Stars n={c.rating} />
                  <span style={{ fontSize: "0.72rem", color: MUTED }}>{c.rating.toFixed(1)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
 
const process = [
  { n: "01", title: "Source", sub: "We select only A-grade seasonal ingredients — single-origin chocolate, farm-direct cream, heritage grains." },
  { n: "02", title: "Craft", sub: "Each creation is assembled by hand over 12–24 hours, layer by layer, with precision that no machine can replicate." },
  { n: "03", title: "Review", sub: "Before it leaves our kitchen, every piece passes a ritual quality check from our head pastry chef." },
  { n: "04", title: "Deliver", sub: "Packed in our signature black and ivory boxes, delivered chilled within your delivery window." },
];
 
function Craftsmanship() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ padding: "8rem 3rem", background: ESPRESSO }}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: CHERRY, marginBottom: "1rem" }}>The Process</motion.p>
        <motion.h2 variants={fadeUp} className="serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, letterSpacing: "-0.02em", color: CREAM, marginBottom: "4rem", lineHeight: 1.1 }}>
          Every Cake Crafted<br /><span style={{ fontStyle: "italic", color: CHERRY }}>Like Couture.</span>
        </motion.h2>
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5px", background: "rgba(255,252,248,0.04)" }}>
          {process.map((p, i) => (
            <motion.div key={p.n} variants={fadeUp} whileHover={{ background: "rgba(200,16,46,0.06)" }} transition={{ duration: 0.3 }}
              style={{ padding: "2.5rem 2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,252,248,0.06)", transition: "background 0.3s" }}>
              <div className="serif" style={{ fontSize: "3.5rem", fontWeight: 300, color: CHERRY, opacity: 0.6, lineHeight: 1, marginBottom: "1.5rem" }}>{p.n}</div>
              <h3 className="serif" style={{ fontSize: "1.6rem", fontWeight: 400, color: CREAM, marginBottom: "1rem", letterSpacing: "0.02em" }}>{p.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,252,248,0.5)", lineHeight: 1.75 }}>{p.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
 
function Story() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  return (
    <section id="story" ref={ref} style={{ padding: "8rem 3rem", background: CREAM }}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <div ref={imgRef} style={{ position: "relative" }}>
          <motion.div style={{ y: imgY }}>
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=700&q=90&fit=crop" alt="Pastry chef at work" style={{ width: "100%", height: "580px", objectFit: "cover", display: "block" }} />
          </motion.div>
          <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", bottom: "2.5rem", right: "-2rem", background: "rgba(255,252,248,0.9)", backdropFilter: "blur(14px)", border: `1px solid ${GOLD}30`, padding: "1.25rem 1.5rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: "4px" }}>Awarded</div>
            <div className="serif" style={{ fontSize: "1rem", fontWeight: 500, color: ESPRESSO }}>Best Luxury Patisserie</div>
            <div style={{ fontSize: "0.72rem", color: MUTED }}>Delhi Gourmet Awards 2025</div>
          </motion.div>
        </div>
        <motion.div variants={stagger}>
          <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: CHERRY, marginBottom: "1.5rem" }}>Our Story</motion.p>
          <motion.h2 variants={fadeUp} className="serif" style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "2rem" }}>
            Handmade.<br />Delivered.<br /><span style={{ fontStyle: "italic", color: CHERRY }}>Remembered.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "0.95rem", color: MUTED, lineHeight: 1.85, marginBottom: "1.5rem" }}>
            Cerise Patisserie was born from a single belief — that a truly extraordinary cake should feel like couture. Not just in taste, but in the ceremony of receiving it.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: "0.95rem", color: MUTED, lineHeight: 1.85, marginBottom: "2.5rem" }}>
            Our head chef trained under Michelin-starred kitchens in Paris before returning home with one mission: to bring that same obsessive craft to India's most discerning celebrations.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "3rem" }}>
            {[["12", "Signature flavours"], ["3-day", "Order window"], ["Zero", "Compromise"]].map(([n, l]) => (
              <div key={l}>
                <div className="serif" style={{ fontSize: "1.8rem", fontWeight: 500, color: CHERRY }}>{n}</div>
                <div style={{ fontSize: "0.72rem", color: MUTED, letterSpacing: "0.06em" }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
 
const testimonials = [
  { name: "Priya Mehra", role: "Wedding Client", review: "The cherry cake was the centrepiece of our entire wedding. Our guests still message us about it. Worth every rupee — and then some.", avatar: "PM" },
  { name: "Rohan Singhania", role: "Corporate Event", review: "Ordered a macaron tower for our product launch. The packaging alone made it feel like a luxury brand moment. Impeccable.", avatar: "RS" },
  { name: "Anika Kapoor", role: "Birthday Celebration", review: "I've had Ladurée in Paris and Pierre Hermé in Tokyo. Cerise Patisserie holds its own — with the warmth of something personal.", avatar: "AK" },
  { name: "Vikram Nair", role: "Anniversary Dinner", review: "My wife cried when she saw the Tiramisu Entremets. The detail was museum-worthy. We didn't want to cut into it.", avatar: "VN" },
];
 
function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[active];
  return (
    <section ref={ref} style={{ padding: "8rem 3rem", background: ESPRESSO }}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: CHERRY, marginBottom: "1rem" }}>Voices</motion.p>
        <motion.h2 variants={fadeUp} className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, color: CREAM, letterSpacing: "-0.02em", marginBottom: "4rem", fontStyle: "italic" }}>
          What our clients say
        </motion.h2>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "rgba(255,252,248,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,252,248,0.06)", padding: "3rem", marginBottom: "2.5rem" }}>
            <p className="serif" style={{ fontSize: "1.4rem", fontWeight: 300, fontStyle: "italic", color: CREAM, lineHeight: 1.7, marginBottom: "2rem" }}>"{t.review}"</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: CHERRY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 500, color: "#fff", letterSpacing: "0.05em" }}>{t.avatar}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 500, color: CREAM }}>{t.name}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,252,248,0.4)" }}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? "28px" : "8px", height: "8px", borderRadius: "4px", background: i === active ? CHERRY : "rgba(255,252,248,0.2)", border: "none", cursor: "pointer", transition: "all 0.4s" }} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

const galleryImgs = [
  { src: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&q=90&fit=crop", tall: true },
  { src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=90&fit=crop", tall: false },
  { src: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500&q=90&fit=crop", tall: false },
  { src: "https://images.unsplash.com/photo-1593424718424-cf4d83f3def1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tall: true },
  { src: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=500&q=90&fit=crop", tall: false },
  { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=90&fit=crop", tall: false },
];

function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hov, setHov] = useState(null);
  return (
    <section id="gallery" ref={ref} style={{ padding: "8rem 3rem", background: CREAM }}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: CHERRY, marginBottom: "1rem" }}>Gallery</motion.p>
        <motion.h2 variants={fadeUp} className="serif" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "4rem" }}>
          The <span style={{ fontStyle: "italic", color: CHERRY }}>Atelier</span>
        </motion.h2>
        <motion.div variants={stagger} style={{ columns: "3 260px", gap: "1rem" }}>
          {galleryImgs.map((g, i) => (
            <motion.div key={i} variants={fadeUp} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ breakInside: "avoid", marginBottom: "1rem", overflow: "hidden", position: "relative", cursor: "pointer" }}>
              <motion.img src={g.src} alt={`Gallery ${i + 1}`} animate={{ scale: hov === i ? 1.05 : 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "100%", height: g.tall ? "360px" : "240px", objectFit: "cover", display: "block" }} />
              <AnimatePresence>
                {hov === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "absolute", inset: 0, background: "rgba(200,16,46,0.18)" }} />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
 
function Offers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const offers = [
    { label: "Limited Edition", title: "The Monsoon Collection", desc: "Eight seasonal flavours available only in July. Cardamom rose, rain-soaked mango, and black sesame praline.", tag: "New" },
    { label: "Bespoke", title: "Commission Your Cake", desc: "Work one-on-one with our head chef to design something that exists nowhere else in the world. Minimum order ₹5,000.", tag: "By Request" },
    { label: "Gifting", title: "The Cerise Gift Ritual", desc: "Our signature black and ivory boxes. Wax-sealed, hand-lettered, delivered with ceremony.", tag: "Always Available" },
  ];
  return (
    <section style={{ padding: "8rem 3rem", background: CREAM }}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} ref={ref} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: CHERRY, marginBottom: "1rem" }}>Specials</motion.p>
        <motion.h2 variants={fadeUp} className="serif" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "4rem" }}>
          Made for <span style={{ fontStyle: "italic", color: CHERRY }}>Moments</span>
        </motion.h2>
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {offers.map((o, i) => (
            <motion.div key={o.title} variants={fadeUp} whileHover={{ y: -6 }} transition={{ duration: 0.4 }}
              style={{ padding: "2.5rem", border: "1px solid rgba(200,16,46,0.1)", background: "rgba(255,255,255,0.5)", position: "relative" }}>
              <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", background: "rgba(200,16,46,0.08)", color: CHERRY }}>{o.tag}</div>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: "0.75rem" }}>{o.label}</div>
              <h3 className="serif" style={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "1rem", letterSpacing: "-0.01em" }}>{o.title}</h3>
              <p style={{ fontSize: "0.85rem", color: MUTED, lineHeight: 1.75, marginBottom: "1.5rem" }}>{o.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: CHERRY, cursor: "pointer" }}>
                Learn More <span style={{ fontSize: "1rem" }}>→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
 
function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const inputStyle = { width: "100%", padding: "14px 18px", background: "rgba(255,252,248,0.04)", border: "1px solid rgba(255,252,248,0.1)", color: CREAM, fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", outline: "none", backdropFilter: "blur(8px)", transition: "border-color 0.3s", borderRadius: 0 };
  return (
    <section id="contact" ref={ref} style={{ padding: "8rem 3rem", background: ESPRESSO }}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "6rem", alignItems: "start" }}>
        <motion.div variants={stagger}>
          <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: CHERRY, marginBottom: "1.5rem" }}>Get in Touch</motion.p>
          <motion.h2 variants={fadeUp} className="serif" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 400, letterSpacing: "-0.02em", color: CREAM, marginBottom: "2rem", lineHeight: 1.15 }}>
            Begin Your<br /><span style={{ fontStyle: "italic", color: CHERRY }}>Enquiry</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "0.9rem", color: "rgba(255,252,248,0.5)", lineHeight: 1.8, marginBottom: "3rem" }}>
            We accept a limited number of bespoke commissions each week. Share your occasion and vision — our chef will respond within 24 hours.
          </motion.p>
          {[["Location", "Lajpat Nagar, New Delhi, 110024"], ["Hours", "Tue–Sun, 10am–7pm"], ["Email", "hello@cerisepatisserie.in"]].map(([l, v]) => (
            <motion.div key={l} variants={fadeUp} style={{ marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(255,252,248,0.05)" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: "3px" }}>{l}</div>
              <div style={{ fontSize: "0.9rem", color: "rgba(255,252,248,0.7)" }}>{v}</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={stagger}>
          <motion.div variants={fadeUp} style={{ background: "rgba(255,252,248,0.03)", border: "1px solid rgba(255,252,248,0.06)", padding: "2.5rem" }}>
            {[["Name", "text", "Your full name"], ["Email", "email", "your@email.com"], ["Occasion", "text", "Wedding, birthday, corporate..."]].map(([l, t, pl]) => (
              <div key={l} style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,252,248,0.4)", marginBottom: "6px" }}>{l}</label>
                <input type={t} placeholder={pl} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(200,16,46,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,252,248,0.1)"} />
              </div>
            ))}
            <div style={{ marginBottom: "2rem" }}>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,252,248,0.4)", marginBottom: "6px" }}>Details</label>
              <textarea rows={4} placeholder="Tell us about your vision..." style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "rgba(200,16,46,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,252,248,0.1)"} />
            </div>
            <button style={{ width: "100%", padding: "16px", background: CHERRY, color: "#fff", border: "none", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.3s" }}
              onMouseEnter={e => e.target.style.background = "#a50d25"} onMouseLeave={e => e.target.style.background = CHERRY}>
              Send Enquiry
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
function Footer() {
  const links = { Explore: ["Menu", "Gallery", "Seasonal"], Company: ["Our Story", "Press", "Careers"], Connect: ["Instagram", "Pinterest", "WhatsApp"] };
  return (
    <footer style={{ background: "#120b04", padding: "5rem 3rem 2.5rem", borderTop: "1px solid rgba(255,252,248,0.04)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
          <div>
            <div className="serif" style={{ fontSize: "1.7rem", fontWeight: 400, letterSpacing: "0.06em", color: CREAM, marginBottom: "1rem" }}>
              Cerise <span style={{ color: CHERRY, fontStyle: "italic" }}>Patisserie</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,252,248,0.35)", lineHeight: 1.8, maxWidth: "260px" }}>
              Artisan luxury cakes, made to order, delivered with ceremony across Delhi.
            </p>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: "1.25rem" }}>{section}</h4>
              {items.map(item => (
                <div key={item} style={{ marginBottom: "0.75rem" }}>
                  <a href="#" style={{ fontSize: "0.85rem", color: "rgba(255,252,248,0.4)", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = CREAM} onMouseLeave={e => e.target.style.color = "rgba(255,252,248,0.4)"}>{item}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,252,248,0.04)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,252,248,0.2)" }}>© 2025 Cerise Patisserie. All rights reserved.</p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,252,248,0.2)" }}>Crafted with obsession in New Delhi.</p>
        </div>
      </div>
    </footer>
  );
}
 
export default function App() {
  return (
    <>
      <GoogleFonts />
      <Navbar />
      <Hero />
      <FeaturedCollection />
      <Craftsmanship />
      <Story />
      <Testimonials />
      <Gallery />
      <Offers />
      <Contact />
      <Footer />
    </>
  );
}
