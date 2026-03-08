import { Button } from "@/components/ui/button";
import {
  Headphones,
  Menu,
  MessageCircle,
  Phone,
  Speaker,
  Tv,
  Volume2,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useGetAllProducts, useGetBusinessInfo } from "./hooks/useQueries";

// ─── Static fallback data ────────────────────────────────────────────────────

const FALLBACK_PRODUCTS = [
  {
    name: "Sound Boxes",
    description: "High-quality sound boxes for clear audio and powerful bass.",
    icon: "speaker",
  },
  {
    name: "DJ Boxes",
    description: "Professional DJ equipment for parties and events.",
    icon: "headphones",
  },
  {
    name: "Home Theater",
    description: "Transform your living room into a cinema experience.",
    icon: "tv",
  },
  {
    name: "All Sound Systems",
    description: "Complete audio solutions for every need.",
    icon: "zap",
  },
];

const FALLBACK_CONTACT_NUMBERS = ["9732452836", "7908676901"];
const FALLBACK_TAGLINE =
  "Your one-stop shop for Sound Boxes, DJ Boxes, Home Theaters, and more.";

// ─── Icon mapper ─────────────────────────────────────────────────────────────

function ProductIcon({
  icon,
  className,
}: { icon: string; className?: string }) {
  const cls = className ?? "w-10 h-10";
  switch (icon) {
    case "headphones":
      return <Headphones className={cls} />;
    case "tv":
      return <Tv className={cls} />;
    case "zap":
      return <Zap className={cls} />;
    default:
      return <Speaker className={cls} />;
  }
}

// ─── Nav component ───────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home", ocid: "nav.home.link" },
  { label: "Products", href: "#products", ocid: "nav.products.link" },
  { label: "Services", href: "#services", ocid: "nav.services.link" },
  { label: "Contact", href: "#contact", ocid: "nav.contact.link" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.12_0.01_50)] shadow-lg"
          : "bg-[oklch(0.14_0.01_50)]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2 group bg-transparent border-0 cursor-pointer p-0"
            onClick={() => handleNavClick("#home")}
          >
            <div className="w-8 h-8 rounded-md bg-[oklch(0.72_0.18_55)] flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-[oklch(0.12_0.015_50)]" />
            </div>
            <span className="text-[oklch(0.72_0.18_55)] font-bold text-xl tracking-tight leading-none">
              Tapas <span className="text-white font-normal">Electronics</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={link.ocid}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-[oklch(0.85_0.005_80)] hover:text-[oklch(0.72_0.18_55)] transition-colors duration-200 font-medium text-sm tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-white p-2 rounded-md hover:bg-[oklch(0.22_0.01_50)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[oklch(0.12_0.01_50)] border-t border-[oklch(0.22_0.01_50)]"
          >
            <nav
              className="flex flex-col py-3 px-4"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={link.ocid}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-[oklch(0.85_0.005_80)] hover:text-[oklch(0.72_0.18_55)] transition-colors py-3 px-2 font-medium border-b border-[oklch(0.2_0.01_50)] last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ tagline }: { tagline: string }) {
  const handleCTAClick = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/generated/hero-audio-store.dim_1350x800.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay — gradient from near-black to slightly lighter dark for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/80" />

      {/* Decorative audio waveform lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {(["a", "b", "c", "d", "e"] as const).map((id, i) => (
          <motion.div
            key={id}
            className="absolute bottom-0 left-0 right-0 border-t border-white/5"
            style={{ bottom: `${(i + 1) * 12}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              delay: 0.8 + i * 0.12,
              duration: 1.2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Badge */}
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[oklch(0.72_0.18_55)]/20 text-[oklch(0.72_0.18_55)] border border-[oklch(0.72_0.18_55)]/30">
            Professional Audio Equipment
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Welcome to{" "}
            <span className="text-[oklch(0.72_0.18_55)]">
              Tapas Electronics
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {tagline}
          </p>

          <Button
            data-ocid="hero.primary_button"
            onClick={handleCTAClick}
            size="lg"
            className="bg-[oklch(0.72_0.18_55)] hover:bg-[oklch(0.62_0.2_50)] text-[oklch(0.1_0.015_50)] font-bold px-8 py-4 text-base rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border-0"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Us Now
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          className="w-0.5 h-6 bg-gradient-to-b from-white/40 to-transparent rounded-full"
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.6,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}

