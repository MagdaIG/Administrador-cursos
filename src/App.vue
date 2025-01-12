<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-morado shadow-sm">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Gestión de Cursos</router-link>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link
                  class="nav-link"
                  to="/"
                  exact-active-class="active-link"
              >
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                  class="nav-link"
                  to="/admin"
                  exact-active-class="active-link"
              >
                Administración
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <div class="content py-4">
      <router-view />
    </div>

    <!-- Footer -->
    <footer class="footer text-white text-center py-3 mt-auto">
      <div class="container">
        <p class="mb-1">
          Hecho por <strong>Magdalena Inalaf G.</strong>
        </p>
        <p class="mb-0">
          Desarrollado con Vue | Todos los derechos reservados
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.bg-morado {
  background-color: #8e44ad !important;
}

.navbar-dark .navbar-brand,
.navbar-dark .nav-link {
  color: #ffffff !important;
}

.navbar-dark .nav-link:hover {
  color: #f39c12 !important;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.nav-link {
  font-size: 1.1rem;
  padding: 10px 15px;
  transition: color 0.3s ease;
}

.active-link {
  text-decoration: underline;
  font-weight: bold;
}

body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #ffffff, #d9c5f1); /* Fondo blanco a morado claro */
}

.content {
  min-height: calc(100vh - 112px);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Footer */
.footer {
  background-color: #8e44ad;
  color: #fff;
  font-size: 0.9rem;
  border-top: 4px solid #5e3370;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
}

.footer strong {
  font-weight: bold;
}

html,
body,
#app {
  height: 100%;
}

.container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>