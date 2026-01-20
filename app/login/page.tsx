
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al inicio
                </Link>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Inicia sesión en tu cuenta
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Correo electrónico
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-primary hover:text-primary-dark">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-stone-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    ¿No tienes una cuenta?{' '}
                    <a href="#" className="font-semibold leading-6 text-stone-800 hover:text-stone-700">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    )
}
