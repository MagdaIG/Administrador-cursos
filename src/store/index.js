import { createStore } from "vuex";
import api from "@/config/axios";

export default createStore({
    state: {
        cursos: [],
    },
    getters: {
        cursos: (state) => state.cursos,
        totalAlumnosPermitidos: (state) =>
            state.cursos.reduce((sum, curso) => sum + curso.cupos, 0),
        totalAlumnosInscritos: (state) =>
            state.cursos.reduce((sum, curso) => sum + curso.inscritos, 0),
        totalCuposRestantes: (state) =>
            state.cursos.reduce((sum, curso) => sum + (curso.cupos - curso.inscritos), 0),
        totalCursosTerminados: (state) =>
            state.cursos.filter((curso) => curso.completado).length,
        totalCursosActivos: (state) =>
            state.cursos.filter((curso) => !curso.completado).length,
        totalCursos: (state) => state.cursos.length,
    },
    mutations: {
        setCursos(state, cursos) {
            state.cursos = cursos;
        },
        agregarCurso(state, curso) {
            state.cursos.push(curso);
        },
        eliminarCurso(state, id) {
            state.cursos = state.cursos.filter((curso) => curso.id !== id);
        },
        editarCurso(state, cursoEditado) {
            const index = state.cursos.findIndex((curso) => curso.id === cursoEditado.id);
            if (index !== -1) {
                state.cursos[index] = cursoEditado;
            }
        },
    },
    actions: {
        async obtenerCursos({ commit }) {
            try {
                const { data } = await api.get("/cursos");
                commit("setCursos", data);
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
                alert("Error al cargar los cursos. Por favor, revisa la consola.");
            }
        },
        async agregarCurso({ commit }, curso) {
            try {

                const { data } = await api.post("/cursos", curso);
                commit("agregarCurso", data);
                return true;
            } catch (error) {
                console.error("Error al agregar el curso:", error);
                throw error;
            }
        },
        async eliminarCurso({ commit }, id) {
            try {
                await api.delete(`/cursos/${id}`);
                commit("eliminarCurso", id);
            } catch (error) {
                console.error("Error al eliminar el curso:", error);
                alert("Ocurrió un error al eliminar el curso. Verifica la consola para más detalles.");
            }
        },
        async editarCurso({ commit }, cursoEditado) {
            try {
                const { data } = await api.put(`/cursos/${cursoEditado.id}`, cursoEditado);
                commit("editarCurso", data);
                alert("Curso actualizado correctamente.");
            } catch (error) {
                console.error("Error al editar el curso:", error);
                alert("Ocurrió un error al editar el curso. Verifica la consola para más detalles.");
            }
        },
    },
});