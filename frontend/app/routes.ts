import {
    type RouteConfig,
    route,
    index,
} from "@react-router/dev/routes";

export default [
    index("./routes/home.tsx"),
    route("login", "./routes/auth/login.tsx"),
    route("favourites", "./routes/favourites.tsx"),
] satisfies RouteConfig;
