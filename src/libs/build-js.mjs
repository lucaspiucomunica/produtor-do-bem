import * as esbuild from 'esbuild';
import { existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsDir = resolve(__dirname, '../js');
const bundlesDir = resolve(jsDir, 'bundles');
const pagesBundlesDir = resolve(bundlesDir, 'pages');

// Criar diretórios se não existirem
if (!existsSync(bundlesDir)) mkdirSync(bundlesDir, { recursive: true });
if (!existsSync(pagesBundlesDir)) mkdirSync(pagesBundlesDir, { recursive: true });

// Configuração base
const baseConfig = {
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['es2020'],
    logLevel: 'info',
};

// Bundles a serem gerados
const bundles = [
    // Core bundle - scripts normais concatenados
    {
        name: 'core.bundle.min.js',
        entryPoints: [resolve(jsDir, 'entries/core-entry.js')],
        outfile: resolve(bundlesDir, 'core.bundle.min.js'),
        format: 'iife',
    },
    // Transitions bundle - ES Module
    {
        name: 'transitions.bundle.min.js',
        entryPoints: [resolve(jsDir, 'entries/transitions-entry.js')],
        outfile: resolve(bundlesDir, 'transitions.bundle.min.js'),
        format: 'esm',
    },
    // Forms bundle - scripts normais
    {
        name: 'forms.bundle.min.js',
        entryPoints: [resolve(jsDir, 'entries/forms-entry.js')],
        outfile: resolve(bundlesDir, 'forms.bundle.min.js'),
        format: 'iife',
    },
    // Swiper bundle - ES Module
    {
        name: 'swiper.bundle.min.js',
        entryPoints: [resolve(jsDir, 'slides-swiper.js')],
        outfile: resolve(bundlesDir, 'swiper.bundle.min.js'),
        format: 'esm',
    },
    // Page bundles - ES Modules
    {
        name: 'home.bundle.min.js',
        entryPoints: [resolve(jsDir, 'animations/home.js')],
        outfile: resolve(pagesBundlesDir, 'home.bundle.min.js'),
        format: 'esm',
    },
    {
        name: 'quem-somos.bundle.min.js',
        entryPoints: [resolve(jsDir, 'animations/quem-somos.js')],
        outfile: resolve(pagesBundlesDir, 'quem-somos.bundle.min.js'),
        format: 'esm',
    },
    {
        name: 'certificacoes.bundle.min.js',
        entryPoints: [resolve(jsDir, 'animations/certificacoes.js')],
        outfile: resolve(pagesBundlesDir, 'certificacoes.bundle.min.js'),
        format: 'esm',
    },
    {
        name: 'fale-conosco.bundle.min.js',
        entryPoints: [resolve(jsDir, 'entries/fale-conosco-entry.js')],
        outfile: resolve(pagesBundlesDir, 'fale-conosco.bundle.min.js'),
        format: 'esm',
    },
    {
        name: 'protocolos-e-selos.bundle.min.js',
        entryPoints: [resolve(jsDir, 'animations/protocolos-e-selos.js')],
        outfile: resolve(pagesBundlesDir, 'protocolos-e-selos.bundle.min.js'),
        format: 'esm',
    },
    {
        name: 'protocolo.bundle.min.js',
        entryPoints: [resolve(jsDir, 'entries/protocolo-entry.js')],
        outfile: resolve(pagesBundlesDir, 'protocolo.bundle.min.js'),
        format: 'esm',
    },
    {
        name: 'outros-servicos.bundle.min.js',
        entryPoints: [resolve(jsDir, 'animations/outros-servicos.js')],
        outfile: resolve(pagesBundlesDir, 'outros-servicos.bundle.min.js'),
        format: 'esm',
    },
    {
        name: 'faq.bundle.min.js',
        entryPoints: [resolve(jsDir, 'animations/faq.js')],
        outfile: resolve(pagesBundlesDir, 'faq.bundle.min.js'),
        format: 'esm',
    },
    {
        name: 'sou-produtor.bundle.min.js',
        entryPoints: [resolve(jsDir, 'animations/sou-produtor.js')],
        outfile: resolve(pagesBundlesDir, 'sou-produtor.bundle.min.js'),
        format: 'esm',
    },
    {
        name: 'sou-varejista.bundle.min.js',
        entryPoints: [resolve(jsDir, 'animations/sou-varejista.js')],
        outfile: resolve(pagesBundlesDir, 'sou-varejista.bundle.min.js'),
        format: 'esm',
    },
    {
        name: 'sou-consumidor.bundle.min.js',
        entryPoints: [resolve(jsDir, 'animations/sou-consumidor.js')],
        outfile: resolve(pagesBundlesDir, 'sou-consumidor.bundle.min.js'),
        format: 'esm',
    },
];

// Externals - bibliotecas que são carregadas separadamente
const externals = ['gsap', 'ScrollTrigger', 'ScrollSmoother', 'SplitText', 'Swiper'];

// Watch mode
const isWatch = process.argv.includes('--watch');

async function build() {
    console.log('🔨 Building JS bundles...\n');

    for (const bundle of bundles) {
        try {
            const config = {
                ...baseConfig,
                entryPoints: bundle.entryPoints,
                outfile: bundle.outfile,
                format: bundle.format,
                globalName: bundle.globalName,
                external: externals,
            };

            if (isWatch) {
                const ctx = await esbuild.context(config);
                await ctx.watch();
                console.log(`👀 Watching: ${bundle.name}`);
            } else {
                await esbuild.build(config);
                console.log(`✅ Built: ${bundle.name}`);
            }
        } catch (error) {
            console.error(`❌ Error building ${bundle.name}:`, error);
            process.exit(1);
        }
    }

    if (!isWatch) {
        console.log('\n✨ All bundles built successfully!');
    }
}

build();

