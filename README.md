# Farutech Design System SDK

Un sistema de diseño independiente para aplicaciones Farutech, con versionado por ambientes y distribución automatizada.

**Repositorio:** https://github.com/faridmaloof/farutech-design-system

## 🚀 Características

- **Componentes UI reutilizables**: Botones, formularios y más
- **Hooks personalizados**: Autenticación, navegación, etc.
- **Utilidades comunes**: Constructores de URL, helpers
- **Versionado inteligente**: Por fecha y ambiente (dev/qa/staging/prod)
- **Distribución automatizada**: CI/CD con GitHub Actions
- **TypeScript completo**: Tipos incluidos

## 📦 Instalación

```bash
# Instalar desde GitHub Packages
npm install @farutech/design-system@latest

# O versiones específicas por ambiente
npm install @farutech/design-system@dev      # Desarrollo
npm install @farutech/design-system@qa       # QA
npm install @farutech/design-system@staging  # Staging
npm install @farutech/design-system@latest   # Producción
```

### Configuración de .npmrc

Agrega esto a tu `.npmrc`:

```
@farutech:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

## 📚 Uso

### Componentes

```tsx
import { Button } from '@farutech/design-system';

function App() {
  return (
    <Button variant="primary" size="lg">
      Click me!
    </Button>
  );
}
```

### Hooks

```tsx
import { useAuth } from '@farutech/design-system';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={() => login('user', 'pass')}>Login</button>;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

### Utilidades

```tsx
import { createUrl } from '@farutech/design-system';

const url = createUrl('https://api.example.com')
  .addParam('page', '1')
  .addParam('limit', '10')
  .build();
// Resultado: https://api.example.com?page=1&limit=10
```

## 🛠️ Desarrollo

### Scripts disponibles

```bash
npm run dev          # Desarrollo con watch
npm run build        # Build de producción
npm run test         # Ejecutar tests
npm run lint         # Linting
```

### Versionado

El SDK usa versionado inteligente basado en fecha:

- **Dev**: `2026.01.31.0-alpha.1` (incremental)
- **QA**: `2026.01.31.0-beta.1` (promocionado)
- **Staging**: `2026.01.31.0-rc.1` (promocionado)
- **Prod**: `2026.01.31.0` (release final)

### Flujo de promoción

```
feature/branch → dev → qa → staging → main (prod)
      ↓           ↓       ↓       ↓       ↓
   alpha      alpha    beta     rc     latest
```

## 🤖 CLI

Instala el CLI globalmente:

```bash
npm install -g @farutech/design-system
```

Comandos disponibles:

```bash
farutech-sdk init          # Inicializar SDK en proyecto
farutech-sdk update <env>  # Actualizar a versión de ambiente
farutech-sdk status        # Ver estado actual
```

## 📊 Dashboard de Versiones

```tsx
import { SDKVersionDashboard } from '@farutech/design-system';

function AdminPanel() {
  return <SDKVersionDashboard />;
}
```

## 📈 Analytics

```tsx
import { AnalyticsDashboard } from '@farutech/design-system';

function Reports() {
  return <AnalyticsDashboard />;
}
```

## 🏗️ Arquitectura

```
src/
├── components/     # Componentes UI
├── hooks/         # Hooks personalizados
├── utils/         # Utilidades
└── index.ts       # Punto de entrada
```

## 🤝 Contribución

1. Crea un branch desde `dev`
2. Implementa tus cambios
3. Push a `dev` (publicación automática)
4. Crea PR a `qa` para testing
5. Promoción manual a través de workflows

## 📄 Licencia

Propiedad de Farutech - Uso interno únicamente.
