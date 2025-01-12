<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Lista de Cursos</h1>
    <div v-if="cursos.length" class="row">
      <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mb-4"
          v-for="curso in cursos"
          :key="curso.id"
      >
        <div class="card shadow-sm h-100">
          <!-- Imagen del curso -->
          <div class="image-container">
            <img :src="curso.img" class="card-img-top" alt="Imagen del curso" />
          </div>
          <!-- Contenido de la tarjeta -->
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ curso.nombre }}</h5>
            <!-- Línea de tiempo -->
            <div class="timeline">
              <div class="timeline-item">
                <div class="circle purple"></div>
                <div class="timeline-content">
                  <strong>Costo:</strong> {{ formatCurrency(curso.costo) }}<br />
                  <strong>Duración:</strong> {{ curso.duracion }}
                </div>
              </div>
              <div class="timeline-item">
                <div class="circle green"></div>
                <div class="timeline-content">
                  <strong>Cupos:</strong> {{ curso.cupos }}<br />
                  <strong>Completado:</strong> {{ curso.completado ? "Sí" : "No" }}
                </div>
              </div>
              <div class="timeline-item">
                <div class="circle purple"></div>
                <div class="timeline-content">
                  <strong>Fecha de Registro:</strong> {{ curso.fecha_registro }}
                </div>
              </div>
              <div class="timeline-item">
                <div class="circle green"></div>
                <div class="timeline-content">
                  <strong>Descripción:</strong> {{ curso.descripcion }}
                </div>
              </div>
            </div>
            <button
                class="btn btn-primary btn-sm mt-auto custom-btn"
                @click="$router.push(`/course/${curso.id}`)"
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-info text-center mt-4">
      No hay cursos disponibles en este momento.
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["cursos"]), // Obtiene los cursos desde el store
  },
  created() {
    // Carga los cursos al cargar la vista
    this.$store.dispatch("obtenerCursos").catch((error) => {
      console.error("Error al cargar los cursos:", error);
      alert("No se pudo cargar la lista de cursos.");
    });
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(value);
    },
  },
};
</script>
<style scoped>
/* Estilo general para tarjetas */
.card {
  width: 100%;
  max-width: 370px;
  height: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  border: 4px solid #8e44ad;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  background-color: #fff;
}

/* Hover effect */
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: #5e3370;
}

/* Imagen responsiva */
.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Contenido de la tarjeta */
.card-body {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.card-title {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
  text-align: center;
}

.timeline {
  border-left: 2px solid #ccc;
  margin: 20px 0;
  padding-left: 20px;
}

.timeline-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.custom-btn {
  background-color: #8e44ad;
  border: 1px solid #8e44ad;
  color: #fff;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.custom-btn:hover {
  background-color: #e67e22;
  border-color: #e67e22;
  color: #fff;
}

.custom-btn:disabled {
  background-color: #dcdcdc;
  border-color: #dcdcdc;
  color: #888;
  cursor: not-allowed;
}

.circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
}

.circle.purple {
  background-color: #8e44ad;
}

.circle.green {
  background-color: #27ae60;
}

.timeline-content {
  font-size: 0.9rem;
}

button {
  margin-top: 10px;
}

@media (max-width: 576px) {
  .card {
    max-width: 100%;
    height: auto;
  }

  .image-container {
    height: 180px;
  }
}
</style>