import {
    createRouter,
    createWebHistory
} from "vue-router";
import Homepage from "../views/Homepage.vue";
import Contents from "../views/Contents.vue";

const history = createWebHistory(import.meta.env.VITE_BASE_URL);
const routes = [{
    path: "/",
    name: "homepage",
    component: Homepage,
    children: [{
        path: "",
        name: "contents",
        component: Contents,
    }, ],
}, ];

const router = createRouter({
    history,
    routes
});

export default router;