// ─── Products ────────────────────────────────────────────────────────────────

interface ProductItem {
  name: string;
  description: string;
  icon: string;
}

function ProductCard({
  product,
  index,
}: { product: ProductItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group"
    >
      <div
        data-ocid={`products.item.${index + 1}`}
        className="bg-white rounded-xl p-7 border border-[oklch(0.88_0.008_70)] shadow-product hover:shadow-product-hover transition-all duration-300 text-center h-full flex flex-col items-center cursor-default"
      >
        {/* Icon container */}
        <div className="w-16 h-16 rounded-2xl bg-[oklch(0.95_0.01_60)] flex items-center justify-center mb-5 group-hover:bg-[oklch(0.72_0.18_55)]/12 transition-colors duration-300">
          <ProductIcon
            icon={product.icon}
            className="w-8 h-8 text-[oklch(0.42_0.15_255)] group-hover:text-[oklch(0.72_0.18_55)] transition-colors duration-300"
          />
        </div>

        <h3 className="text-[oklch(0.18_0.015_60)] font-bold text-lg mb-3 leading-tight">
          {product.name}
        </h3>
        <p className="text-[oklch(0.5_0.01_60)] text-sm leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Bottom accent bar */}
        <div className="mt-5 w-10 h-0.5 rounded-full bg-[oklch(0.72_0.18_55)]/40 group-hover:w-16 group-hover:bg-[oklch(0.72_0.18_55)] transition-all duration-300" />
      </div>
    </motion.div>
  );
}

