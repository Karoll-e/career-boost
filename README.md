# Career-Boost 🚀

## Proyecto Final - Análisis y Desarrollo de Sistemas de Información (ADSO)
### SENA - Servicio Nacional de Aprendizaje

---

## 📋 Información del Proyecto

**Nombre del Proyecto:** Career-Boost - Plataforma de Preparación para Entrevistas Tecnológicas  
**Programa de Formación:** Análisis y Desarrollo de Sistemas de Información (ADSO)  
**Modalidad:** Proyecto Final de Titulación  
**Tecnologías Principales:** React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Inteligencia Artificial (Google Gemini)

---

## 🎯 Descripción del Proyecto

Career-Boost es una plataforma web que utiliza inteligencia artificial para ayudar a profesionales de tecnología a prepararse para entrevistas laborales. La aplicación genera preguntas personalizadas basadas en el rol específico, nivel de experiencia y tecnologías del usuario, proporcionando una experiencia de preparación completamente adaptada.

### Problema Identificado
Los profesionales de tecnología enfrentan dificultades para prepararse efectivamente para entrevistas técnicas debido a:
- Falta de preguntas específicas por rol y tecnología
- Ausencia de retroalimentación personalizada
- Limitado acceso a recursos de preparación actualizados
- Dificultad para evaluar el nivel de preparación

### Solución Propuesta
Una plataforma inteligente que:
- Genera preguntas técnicas personalizadas usando IA
- Adapta el contenido según el rol y experiencia del usuario
- Proporciona respuestas detalladas y explicaciones
- Permite seguimiento del progreso de preparación
- Ofrece soporte multiidioma (Español/Inglés)

---

## 🏗️ Arquitectura del Sistema

### Arquitectura General
```
┌─────────────────┐    API REST    ┌──────────────────┐
│   React SPA     │◄──────────────►│  Express.js API  │
│   (Frontend)    │                │    (Backend)     │
└─────────────────┘                └──────────────────┘
         │                                   │
         │                                   │
         ▼                                   ▼
┌─────────────────┐                ┌──────────────────┐
│  LocalStorage   │                │     MongoDB      │
│  Browser APIs   │                │    (Database)    │
└─────────────────┘                └──────────────────┘
                                            │
                                            ▼
                                   ┌──────────────────┐
                                   │  Google Gemini   │
                                   │      AI API      │
                                   └──────────────────┘
```

### Patrones de Diseño Implementados
- **MVC (Modelo-Vista-Controlador):** Separación clara de responsabilidades
- **Repository Pattern:** Abstracción de operaciones de base de datos
- **Provider Pattern:** Manejo de estado global con React Context
- **Componentes de Orden Superior:** Protección de rutas autenticadas

---

## 💻 Stack Tecnológico

### Frontend
- **React 19.1.0** - Biblioteca principal para UI
- **Vite 6.3.5** - Herramienta de construcción y desarrollo
- **Tailwind CSS 4.1.10** - Framework de estilos utility-first
- **React Router DOM 7.6.2** - Enrutamiento del lado del cliente
- **Framer Motion 12.18.1** - Animaciones y transiciones
- **Axios 1.10.0** - Cliente HTTP para APIs
- **i18next** - Internacionalización y localización

### Backend
- **Node.js + Express.js 5.1.0** - Servidor y framework web
- **MongoDB + Mongoose 8.16.0** - Base de datos NoSQL y ODM
- **JWT + bcryptjs** - Autenticación y seguridad
- **Google Gemini AI** - Integración de inteligencia artificial

### Herramientas de Desarrollo
- **ESLint 9.25.0** - Análisis estático de código
- **Git** - Control de versiones
- **npm** - Gestión de paquetes

---

## ⚡ Funcionalidades Principales

### 1. Sistema de Gestión de Usuarios
- Registro e inicio de sesión seguro
- Autenticación basada en tokens JWT
- Persistencia de sesión en navegador

### 2. Generador Inteligente de Preguntas
- **24+ roles de TI** disponibles (Desarrollador, Ingeniero, Product Manager, etc.)
- **6 niveles de experiencia** (Principiante → Principal)
- **100+ tecnologías** cubiertas (React, Python, AWS, etc.)
- Generación personalizada usando IA de Google Gemini

### 3. Sesiones de Entrevista Interactivas
- Creación de sesiones personalizadas
- Funcionalidad de marcar preguntas importantes
- Generación de explicacion a profundidad
- Adiccion de recursos externos para profundizar en cada tema

---

## 🗄️ Modelo de Base de Datos

### Esquema Principal

