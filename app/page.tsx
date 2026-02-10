import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, HeartPulse, Sparkles, Phone, TrendingUp, Award, Users, Star } from "lucide-react";
// Removed staticPosts import
import { getPublishedPosts } from "@/lib/actions/blog";
import BlogCard from "@/components/blog/BlogCard";

// Custom Icons - Using User Images
// Images should be placed in public/icons/ directory


export default async function Home() {
  const { posts: latestPosts = [] } = await getPublishedPosts(2);
  const categories = [
    {
      name: "Reproductores",
      description: "Genética superior",
      href: "/catalogo?category=Reproductores",
      icon: "/icons/cuy.png",
      color: "bg-primary"
    },
    {
      name: "Alimento Balanceado",
      description: "Nutrición de calidad",
      href: "/catalogo?category=Alimento",
      icon: "/icons/saco.png",
      color: "bg-primary"
    },
    {
      name: "Accesorios",
      description: "Confort total",
      href: "/catalogo?category=Accesorios",
      icon: "/icons/bebedero.png",
      color: "bg-primary"
    },
    {
      name: "Productos",
      description: "Insumos varios",
      href: "/catalogo?category=Medicamentos",
      icon: "/icons/productos.png",
      color: "bg-primary"
    }
  ];

  const benefits = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Calidad Garantizada",
      description: "Reproductores certificados con garantía de salud y genética superior"
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      title: "Asesoría Experta",
      description: "Acompañamiento técnico permanente para el éxito de tu proyecto"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Resultados Comprobados",
      description: "Más de 10 años mejorando la productividad de granjas en todo el Perú"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full">
                <Sparkles className="w-4 h-4 text-secondary mr-2" />
                <span className="text-secondary text-sm font-bold uppercase tracking-wider">
                  Bienvenidos a SAOSINI Shop
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-neutral-900">
                Excelencia en la Crianza de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Cuyes
                </span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-xl">
                Reproductores premium, alimento balanceado y todo lo necesario para que tu emprendimiento alcance su máximo potencial.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/catalogo"
                  className="btn-primary flex items-center justify-center space-x-2 group"
                >
                  <span>Ver Catálogo</span>
                  <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
                <Link
                  href="/nosotros"
                  className="px-6 py-2.5 rounded-lg font-medium bg-white border-2 border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center text-neutral-700"
                >
                  <span>Nuestra Historia</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
                <div>
                  <div className="text-3xl font-bold text-primary">10+</div>
                  <div className="text-sm text-neutral-500">Años de Experiencia</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-neutral-500">Garantía de Salud</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-neutral-500">Clientes Satisfechos</div>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="relative h-[500px] lg:h-[600px]">
              <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-neutral-200">
                <Image
                  src="/hero.png"
                  alt="Cuyes de alta calidad"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-1/2 rounded-3xl overflow-hidden shadow-xl ring-1 ring-neutral-200">
                <Image
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600"
                  alt="Granja de cuyes"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute top-1/2 left-1/4 bg-white p-4 rounded-2xl shadow-xl border border-neutral-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900">Certificados</div>
                    <div className="text-xs text-neutral-500">Genética Premium</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid (Circular Layout) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 space-y-4 md:space-y-0 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 uppercase tracking-tight">Líneas de Productos</h2>
              <p className="text-neutral-600 mt-2">Todo lo que necesitas para una crianza exitosa</p>
            </div>
            <Link href="/catalogo" className="text-primary font-bold flex items-center hover:underline group">
              Explorar todo <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group flex flex-col items-center text-center space-y-6"
              >
                <div className={`w-64 h-64 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 ${cat.color} ring-4 ring-transparent group-hover:ring-primary/20 relative`}>
                  <div className="w-56 h-56 relative">
                    <Image
                      src={cat.icon as string} // Casting to string as we know it's a path now
                      alt={cat.name}
                      fill
                      className="object-contain drop-shadow-md p-4"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-neutral-900 leading-tight group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-neutral-500 text-sm">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              ¿Por qué elegir SAOSINI?
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Más que una tienda, somos tu socio estratégico en el camino hacia una crianza exitosa y rentable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 hover:border-primary/20"
              >
                <div className="bg-primary/10 w-fit p-3 rounded-xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-neutral-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured info / About */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="space-y-4 pt-12">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-md ring-1 ring-neutral-200">
                  <Image src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=400" alt="Cuyes" fill className="object-cover" />
                </div>
                <div className="bg-secondary p-8 rounded-2xl text-white shadow-lg">
                  <h4 className="text-3xl font-bold">10+</h4>
                  <p className="text-xs uppercase tracking-widest mt-1 opacity-90">Años de Exp.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-primary p-8 rounded-2xl text-white shadow-lg">
                  <h4 className="text-3xl font-bold">100%</h4>
                  <p className="text-xs uppercase tracking-widest mt-1 opacity-90">Garantía Salud</p>
                </div>
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-md ring-1 ring-neutral-200">
                  <Image src="https://images.unsplash.com/photo-1545143333-e8bd3346e9d6?auto=format&fit=crop&q=80&w=400" alt="Alimento" fill className="object-cover" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight text-neutral-900">
                Comprometidos con el Éxito de tu <span className="text-primary">Inversión</span>
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Nuestros ejemplares son criados con los más altos estándares de bioseguridad y nutrición.
                No solo vendemos cuyes, entregamos el futuro de tu negocio.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-neutral-900">Asesoría Permanente</h5>
                    <p className="text-neutral-500 text-sm">Te acompañamos en cada paso de tu proyecto de crianza.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <HeartPulse className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-neutral-900">Genética Comprobada</h5>
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

      {/* Testimonials Section */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Centro de Conocimiento
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Artículos técnicos y consejos prácticos para optimizar tu producción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {latestPosts.map((post: any) => (
              <div key={post.id} className="h-full">
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/blog" className="text-primary font-bold hover:underline flex items-center justify-center">
              Ver todos los artículos <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
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
      <section className="py-24 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
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
