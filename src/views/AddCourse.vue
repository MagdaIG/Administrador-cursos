<template>
  <div class="container mt-4">
    <h1 class="mb-4">Agregar Nuevo Curso</h1>
    <form @submit.prevent="validarFormulario" novalidate>
      <div class="form-group">
        <label for="nombre">Nombre del Curso</label>
        <input
            id="nombre"
            v-model="nuevoCurso.nombre"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errores.nombre }"
            required
        />
        <div v-if="errores.nombre" class="invalid-feedback">
          {{ errores.nombre }}
        </div>
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea
            id="descripcion"
            v-model="nuevoCurso.descripcion"
            class="form-control"
            :class="{ 'is-invalid': errores.descripcion }"
            required
        ></textarea>
        <div v-if="errores.descripcion" class="invalid-feedback">
          {{ errores.descripcion }}
        </div>
      </div>
      <div class="form-group">
        <label for="cupos">Cupos</label>
        <input
            id="cupos"
            v-model.number="nuevoCurso.cupos"
            type="number"
            min="1"
            class="form-control"
            :class="{ 'is-invalid': errores.cupos }"
            required
        />
        <div v-if="errores.cupos" class="invalid-feedback">
          {{ errores.cupos }}
        </div>
      </div>
      <div class="form-group">
        <label for="inscritos">Inscritos</label>
        <input
            id="inscritos"
            v-model.number="nuevoCurso.inscritos"
            type="number"
            min="0"
            class="form-control"
            :class="{ 'is-invalid': errores.inscritos }"
            required
        />
        <div v-if="errores.inscritos" class="invalid-feedback">
          {{ errores.inscritos }}
        </div>
      </div>
      <div class="form-group">
        <label for="completado">Completado</label>
        <select id="completado" v-model="nuevoCurso.completado" class="form-control">
          <option :value="true">Sí</option>
          <option :value="false">No</option>
        </select>
      </div>
      <div class="mt-4 d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Agregar Curso</button>
        <button type="button" class="btn btn-secondary" @click="volver">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nuevoCurso: {
        nombre: "",
        descripcion: "",
        cupos: 0,
        inscritos: 0,
        completado: false,
      },
      errores: {},
    };
  },
  methods: {
    validarFormulario() {
      this.errores = {};

      if (!this.nuevoCurso.nombre.trim()) {
        this.errores.nombre = "El nombre es obligatorio.";
      }

      if (!this.nuevoCurso.descripcion.trim()) {
        this.errores.descripcion = "La descripción es obligatoria.";
      }

      if (isNaN(this.nuevoCurso.cupos) || this.nuevoCurso.cupos < 1) {
        this.errores.cupos = "Debe haber al menos un cupo válido.";
      }

      if (isNaN(this.nuevoCurso.inscritos) || this.nuevoCurso.inscritos < 0) {
        this.errores.inscritos = "Debe ingresar un número válido de inscritos.";
      } else if (this.nuevoCurso.inscritos > this.nuevoCurso.cupos) {
        this.errores.inscritos = "Los inscritos no pueden superar los cupos.";
      }

      if (Object.keys(this.errores).length === 0) {
        this.agregarCurso();
      }
    },
    agregarCurso() {
      const cursoConFecha = {
        ...this.nuevoCurso,
        id: Date.now(),
        fecha_registro: new Date().toISOString().split("T")[0],
      };
      this.$store.dispatch("agregarCurso", cursoConFecha);
      this.$router.push("/admin");
    },
    volver() {
      this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
/* Mejora en los estilos de los botones */
button {
  padding: 10px 15px;
}

.invalid-feedback {
  font-size: 0.9rem;
  color: #e74c3c;
}
</style>