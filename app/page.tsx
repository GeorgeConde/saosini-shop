import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, HeartPulse, Sparkles, Phone, TrendingUp, Award, Users, Star } from "lucide-react";
// Removed staticPosts import
import { getPublishedPosts } from "@/lib/actions/blog";
import BlogCard from "@/components/blog/BlogCard";
import DynamicGallery from "@/components/home/DynamicGallery";
import HeroSlider from "@/components/home/HeroSlider";
import ProductCarousel from "@/components/home/ProductCarousel";

// Custom Icons - Using User Images
// Images should be placed in public/icons/ directory


export default async function Home() {
  const { posts: latestPosts = [] } = await getPublishedPosts(2);
  const carouselItems = [
    {
      image: "/icons/cuy.png",
      imageAlt: "Cuyes reproductores de genética superior",
      title: "Reproductores",
      subtitle: "Genética superior seleccionada para máxima productividad",
      tags: ["Alta Prolificidad", "Precocidad", "Genética Mejorada", "Sanidad Certificada"],
      href: "/catalogo?category=Reproductores",
      ctaLabel: "Ver Reproductores",
    },
    {
      image: "/icons/saco.png",
      imageAlt: "Alimento balanceado para cuyes",
      title: "Alimento Balanceado",
      subtitle: "Nutrición científica para cada etapa de crecimiento",
      tags: ["Crecimiento", "Engorde", "Reproducción", "Vitaminas"],
      href: "/catalogo?category=Alimento",
      ctaLabel: "Ver Alimentos",
    },
    {
      image: "/icons/bebedero.png",
      imageAlt: "Accesorios y equipamiento para cuyes",
      title: "Accesorios",
      subtitle: "Equipamiento técnico diseñado para bienestar y eficiencia",
      tags: ["Bebederos", "Comederos", "Jaulas", "Confort"],
      href: "/catalogo?category=Accesorios",
      ctaLabel: "Ver Accesorios",
    },
    {
      image: "/icons/productos.png",
      imageAlt: "Medicamentos y suplementos para cuyes",
      title: "Medicamentos",
      subtitle: "Sanidad proactiva para mantener tu crianza sana",
      tags: ["Antibióticos", "Vitaminas", "Desparasitantes", "Suplementos"],
      href: "/catalogo?category=Medicamentos",
      ctaLabel: "Ver Productos",
    },
  ];


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSlider />

      {/* Product Showcase Carousel */}
      <ProductCarousel
        items={carouselItems}
        sectionTitle="Líneas de Productos"
        sectionSubtitle="Diferentes líneas, diferentes soluciones. Encuentra lo que necesitas."
      />

      {/* Dynamic Gallery Section */}
      <DynamicGallery />


      {/* Featured info / About */}
      {/* Featured info / About (Redesigned) */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Visual Composition */}
            <div className="relative h-[480px] w-full hidden lg:block">
              {/* Main Image */}
              <div className="absolute top-0 right-8 w-4/5 h-[85%] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 ease-out z-10">
                <Image
                  src="/images/home/Crianza - técnica - Cuyes - Perú.webp"
                  alt="Crianza técnica de cuyes mejorados en Perú"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Secondary Image - Floating */}
              <div className="absolute bottom-0 left-0 w-3/5 h-[45%] rounded-[2rem] overflow-hidden shadow-xl border-8 border-white z-20 hover:-translate-y-2 transition-transform duration-300">
                <Image
                  src="/images/home/alimento-balanceado-cuyes-crecimiento.webp"
                  alt="Alimento balanceado para el crecimiento de cuyes"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Badge 1 - Experience */}
              <div className="absolute top-12 left-0 bg-white p-4 pr-8 rounded-r-2xl shadow-lg border border-neutral-100 z-30 flex items-center space-x-4 animate-in slide-in-from-left duration-700">
                <div className="bg-primary text-white p-3 rounded-xl shadow-lg shadow-primary/20">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Experiencia</p>
                  <p className="text-xl font-bold text-neutral-900">10+ Años</p>
                </div>
              </div>

              {/* Floating Badge 2 - Guarantee */}
              <div className="absolute bottom-24 -right-4 bg-white p-4 pl-8 rounded-l-2xl shadow-lg border border-neutral-100 z-30 flex items-center space-x-4 animate-in slide-in-from-right duration-700 delay-200">
                <div>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider text-right">Garantía</p>
                  <p className="text-xl font-bold text-neutral-900 text-right">100% Salud</p>
                </div>
                <div className="bg-secondary text-white p-3 rounded-xl shadow-lg shadow-secondary/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Decorative Dots */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-neutral-200 rounded-[3rem] -z-10 scale-105 opacity-50 border-dashed"></div>
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 bg-amber-50 border border-amber-100 rounded-full mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">Liderazgo en el sector</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.1] text-neutral-900">
                Comprometidos con el <br />
                <span className="relative inline-block">
                  <span className="relative z-10">Éxito de tu Inversión</span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-1 -z-0 rounded-full"></span>
                </span>
              </h2>

              <p className="text-lg text-neutral-600 leading-relaxed">
                En Granja Saosini, no solo criamos cuyes; desarrollamos genética de vanguardia. Nuestros ejemplares son criados bajo rigurosos estándares de bioseguridad y nutrición para asegurar la máxima rentabilidad de tu negocio.
              </p>

              <div className="space-y-4 pt-2">
                {/* Feature 1 */}
                <div className="group flex items-start space-x-5 p-4 rounded-2xl hover:bg-neutral-50 transition-colors duration-300">
                  <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                    <Users className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl text-neutral-900 mb-1">Asesoría Técnica Permanente</h5>
                    <p className="text-neutral-500 leading-relaxed">Acompañamiento integral desde la instalación de tu galpón hasta la comercialización.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="group flex items-start space-x-5 p-4 rounded-2xl hover:bg-neutral-50 transition-colors duration-300">
                  <div className="bg-secondary/10 p-3 rounded-2xl group-hover:bg-secondary group-hover:text-white transition-all duration-300 shrink-0">
                    <TrendingUp className="w-6 h-6 text-secondary group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl text-neutral-900 mb-1">Genética de Alta Producción</h5>
                    <p className="text-neutral-500 leading-relaxed">Líneas mejoradas seleccionadas por su precocidad, prolificidad y conversión alimenticia.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link href="/nosotros" className="btn-secondary px-8 py-4 text-center">
                  Conoce nuestra historia
                </Link>
                <Link href="/contacto" className="px-8 py-4 rounded-xl font-bold text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all text-center flex items-center justify-center space-x-2">
                  <span>Agendar visita</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centro de Conocimiento — Futuristic */}
      <section className="py-14 bg-neutral-950 relative overflow-hidden">
        {/* Animated ambient orbs */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none" style={{ animationDelay: '2s', animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-0 w-[300px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-3" />
              <span className="text-primary-light text-xs font-bold uppercase tracking-[0.25em]">
                Blog & Guías
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5 tracking-tight">
              Centro de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-secondary to-primary-light bg-[length:200%_auto] animate-[gradient-shift_6s_ease-in-out_infinite]">
                Conocimiento
              </span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Artículos técnicos y consejos prácticos para llevar tu producción al siguiente nivel.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {latestPosts.map((post: any) => (
              <div key={post.id} className="h-full">
                <BlogCard post={post} variant="dark" />
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-500 hover:scale-105"
            >
              {/* Button glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl" />

              <span className="relative z-10 flex items-center">
                Explorar todos los artículos
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-14 bg-neutral-900 text-white overflow-hidden relative">

        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-4">
              <Star className="w-4 h-4 text-secondary mr-2" fill="currentColor" />
              <span className="text-secondary text-sm font-bold uppercase tracking-wider">
                Experiencias Reales
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Lo que dicen los productores
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl relative hover:bg-white/10 transition-colors">
                <div className="flex text-secondary mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5" fill="currentColor" />
                  ))}
                </div>
                <p className="text-neutral-300 italic mb-6 leading-relaxed">
                  {i === 1 && '"Gracias a Agroaventuras Saosini mejoré la genética de mi granja. Los cuyes llegaron sanos y fuertes hasta Cajamarca. Totalmente recomendados."'}
                  {i === 2 && '"El alimento balanceado es de primera calidad. He notado que mis cuyes ganan peso mucho más rápido. El servicio de entrega es muy puntual."'}
                  {i === 3 && '"Excelente asesoría técnica. Me ayudaron a diseñar mis galpones y empezar mi negocio desde cero. Son verdaderos expertos en el tema."'}
                </p>
                <div className="flex items-center space-x-4 border-t border-white/10 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">
                    {i === 1 ? 'JP' : i === 2 ? 'MT' : 'CR'}
                  </div>
                  <div>
                    <div className="font-bold text-white">
                      {i === 1 ? 'Juan Pérez' : i === 2 ? 'María Torres' : 'Carlos Ruíz'}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {i === 1 ? 'Productor en Cajamarca' : i === 2 ? 'Productora en Arequipa' : 'Emprendedor en Cusco'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-5 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold">¿Listo para empezar tu propia granja?</h2>
          <p className="text-white/90 text-lg sm:px-12">
            Contáctanos hoy mismo para una asesoría personalizada sobre los mejores reproductores para tu zona.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/51926069493"
              target="_blank"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-3 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              <span>Consultar con un Experto</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
