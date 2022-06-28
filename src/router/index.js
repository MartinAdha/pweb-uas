import {createRouter, createWebHistory} from "vue-router";
import IndexView from '../views/IndexView.vue';
import AboutView from "../views/AboutView.vue";
import barang from "../views/barang/barang.vue";
import barangdetail from "../views/barang/barangdetail.vue";
import Error404View from "../views/error/Error404View.vue";
import FooterView from "../views/FooterView.vue";
import TopNavView from "../views/TopNavView.vue";
import pelanggan from "../views/pelanggan/pelanggan.vue";
import pelanggandetail from "../views/pelanggan/pelanggandetail.vue";
import teknisi from "../views/teknisi/teknisi.vue";
import teknisidetail from "../views/teknisi/teknisidetail.vue";

const DEFAULT_TITLE = 'web martin';
const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'About'
    }
  },
  {
    path: '/footer',
    name: 'footer',
    component: FooterView,
    meta: {
      title: 'Footer'
    }
  },
  {
    path: '/topnav',
    name: 'topnav',
    component: TopNavView,
    meta: {
      title: 'topnav'
    }
  },
  {
    path: '/barang',
    name: 'barang',
    component: barang,
    meta: {
      title: 'barang'
    }
  },
  {
    path: '/barang/:ID_Barang',
    name: 'barang-detail',
    component: barangdetail,
    meta: {
      title: 'barang detail'
    }
  },
  {
    path: '/pelanggan',
    name: 'pelanggan',
    component: pelanggan,
    meta: {
      title: 'pelanggan'
    }
  },
  {
    path: '/pelanggan/:ID_Pelanggan',
    name: 'pelanggan-detail',
    component: pelanggandetail,
    meta: {
      title: 'pelanggan detail'
    }
  },
  {
    path: '/teknisi',
    name: 'teknisi',
    component: teknisi,
    meta: {
      title: 'teknisi'
    }
  },
  {
    path: '/teknisi/:ID_Teknisi',
    name: 'teknisi-detail',
    component: teknisidetail,
    meta: {
      title: 'teknisi detail'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: Error404View,
    meta: {
      title: 'Error 404'
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.afterEach((to, from, next) => {
  const metaTitle = to.meta.title;
  if(metaTitle){
    document.title = metaTitle+" - "+DEFAULT_TITLE;
  }else{
    document.title = DEFAULT_TITLE;
  }
})


export default router