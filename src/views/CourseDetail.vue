<template>
  <div class="container mt-4">
    <!-- Mostrar un indicador de carga mientras se obtienen los datos -->
    <div v-if="isLoading" class="text-center mt-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p>Cargando curso...</p>
    </div>

    <!-- Mostrar el curso si está disponible -->
    <div v-else-if="curso" class="card mx-auto shadow-sm card-border">
      <img :src="curso.img" class="card-img-top" alt="Imagen del curso" />
      <div class="card-body">
        <h5 class="card-title">{{ curso.nombre }}</h5>
        <!-- Timeline -->
        <div class="timeline">
          <div class="timeline-item">
            <div class="circle purple"></div>
            <div class="timeline-content">
              <strong>Costo:</strong> {{ formatCurrency(curso.costo) }}
            </div>
          </div>
          <div class="timeline-item">
            <div class="circle green"></div>
            <div class="timeline-content">
              <strong>Duración:</strong> {{ curso.duracion }}
            </div>
          </div>
          <div class="timeline-item">
            <div class="circle purple"></div>
            <div class="timeline-content">
              <strong>Cupos:</strong> {{ curso.cupos }}
            </div>
          </div>
          <div class="timeline-item">
            <div class="circle green"></div>
            <div class="timeline-content">
              <strong>Inscritos:</strong> {{ curso.inscritos }}
            </div>
          </div>
          <div class="timeline-item">
            <div class="circle purple"></div>
            <div class="timeline-content">
              <strong>Completado:</strong>
              <span :class="curso.completado ? 'text-success' : 'text-danger'">
                {{ curso.completado ? "Sí" : "No" }}
              </span>
            </div>
          </div>
          <div class="timeline-item">
            <div class="circle green"></div>
            <div class="timeline-content">
              <strong>Fecha de Registro:</strong> {{ curso.fecha_registro }}
            </div>
          </div>
          <div class="timeline-item">
            <div class="circle purple"></div>
            <div class="timeline-content">
              <strong>Descripción:</strong> {{ curso.descripcion }}
            </div>
          </div>
        </div>
        <!-- Botón de regreso -->
        <div class="d-flex justify-content-center">
          <button class="btn btn-morado btn-lg mt-3" @click="$router.push('/')">Volver</button>
        </div>
      </div>
    </div>

    <!-- Mostrar mensaje de error si el curso no está disponible -->
    <div v-else class="alert alert-danger text-center mt-4">
      <p>El curso solicitado no existe o no está disponible.</p>
      <button class="btn btn-morado btn-lg" @click="$router.push('/')">Volver al inicio</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      curso: null,
    };
  },
  watch: {
    "$store.state.cursos": {
      handler() {
        this.filtrarCurso();
      },
      immediate: true,
    },
  },
  created() {
    if (!this.$store.state.cursos || this.$store.state.cursos.length === 0) {
      this.$store
          .dispatch("obtenerCursos")
          .then(() => {
            this.filtrarCurso();
          })
          .catch((error) => {
            console.error("Error al cargar los cursos:", error);
            alert("No se pudo cargar la lista de cursos.");
          })
          .finally(() => {
            this.isLoading = false;
          });
    } else {
      this.filtrarCurso();
      this.isLoading = false;
    }
  },
  methods: {
    filtrarCurso() {
      const id = this.$route.params.id;
      this.curso = this.$store.state.cursos.find((c) => c.id === id) || null;
    },
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
/* Spinner de carga */
.spinner-border {
  width: 3rem;
  height: 3rem;
}

.spinner-border + p {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: 500;
}

/* Card general */
.card {
  max-width: 500px;
  border-radius: 10px;
  border: 3px solid #8e44ad; /* Borde morado */
  overflow: hidden;
  margin: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Contenedor de imagen responsivo */
.card-img-container {
  width: 100%;
  height: auto; /* Permitir altura automática */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9; /* Fondo opcional para resaltar las imágenes */
}

/* Imagen dentro del contenedor */
.card-img-top {
  width: auto; /* Ajusta el ancho de forma automática */
  max-width: 100%; /* Limita el tamaño al ancho del contenedor */
  max-height: 200px; /* Limita la altura máxima */
  object-fit: contain; /* Evita cortes en la imagen */
}

/* Timeline */
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

/* Botón morado */
.btn-morado {
  background-color: #8e44ad;
  color: white;
  border: 2px solid #8e44ad;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-morado:hover {
  background-color: #f39c12;
  color: white;
  border-color: #f39c12;
}
</style>