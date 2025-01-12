<template>
  <!-- Modal para agregar curso -->
  <div
      class="modal fade"
      id="addCourseModal"
      tabindex="-1"
      aria-labelledby="addCourseModalLabel"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-morado shadow-lg">
        <div class="modal-header bg-morado text-white">
          <h5 class="modal-title" id="addCourseModalLabel">Agregar Curso</h5>
          <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
          ></button>
        </div>
        <div class="modal-body bg-light p-4 rounded">
          <form @submit.prevent="agregarCurso">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="nombre" class="form-label text-morado">Nombre</label>
                <input
                    v-model="nuevoCurso.nombre"
                    type="text"
                    id="nombre"
                    class="form-control"
                    required
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="imagen" class="form-label text-morado">URL de la Imagen</label>
                <input
                    v-model="nuevoCurso.img"
                    type="text"
                    id="imagen"
                    class="form-control"
                    required
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cupos" class="form-label text-morado">Cupos</label>
                <input
                    v-model.number="nuevoCurso.cupos"
                    type="number"
                    id="cupos"
                    class="form-control"
                    required
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="inscritos" class="form-label text-morado">Inscritos</label>
                <input
                    v-model.number="nuevoCurso.inscritos"
                    type="number"
                    id="inscritos"
                    class="form-control"
                    required
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="duracion" class="form-label text-morado">Duración</label>
                <input
                    v-model="nuevoCurso.duracion"
                    type="text"
                    id="duracion"
                    class="form-control"
                    required
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="costo" class="form-label text-morado">Costo</label>
                <input
                    v-model.number="nuevoCurso.costo"
                    type="number"
                    id="costo"
                    class="form-control"
                    required
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="descripcion" class="form-label text-morado">Descripción</label>
              <textarea
                  v-model="nuevoCurso.descripcion"
                  id="descripcion"
                  class="form-control"
                  rows="3"
                  required
              ></textarea>
            </div>
            <div class="modal-footer d-flex justify-content-end">
              <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-morado">Guardar Curso</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-4">
    <h1 class="text-center mb-4">Administración</h1>

    <!-- Card de agregar curso -->
    <div class="card mb-4 shadow-sm p-3">
      <div class="card-body text-center">
        <h5 class="card-title mb-3">¿Quieres agregar un curso?</h5>
        <button
            class="btn btn-morado"
            data-bs-toggle="modal"
            data-bs-target="#addCourseModal"
        >
          Agregar Curso
        </button>
      </div>
    </div>

    <!-- Tabla de cursos -->
    <table class="table table-striped" v-if="cursos.length">
      <thead class="thead-dark">
      <tr>
        <th>Curso</th>
        <th>Cupos</th>
        <th>Inscritos</th>
        <th>Duración</th>
        <th>Costo</th>
        <th>Terminado</th>
        <th>Fecha</th>
        <th>Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="curso in cursos" :key="curso.id">
        <td>{{ curso.nombre }}</td>
        <td>{{ curso.cupos }}</td>
        <td>{{ curso.inscritos }}</td>
        <td>{{ curso.duracion }}</td>
        <td>
          <span class="badge bg-amarillo">{{ formatCurrency(curso.costo) }}</span>
        </td>
        <td>
            <span :class="curso.completado ? 'badge bg-success' : 'badge bg-secondary'">
              {{ curso.completado ? "Sí" : "No" }}
            </span>
        </td>
        <td>
          <span class="badge bg-verde">{{ curso.fecha_registro }}</span>
        </td>
        <td>
          <button
              class="btn btn-warning btn-sm me-2"
              @click="$router.push(`/edit-course/${curso.id}`)"
          >
            Editar
          </button>
          <button
              class="btn btn-danger btn-sm"
              @click="confirmarEliminar(curso.id)"
          >
            Eliminar
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Mensaje cuando no hay cursos -->
    <div v-else class="alert alert-warning text-center">
      No hay cursos disponibles. Agrega uno nuevo.
    </div>

    <!-- Mensajes informativos -->
    <div class="info-messages mt-4">
      <div class="alert alert-purple">
        <i class="fas fa-users"></i> Cantidad total de alumnos permitidos:
        <strong>{{ totalAlumnosPermitidos }}</strong> alumnos.
      </div>
      <div class="alert alert-blue">
        <i class="fas fa-user-check"></i> Cantidad total de alumnos inscritos:
        <strong>{{ totalAlumnosInscritos }}</strong> alumnos.
      </div>
      <div class="alert alert-red">
        <i class="fas fa-user-minus"></i> Cantidad total de cupos restantes:
        <strong>{{ totalCuposRestantes }}</strong> alumnos.
      </div>
      <div class="alert alert-danger">
        <i class="fas fa-ban"></i> Cantidad total de cursos terminados:
        <strong>{{ totalCursosTerminados }}</strong> cursos.
      </div>
      <div class="alert alert-warning">
        <i class="fas fa-bell"></i> Cantidad total de cursos activos:
        <strong>{{ totalCursosActivos }}</strong> cursos.
      </div>
      <div class="alert alert-orange">
        <i class="fas fa-book"></i> Cantidad total de cursos:
        <strong>{{ totalCursos }}</strong> cursos.
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import * as bootstrap from "bootstrap";

