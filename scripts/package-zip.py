import os
import zipfile

files = [
    'metadata.json', '.env.example', '.gitignore', 'package.json',
    'tsconfig.json', 'vite.config.ts', 'next.config.mjs', 'postcss.config.mjs',
    'server.ts', 'index.html', 'scripts/build-standalone.mjs', 'scripts/start-dev.mjs',
    'scripts/package-zip.py', 'src/index.css', 'src/types.ts', 'src/utils/financialMath.ts',
    'src/utils/pdfExport.ts', 'src/data/niches.ts', 'src/components/Logo.tsx',
    'src/components/Toast.tsx', 'src/components/AdBannerSlot.tsx', 'src/components/AdBanner.jsx',
    'src/components/SEO.tsx', 'src/components/SEO.jsx', 'src/components/AuthorTrustBlock.tsx',
    'src/components/CitationSection.tsx', 'src/components/SchemaJsonLd.tsx',
    'src/components/HeroSection.tsx', 'src/components/CalculatorControlPanel.tsx',
    'src/components/TrajectoryChart.tsx', 'src/components/ResultsDashboard.tsx',
    'src/components/SaaSMonetizationCard.tsx', 'src/components/CompareScenarioModal.tsx',
    'src/components/VercelConfigModal.tsx', 'src/components/UtilityActions.tsx',
    'src/components/HeaderNav.tsx', 'src/components/Footer.tsx',
    'src/components/SemanticFormulasAndGlossary.tsx', 'src/components/LegalAndStaticPagesModal.tsx',
    'src/components/EditorialNicheContent.tsx', 'src/components/SaaSCalculator.tsx',
    'src/App.tsx', 'src/main.tsx', 'app/layout.tsx', 'app/page.tsx', 'app/not-found.tsx',
    'app/robots.ts', 'app/sitemap.ts', 'app/global-error.tsx', 'app/[industry]/page.tsx',
    'app/privacy/page.tsx', 'app/terms/page.tsx', 'app/disclaimer/page.tsx', 'app/contact/page.tsx',
    'public/manifest.json', 'public/robots.txt', 'public/sitemap.xml', 'public/favicon.svg',
    'public/icon.svg', 'public/logo.svg', 'public/logo-light.svg', 'public/logo-dark.svg',
    'public/og-image.svg'
]

os.makedirs('public', exist_ok=True)
zip_path = 'public/project.zip'

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in files:
        if os.path.exists(file):
            zipf.write(file, file)

print(f"Updated ZIP generated successfully: {os.path.getsize(zip_path)} bytes ({len(files)} files)")
