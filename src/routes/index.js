import Follow from "~/pages/Follow";
import Home from "~/pages/Home";
import MyMusic from "~/pages/MyMusic";
import Radio from "~/pages/Radio";
import ZingChart from "~/pages/ZingChart";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/follow', component: Follow },
    { path: '/mymusic', component: MyMusic },
    { path: '/radio', component: Radio},
    { path: '/zing-chart', component: ZingChart},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };