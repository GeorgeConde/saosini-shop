import { ComponentType } from 'react';
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

export function getCustomArticleComponent(slug: string): ComponentType<{ post: any }> | null {
    return articleRegistry[slug] || null;
}