function ProductsSection({ products }: { products: ProductItem[] }) {
  return (
    <section id="products" className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-[oklch(0.72_0.18_55)]">
            What we offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[oklch(0.42_0.15_255)]">
            Our Products
          </h2>
          <div className="mt-4 w-16 h-1 bg-[oklch(0.72_0.18_55)] rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-24 bg-[oklch(0.95_0.005_80)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-[oklch(0.72_0.18_55)]">
            After-sales support
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[oklch(0.42_0.15_255)]">
            Customer Service
          </h2>
          <div className="mt-4 w-16 h-1 bg-[oklch(0.72_0.18_55)] rounded-full mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-service border border-[oklch(0.88_0.008_70)] text-center relative overflow-hidden">
            {/* Subtle corner decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[oklch(0.72_0.18_55)]/6 rounded-full -translate-y-16 translate-x-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[oklch(0.42_0.15_255)]/5 rounded-full translate-y-12 -translate-x-12 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[oklch(0.72_0.18_55)]/12 flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-[oklch(0.72_0.18_55)]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[oklch(0.18_0.015_60)] mb-4">
                Expert Mechanic Support
              </h3>

              <p className="text-[oklch(0.42_0.01_60)] leading-relaxed text-base">
                At Tapas Electronics, we don't just sell products; we support
                them. We have a dedicated{" "}
                <strong className="text-[oklch(0.18_0.015_60)] font-semibold">
                  mechanic for customers
                </strong>{" "}
                to ensure your electronic devices are repaired and maintained
                perfectly.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                {[
                  "Quick Repairs",
                  "Warranty Support",
                  "Expert Technicians",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[oklch(0.95_0.01_60)] text-[oklch(0.42_0.01_60)] border border-[oklch(0.88_0.008_70)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function ContactSection({ contactNumbers }: { contactNumbers: string[] }) {
  const phones =
    contactNumbers.length >= 2 ? contactNumbers : FALLBACK_CONTACT_NUMBERS;

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-[oklch(0.72_0.18_55)]">
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[oklch(0.42_0.15_255)]">
            Contact Us
          </h2>
          <div className="mt-4 w-16 h-1 bg-[oklch(0.72_0.18_55)] rounded-full mx-auto" />
          <p className="mt-6 text-[oklch(0.5_0.01_60)] text-base max-w-md mx-auto">
            Ready to upgrade your sound? Contact us today!
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-2xl mx-auto">
          {/* Phone numbers */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 bg-[oklch(0.95_0.005_80)] rounded-xl p-7 border border-[oklch(0.88_0.008_70)] flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[oklch(0.42_0.15_255)]/12 flex items-center justify-center">
              <Phone className="w-6 h-6 text-[oklch(0.42_0.15_255)]" />
            </div>
            <h3 className="font-semibold text-[oklch(0.18_0.015_60)]">Phone</h3>

            <div className="flex flex-col gap-3 w-full">
              <a
                href={`tel:${phones[0]}`}
                data-ocid="contact.phone.item.1"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg border border-[oklch(0.42_0.15_255)]/30 text-[oklch(0.42_0.15_255)] font-semibold text-base hover:bg-[oklch(0.42_0.15_255)]/8 transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                {phones[0]}
              </a>
              <a
                href={`tel:${phones[1]}`}
                data-ocid="contact.phone.item.2"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg border border-[oklch(0.42_0.15_255)]/30 text-[oklch(0.42_0.15_255)] font-semibold text-base hover:bg-[oklch(0.42_0.15_255)]/8 transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                {phones[1]}
              </a>
            </div>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 bg-[oklch(0.95_0.005_80)] rounded-xl p-7 border border-[oklch(0.88_0.008_70)] flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[oklch(0.55_0.18_155)]/12 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-[oklch(0.55_0.18_155)]" />
            </div>
            <h3 className="font-semibold text-[oklch(0.18_0.015_60)]">
              WhatsApp
            </h3>
            <p className="text-[oklch(0.5_0.01_60)] text-sm text-center leading-relaxed">
              Chat with us on WhatsApp for quick responses and support.
            </p>

            <a
              href={`https://wa.me/${phones[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.whatsapp.button"
              className="mt-auto flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[oklch(0.55_0.18_155)] hover:bg-[oklch(0.48_0.2_155)] text-white font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-[oklch(0.12_0.01_50)] py-8 border-t border-[oklch(0.22_0.01_50)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[oklch(0.72_0.18_55)] flex items-center justify-center">
              <Volume2 className="w-3.5 h-3.5 text-[oklch(0.12_0.015_50)]" />
            </div>
            <span className="text-[oklch(0.72_0.18_55)] font-semibold text-sm">
              Tapas{" "}
              <span className="text-white/70 font-normal">Electronics</span>
            </span>
          </div>

          <p className="text-[oklch(0.6_0.005_60)] text-sm">
            &copy; {year} Tapas Electronics. All Rights Reserved.
          </p>

          <p className="text-[oklch(0.45_0.005_60)] text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.72_0.18_55)] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const { data: backendProducts } = useGetAllProducts();
  const { data: businessInfo } = useGetBusinessInfo();

  // Use backend data if available and populated, else fall back to static content
  const products: ProductItem[] =
    backendProducts && backendProducts.length > 0
      ? backendProducts.map((p) => ({
          name: p.name,
          description: p.description,
          icon: p.icon,
        }))
      : FALLBACK_PRODUCTS;

  const tagline =
    businessInfo?.tagline && businessInfo.tagline.trim().length > 0
      ? businessInfo.tagline
      : FALLBACK_TAGLINE;

  const contactNumbers =
    businessInfo?.contactNumbers && businessInfo.contactNumbers.length >= 2
      ? businessInfo.contactNumbers
      : FALLBACK_CONTACT_NUMBERS;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero tagline={tagline} />
        <ProductsSection products={products} />
        <ServicesSection />
        <ContactSection contactNumbers={contactNumbers} />
      </main>
      <Footer />
    </div>
  );
}
