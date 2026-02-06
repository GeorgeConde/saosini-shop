import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, HeartPulse, Sparkles, Phone } from "lucide-react";

export default function Home() {
  const categories = [
    {
      name: "Reproductores",
      description: "Genética superior para tu granja",
      href: "/catalogo?categoria=reproductores",
      icon: <Sparkles className="w-6 h-6 text-accent" />,
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Alimento",
      description: "Nutrición balanceada de alta calidad",
      href: "/catalogo?categoria=alimento",
      icon: <HeartPulse className="w-6 h-6 text-secondary" />,
      image: "https://images.unsplash.com/photo-1545143333-e8bd3346e9d6?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Accesorios",
      description: "Todo para el confort de tus cuyes",
      href: "/catalogo?categoria=accesorios",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Granja de Cuyes Hero"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-full text-secondary text-xs font-bold uppercase tracking-wider">
              Bienvenidos a SAOSINI Shop
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              Excelencia Nutricional para tus <span className="text-secondary">Cuyes</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 leading-relaxed">
              Venta de reproductores premium, alimento balanceado y todo lo necesario para tu emprendimiento en la crianza de cuyes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/catalogo" className="btn-primary flex items-center justify-center space-x-2">
                <span>Ver Catálogo</span>
                <ShoppingBag className="w-5 h-5" />
              </Link>
              <Link href="/nosotros" className="px-6 py-2.5 rounded-lg font-medium bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center">
                <span>Nuestra Historia</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl md:text-4xl">Nuestras Categorías</h2>
              <p className="text-neutral-500 mt-2">Todo lo que necesitas para una crianza exitosa</p>
            </div>
            <Link href="/catalogo" className="text-primary font-bold flex items-center hover:underline group">
              Explorar todo <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group relative h-96 overflow-hidden rounded-2xl shadow-lg ring-1 ring-neutral-200"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />
                <div className="absolute bottom-0 p-8 text-white">
                  <div className="mb-3 bg-white/20 backdrop-blur-md w-fit p-2 rounded-xl">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl mb-1">{cat.name}</h3>
                  <p className="text-neutral-300 text-sm">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured info / About */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="space-y-4 pt-12">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                  <Image src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=400" alt="Cuyes" fill className="object-cover" />
                </div>
                <div className="bg-secondary p-8 rounded-2xl text-white">
                  <h4 className="text-3xl font-bold">10+</h4>
                  <p className="text-xs uppercase tracking-widest mt-1 opacity-80">Años de Exp.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-primary p-8 rounded-2xl text-white">
                  <h4 className="text-3xl font-bold">100%</h4>
                  <p className="text-xs uppercase tracking-widest mt-1 opacity-80">Garantía Salud</p>
                </div>
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-md">
                  <Image src="https://images.unsplash.com/photo-1545143333-e8bd3346e9d6?auto=format&fit=crop&q=80&w=400" alt="Alimento" fill className="object-cover" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl leading-tight">Comprometidos con el Éxito de su <span className="text-primary">Inversión</span></h2>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Nuestros ejemplares son criados con los más altos estándares de bioseguridad y nutrición.
                No solo vendemos cuyes, entregamos el futuro de tu negocio.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">Asesoría Permanente</h5>
                    <p className="text-neutral-500 text-sm">Te acompañamos en cada paso de tu proyecto de crianza.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <HeartPulse className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">Genética Comprobada</h5>
                    <p className="text-neutral-500 text-sm">Líneas mejoradas para mayor peso y prolificidad.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/nosotros" className="btn-secondary">
                  Saber más sobre nosotros
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl">¿Listo para empezar tu propia granja?</h2>
          <p className="text-primary-light/80 text-lg sm:px-12">
            Contáctanos hoy mismo para una asesoría personalizada sobre los mejores reproductores para tu zona.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="https://wa.me/51926069493" target="_blank" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-3 transition-all shadow-xl shadow-green-900/20">
              <Phone className="w-5 h-5" />
              <span>Consultar con un Experto</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
