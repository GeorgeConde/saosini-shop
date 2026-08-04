import { ComponentType, ReactNode } from 'react';
import AlimentacionArticle from './articles/AlimentacionArticle';
import SeleccionGeneticaArticle from './articles/SeleccionGeneticaArticle';
import EctoparasitosArticle from './articles/EctoparasitosArticle';
import ComoEmpezarArticle from './articles/ComoEmpezarArticle';

// Registry of custom article components
const articleRegistry: Record<string, ComponentType<{ post: any }>> = {
    // Map existing slug to custom component
    'alimentacion-cuyes-zonas-altura-granja-saosini': AlimentacionArticle,
    'seleccion-y-empadre-como-mejorar-la-genetica-de-tu-granja': SeleccionGeneticaArticle,
    'control-ectoparasitos-cuyes': EctoparasitosArticle,
    'como-empezar-crianza-cuyes': ComoEmpezarArticle,
    // Future articles can be added here
};

export function hasCustomArticleComponent(slug: string): boolean {
    return slug in articleRegistry;
}

// Resolves and renders in one step (rather than handing back a component
// type) so callers never hold a component reference inside their own render —
// that pattern trips react-hooks/static-components ("components created
// during render lose their state on every re-render").
export function renderCustomArticle(slug: string, post: any): ReactNode | null {
    const Component = articleRegistry[slug];
    return Component ? <Component post={post} /> : null;
}