```javascript
// Modelo Usuario
User {
  name: String,
  email: String (único, indexado),
  password: String (hasheado),
  profileImageUrl: String,
  createdAt: Date,
  updatedAt: Date
}

// Modelo Sesión
Session {
  user: ObjectId (referencia a User),
  role: String,
  experience: String,
  topicsToFocus: String,
  description: String,
  questions: [ObjectId] (referencia a Question),
  lastAccessedAt: Date,
  createdAt: Date,
  updatedAt: Date
}

// Modelo Pregunta
Question {
  session: ObjectId (referencia a Session),
  question: String,
  answer: String,
  note: String,
  isPinned: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛡️ Características de Seguridad

### Implementaciones de Seguridad
- **Autenticación JWT:** Tokens seguros con expiración
- **Hash de Contraseñas:** Implementación con bcryptjs
- **Protección de Rutas:** Middleware de autenticación
- **Validación de Entrada:** Sanitización de datos del usuario
- **CORS:** Configuración de origen cruzado
- **Manejo Seguro de Archivos:** Validación de tipos de archivo

---

## 📱 Características de UX/UI

### Diseño Responsivo
- **Mobile-First:** Optimizado para dispositivos móviles
- **Diseño Adaptable:** Compatible con tablets y desktop
- **Componentes Reutilizables:** Biblioteca de componentes consistente

### Experiencia de Usuario
- **Estados de Carga:** Feedback visual durante operaciones
- **Manejo de Errores:** Mensajes informativos y recuperación
- **Navegación Intuitiva:** Flujo de usuario optimizado
- **Animaciones Fluidas:** Transiciones con Framer Motion

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- MongoDB (local o Atlas)
- npm o yarn
- Clave API de Google Gemini

### Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd career-boost
```

2. **Configurar Backend**
```bash
cd backend
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_jwt_secreta
GEMINI_API_KEY=tu_clave_api_gemini
PORT=5000
```

4. **Configurar Frontend**
```bash
cd ../frontend
npm install
```

5. **Ejecutar la aplicación**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend/career-boost
npm run dev
```

---

## 📊 Logros Técnicos Destacados

### Innovación Tecnológica
✅ **Integración Avanzada de IA:** Uso sofisticado de Google Gemini para generación de contenido  
✅ **Motor de Personalización:** Algoritmo complejo considerando rol, experiencia y tecnologías  
✅ **Arquitectura Moderna:** Implementación de patrones React avanzados  
✅ **Seguridad Empresarial:** Autenticación y autorización robustas  
✅ **Internacionalización Completa:** Soporte multiidioma integral  

### Calidad de Código
✅ **Arquitectura Limpia:** Separación clara de responsabilidades  
✅ **Componentes Reutilizables:** Diseño atómico implementado  
✅ **Gestión de Estado:** Context API y hooks personalizados  
✅ **Optimización de Rendimiento:** Code splitting y bundles optimizados  
✅ **Organización Consistente:** Convenciones de nomenclatura y estructura  

---

## 🎓 Competencias ADSO Demostradas

### Análisis y Diseño de Sistemas
- Identificación y análisis de requisitos funcionales y no funcionales
- Diseño de arquitectura de software escalable
- Modelado de base de datos relacional y no relacional
- Documentación técnica completa del sistema

### Desarrollo de Software
- Programación en múltiples lenguajes (JavaScript, HTML, CSS)
- Implementación de patrones de diseño de software
- Desarrollo Frontend con frameworks modernos (React)
- Desarrollo Backend con APIs RESTful (Node.js/Express)

### Gestión de Bases de Datos
- Diseño e implementación de esquemas de datos
- Optimización de consultas y rendimiento
- Implementación de relaciones entre entidades
- Manejo de transacciones y integridad de datos

### Integración de Tecnologías
- Consumo de APIs externas (Google Gemini AI)
- Integración de servicios de terceros
- Implementación de autenticación y autorización
- Manejo de archivos y recursos multimedia

### Calidad y Seguridad
- Implementación de medidas de seguridad en aplicaciones web
- Validación y sanitización de datos de entrada
- Manejo de errores y excepciones
- Buenas prácticas de desarrollo seguro

---



## 📞 Información de Contacto

**Desarrollador:** Karoll Marcela Escalante Gazabón
**Programa:** Análisis y Desarrollo de Sistemas de Información (ADSO)  
**Institución:** SENA - Servicio Nacional de Aprendizaje  
**Email:** karollescalante@gmail.com  
**LinkedIn:** https://www.linkedin.com/in/karollescalanteg/  
**GitHub:** https://github.com/Karoll-e

---

## 📄 Licencia y Derechos

Este proyecto fue desarrollado como parte del programa de formación ADSO del SENA, cumpliendo con todos los requisitos técnicos y pedagógicos establecidos para proyectos de titulación. El código fuente y la documentación están disponibles para fines educativos y de evaluación académica.

---

**© 2025 Career-Boost - Proyecto Final ADSO SENA**
