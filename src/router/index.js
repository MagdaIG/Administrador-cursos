import { createRouter, createWebHistory } from "vue-router";

// Importación de las vistas
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import AddCourse from "../views/AddCourse.vue";
import EditCourse from "../views/EditCourse.vue";
import CourseDetail from "../views/CourseDetail.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { title: "Home - Gestión de Cursos" },
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: { title: "Administración - Gestión de Cursos" },
    },
    {
        path: "/add-course",
        name: "AddCourse",
        component: AddCourse,
        meta: { title: "Agregar Curso - Gestión de Cursos" },
    },
    {
        path: "/edit-course/:id",
        name: "EditCourse",
        component: EditCourse,
        props: true, // Permite pasar parámetros como props
        meta: { title: "Editar Curso - Gestión de Cursos" },
    },
    {
        path: "/course/:id",
        name: "CourseDetail",
        component: CourseDetail,
        props: true, // Permite pasar parámetros como props
        meta: { title: "Detalle del Curso - Gestión de Cursos" },
    },
    {
        path: "/:pathMatch(.*)*", // Ruta para páginas no encontradas
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
        meta: { title: "Página No Encontrada - Gestión de Cursos" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Configuración para cambiar el título de la página en cada ruta
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "Gestión de Cursos";
    next();
});

export default router;