<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Detail teknisi
      </p>
      <p class="subtitle">
        Menampilkan daftar teknisi
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="teknisi">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/src/assets/logo2.jpg" alt="image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4"> {{teknisi.Nama}}</p>
              <p class="subtitle is-6">ID_Teknisi {{ID_Teknisi}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>ID_Teknisi</dt>
              <dd><strong>{{teknisi.ID_Teknisi}}</strong></dd>

              <dt>Nama</dt>
              <dd><strong>{{teknisi.Nama}}</strong></dd>

              <dt>Kota</dt>
              <dd><strong>{{teknisi.Kota}}</strong></dd>

              <dt>TTL</dt>
              <dd><strong>{{teknisi.TTL}}</strong></dd>

              <dt>NO_HP</dt>
              <dd><strong>{{teknisi.No_hp}} item</strong></dd>

              <dt>Alamat</dt>
              <dd><strong>{{teknisi.Alamat}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/teknisi" class="button is-info">
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
          Maaf, teknisi dengan <strong>ID_Teknisi `{{ID_Teknisi}}` tidak ditemukan</strong>
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
  name: "teknisidetail",
  data() {
    return {
      teknisi:[],
      ID_Teknisi: this.$route.params.ID_Teknisi,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://martinwebszz.000webhostapp.com/teknisi/get.php?ID_Teknisi=${this.ID_Teknisi}`,{
        method: 'GET',
      })
          .then(response => {
            if(response.ok){
              return response.json();
            }
          })
          .then(json => {
            this.teknisi = json.data;
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