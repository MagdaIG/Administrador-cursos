<template>
  <div class="container mt-4">
    <!-- Card para el título -->
    <div class="card bg-morado text-white text-center mb-4 shadow-sm">
      <div class="card-body">
        <h1 class="card-title">Editar Curso</h1>
      </div>
    </div>

    <!-- Formulario para editar curso -->
    <form @submit.prevent="guardarCambios" class="shadow-sm p-4 bg-white rounded">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input
              v-model="cursoEditado.nombre"
              type="text"
              id="nombre"
              class="form-control"
              maxlength="40"
              required
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="imagen" class="form-label">URL de la Imagen</label>
          <input
              v-model="cursoEditado.img"
              type="text"
              id="imagen"
              class="form-control"
              required
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="cupos" class="form-label">Cupos del Curso</label>
          <input
              v-model.number="cursoEditado.cupos"
              type="number"
              id="cupos"
              class="form-control"
              required
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="inscritos" class="form-label">Inscritos</label>
          <input
              v-model.number="cursoEditado.inscritos"
              type="number"
              id="inscritos"
              class="form-control"
              :max="cursoEditado.cupos"
              required
          />
          <small class="text-danger" v-if="cursoEditado.inscritos > cursoEditado.cupos">
            Los inscritos no pueden ser mayores que los cupos disponibles.
          </small>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="duracion" class="form-label">Duración del Curso</label>
          <input
              v-model="cursoEditado.duracion"
              type="text"
              id="duracion"
              class="form-control"
              required
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="costo" class="form-label">Costo del Curso</label>
          <input
              v-model.number="cursoEditado.costo"
              type="number"
              id="costo"
              class="form-control"
              required
          />
        </div>
      </div>
      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <textarea
            v-model="cursoEditado.descripcion"
            id="descripcion"
            class="form-control"
            rows="3"
            required
        ></textarea>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="fecha" class="form-label">Fecha de Registro</label>
          <input
              v-model="cursoEditado.fecha_registro"
              type="date"
              id="fecha"
              class="form-control"
              required
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="estado" class="form-label">Estado</label>
          <select
              v-model="cursoEditado.completado"
              id="estado"
              class="form-select"
              @change="ajustarEstado"
          >
            <option :value="false">Activo</option>
            <option :value="true">Terminado</option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-secondary" @click="$router.push('/admin')">
          Cerrar
        </button>
        <button type="submit" class="btn btn-morado">Guardar Cambios</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      cursoEditado: null,
    };
  },
  computed: {
    ...mapState(["cursos"]),
  },
  created() {
    const id = this.$route.params.id;
    const curso = this.cursos.find(c => c.id === id);
    if (curso) {
      this.cursoEditado = { ...curso };
    } else {
      alert("El curso no existe");
      this.$router.push("/admin");
    }
  },
  methods: {
    async guardarCambios() {
      if (this.cursoEditado.inscritos > this.cursoEditado.cupos) {
        alert("Los inscritos no pueden ser mayores que los cupos disponibles.");
        return;
      }

      try {
        await this.$store.dispatch("editarCurso", this.cursoEditado);
        this.$router.push("/admin");
      } catch (error) {
        alert("Ocurrió un error al guardar los cambios.");
        console.error(error);
      }
    },
    ajustarEstado() {
      if (this.cursoEditado.completado) {
        this.cursoEditado.inscritos = 0;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}


.card.bg-morado {
  background-color: #8e44ad;
  color: white;
  border-radius: 10px;
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
}

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


form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form label {
  font-weight: bold;
  color: #8e44ad;
}

form input,
form textarea,
form select {
  border-radius: 5px;
}
</style>