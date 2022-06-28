<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Detail barang
      </p>
      <p class="subtitle">
        Menampilkan barang
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="barang">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/src/assets/lenovo.jpg" alt="image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">Barang {{barang.Nama_barang}}</p>
              <p class="subtitle is-6">ID_Barang {{ID_Barang}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>ID_BARANG</dt>
              <dd><strong>{{barang.ID_Barang}}</strong></dd>

              <dt>NAMA BARANG</dt>
              <dd><strong>{{barang.Nama_barang}}</strong></dd>

              <dt>HARGA</dt>
              <dd><strong>{{barang.harga}}</strong></dd>

              <dt>KATEGORI</dt>
              <dd><strong>{{barang.kategori}}</strong></dd>

              <dt>BRAND</dt>
              <dd><strong>{{barang.brand}} item</strong></dd>

              <dt>Tahun</dt>
              <dd><strong>{{barang.tahun}}</strong></dd>

            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/buku" class="button is-info">
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
          Maaf, barang dengan <strong>ID_Barang `{{ID_Barang}}` tidak ditemukan</strong>
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
  name: "barangdetail",
  data() {
    return {
      barang: [],
      ID_Barang: this.$route.params.ID_Barang,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://martinwebszz.000webhostapp.com/barang/get.php?ID_Barang=${this.ID_Barang}`,{
        method: 'GET',
      })
          .then(response => {
            if(response.ok){
              return response.json();
            }
          })
          .then(json => {
            this.barang = json.data;
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