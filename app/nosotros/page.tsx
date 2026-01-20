
export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img
                    src="https://images.unsplash.com/photo-1591871963053-7619c45b7041?q=80&w=2670&auto=format&fit=crop"
                    alt="Granja de Cuyes"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-30"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Nuestra Historia</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Dedicados a la crianza responsable y sostenible de cuyes de alta calidad genética, brindando productos saludables y apoyo a nuestra comunidad.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 text-center">
                <h3 className="text-2xl font-bold text-gray-900">Sobre Nosotros</h3>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    En la Granja Saosini, nos enorgullece ofrecer los mejores productos derivados de la crianza de cuyes.
                    Desde reproductores de raza hasta alimento balanceado, nuestro compromiso es la excelencia y el bienestar animal.
                </p>
            </div>
        </div>
    )
}
