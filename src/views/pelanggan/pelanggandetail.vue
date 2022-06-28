<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Detail pelanggan
      </p>
      <p class="subtitle">
        Menampilkan daftar  pelanggan berdasarkan ID
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="pelanggan">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/src/assets/logo6.webp" alt="image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4"> {{pelanggan.Nama}}</p>
              <p class="subtitle is-6">ID_Pelanggan {{ID_Pelanggan}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>ID_Pelanggan</dt>
              <dd><strong>{{pelanggan.ID_Pelanggan}}</strong></dd>

              <dt>Nama</dt>
              <dd><strong>{{pelanggan.Nama}}</strong></dd>

              <dt>Alamat</dt>
              <dd><strong>{{pelanggan.Alamat}}</strong></dd>

              <dt>Kota</dt>
              <dd><strong>{{pelanggan.Kota}}</strong></dd>

              <dt>kode_pos</dt>
              <dd><strong>{{pelanggan.kode_pos}} item</strong></dd>

              <dt>Tanggal</dt>
              <dd><strong>{{pelanggan.Tanggal}}</strong></dd>

            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/pelanggan" class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span>Kembali</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="notification is-danger">
          Maaf, pelanggan dengan <strong>ID_Pelanggan `{{ID_Pelanggan}}` tidak ditemukan</strong>
        </div>
      </div>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "pelanggandetail",
  data() {
    return {
      pelanggan: [],
      ID_Pelanggan: this.$route.params.ID_Pelanggan,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://martinwebszz.000webhostapp.com/pelanggan/get.php?ID_Pelanggan=${this.ID_Pelanggan}`,{
        method: 'GET',
      })
          .then(response => {
            if(response.ok){
              return response.json();
            }
          })
          .then(json => {
            this.pelanggan = json.data;
          })
          .catch(()=>{
            alert('Terjadi error')
          })
          .finally(()=>{
            this.isLoading = false;
          })
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>

</style>