export default {
  data() {
    return {
      nuevoCurso: {
        nombre: "",
        img: "",
        cupos: 0,
        inscritos: 0,
        duracion: "",
        costo: 0,
        descripcion: "",
        completado: false,
        fecha_registro: "",
      },
    };
  },
  computed: {
    ...mapState(["cursos"]),
    ...mapGetters([
      "totalAlumnosPermitidos",
      "totalAlumnosInscritos",
      "totalCuposRestantes",
      "totalCursosTerminados",
      "totalCursosActivos",
      "totalCursos",
    ]),
  },
  async mounted() {
    try {
      await this.$store.dispatch("obtenerCursos");
    } catch (error) {
      console.error("Error al cargar los cursos:", error);
    }
  },
  methods: {
    async agregarCurso() {
      if (this.nuevoCurso.inscritos > this.nuevoCurso.cupos) {
        alert("Los inscritos no pueden ser mayores que los cupos disponibles.");
        return;
      }
      const fechaActual = new Date().toISOString().split("T")[0];
      this.nuevoCurso.fecha_registro = fechaActual;

      try {
        await this.$store.dispatch("agregarCurso", this.nuevoCurso);
        alert("Curso agregado correctamente.");
        this.limpiarFormulario();

        const modalElement = document.getElementById("addCourseModal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
        document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
          backdrop.remove();
        });
      } catch (error) {
        alert("Error al agregar el curso. Por favor, inténtalo nuevamente.");
        console.error("Error en agregarCurso del componente:", error);
      }
    },
    limpiarFormulario() {
      this.nuevoCurso = {
        id: null,
        nombre: "",
        img: "",
        cupos: 0,
        inscritos: 0,
        duracion: "",
        costo: 0,
        descripcion: "",
        completado: false,
        fecha_registro: "",
      };
    },
    async confirmarEliminar(id) {
      if (confirm("¿Estás seguro de que quieres eliminar este curso?")) {
        try {
          await this.$store.dispatch("eliminarCurso", id);
          alert("Curso eliminado correctamente.");
        } catch (error) {
          alert("Error al eliminar el curso.");
          console.error(error);
        }
      }
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
/* Botón morado con hover naranja */
.btn-morado {
  background-color: #8e44ad;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-morado:hover {
  background-color: #f39c12;
  color: white;
}

/* Badges */
.badge.bg-amarillo {
  background-color: #f1c40f;
  color: #fff;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 8px;
}

.badge.bg-verde {
  background-color: #27ae60;
  color: #fff;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 8px;
}

/* Mensajes informativos */
.alert {
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  font-size: 1rem;
}

.alert i {
  margin-right: 10px;
}

.alert-purple {
  background-color: #f5e6f7;
  color: #8e44ad;
  border: 1px solid #8e44ad;
}

.alert-blue {
  background-color: #e7f4fc;
  color: #3498db;
  border: 1px solid #3498db;
}

.alert-red {
  background-color: #fdecea;
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

.alert-danger {
  background-color: #fbe3e3;
  color: #c0392b;
  border: 1px solid #c0392b;
}

.alert-warning {
  background-color: #fff8e6;
  color: #f39c12;
  border: 1px solid #f39c12;
}

.alert-orange {
  background-color: #fff3e6;
  color: #e67e22;
  border: 1px solid #e67e22;
}

/* Estilos de card */
.card {
  border: 2px solid #8e44ad;
  border-radius: 8px;
  background-color: white;
}

/* Estilo modal */
.modal-content {
  border-radius: 10px;
  border: 2px solid #8e44ad; /* Borde morado */
}

.modal-header {
  background-color: #8e44ad;
  color: white;
}

.btn-close-white {
  filter: brightness(0) invert(1);
}
</style>