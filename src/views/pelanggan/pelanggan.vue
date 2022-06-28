<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Pelanggan
      </p>
      <p class="subtitle">
        Menampilkan pelanggan
      </p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button is-link" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
        <span>Data baru</span>
      </button>
      <table class="table">
        <thead>
        <tr>
          <th>#</th>
          <th>ID_Pelanggan</th>
          <th>Nama</th>
          <th>Alamat</th>
          <th>Kota</th>
          <th>kode_pos</th>
          <th>Tanggal</th>
          <th>#</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.ID_Pelanggan}}</td>
          <td>{{value.Nama}}</td>
          <td>{{value.Alamat}}</td>
          <td>{{value.Kota}} </td>
          <td>{{value.kode_pos}}</td>
          <td>{{value.Tanggal}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <RouterLink class="button is-success" :to="{ name: 'pelanggan-detail', params: { ID_Pelanggan:  value.ID_Pelanggan}}">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-right"></i>
                  </span>
                  <span>Detail</span>
                </RouterLink>
              </p>
              <p class="control">
                <button class="button is-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil"></i>
                  </span>
                  <span>Update</span>
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" @click="showDelete(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </p>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="9">
            <div class="notification is-warning">
              Tidak ada data
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>ID_Pelanggan <strong>{{data[selectedIndex].ID_Pelanggan}}</strong></li>
            <li>Nama <strong>{{data[selectedIndex].Nama}}</strong></li>
            <li>Alamat <strong>{{data[selectedIndex].Alamat}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="remove">Delete</button>
        <button class="button" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="Nama_update">Nama</label>
              <div class="control">
                <input class="input" type="text" id="Nama_update" placeholder="Nama" required v-model="formEdit.Nama">
              </div>
            </div>
            <div class="field">
              <label class="label" for="Alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="Alamat_update" placeholder="Alamat" required v-model="formEdit.Alamat">
              </div>
            </div>

            <div class="field">
              <label class="label" for="Kota_update">Kota</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input" type="text" id="Kota_update" placeholder="Kota" required v-model="formEdit.Kota" min="1" max="10000">
                </p>
                <p class="control">
                  <a class="button is-static">
                    item
                  </a>
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label" for="kode_pos_update">kode_pos</label>
              <div class="control">
                <input class="input" type="number" id="kode_pos_update" placeholder="kode_pos" required v-model="formEdit.kode_pos">
              </div>
            </div>
            <div class="field">
              <label class="label" for="Tanggal_update">Tanggal</label>
              <div class="control">
                <input class="input" type="date" id="Tanggal_update" placeholder="Tanggal" required v-model="formEdit.Tanggal">
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update">Update</button>
        <button class="button" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="ID_Pelanggan_insert">ID_Pelanggan</label>
            <div class="control">
              <input class="input" type="text" id="ID_Pelanggan_insert" placeholder="ID_Pelanggan" required v-model="formAdd.ID_Pelanggan">
            </div>
          </div>
          <div class="field">
            <label class="label" for="Nama_insert">Nama</label>
            <div class="control">
              <input class="input" type="text" id="Nama_insert" placeholder="Nama" required v-model="formAdd.Nama">
            </div>
          </div>
          <div class="field">
            <label class="label" for="Alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="Alamat_insert" placeholder="Alamat" required v-model="formAdd.Alamat">
            </div>
          </div>

          <div class="field">
            <label class="label" for="Kota_insert">Kota</label>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" id="Kota_insert" placeholder="Kota" required v-model="formAdd.Kota" min="1" max="10000">
              </p>
              <p class="control">
                <a class="button is-static">
                  item
                </a>
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label" for="kode_pos_insert">kode_pos</label>
            <div class="control">
              <input class="input" type="number" id="kode_pos_insert" placeholder="kode_pos" required v-model="formAdd.kode_pos">
            </div>
          </div>
          <div class="field">
            <label class="label" for="Tanggal_insert">Tanggal</label>
            <div class="control">
              <input class="input" type="date" id="Tanggal_insert" placeholder="Tanggal" required v-model="formAdd.Tanggal">
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addNew">Save</button>
        <button class="button" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";

export default {
  name: "pelanggan",
  data(){
    return{
      data: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        ID_Pelanggan: '',
        Nama: '',
        Alamat: '',
        Kota: '',
        kode_pos: '',
        Tanggal: new Date().toISOString().slice(0, 10)
      },
      formEdit: {
        ID_Pelanggan: '',
        Nama: '',
        Alamat: '',
        Kota: '',
        kode_pos: '',
        Tanggal: new Date().toISOString().slice(0, 10)
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://martinwebszz.000webhostapp.com/pelanggan/all.php`,{
        method: 'GET',
      })
          .then(response => {
            if(response.ok){
              return response.json();
            }
          })
          .then(json => {
            this.data = json.data;
          })
          .catch(()=>{
            alert('Terjadi error')
          })
          .finally(()=>{
            this.isLoading = false;
          })
    },

    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const selectedData = this.data[this.selectedIndex];

        const payload = new URLSearchParams({
          'ID_Pelanggan': selectedData.ID_Pelanggan
        });

        fetch(`https://martinwebszz.000webhostapp.com/pelanggan/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
            .then(response => {
              if(response.ok){
                this.data.splice(this.selectedIndex, 1);
              }
              return response.json();
            })
            .then(json =>{
              if(!json.status){
                alert(json.error);
              }
            })
            .catch(()=>{
              alert('Terjadi error')
            })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const payload = new URLSearchParams({
          ID_Pelanggan: this.formEdit.ID_Pelanggan,
          Nama: this.formEdit.Nama,
          Alamat: this.formEdit.Alamat,
          Kota: this.formEdit.Kota,
          kode_pos: this.formEdit.kode_pos,
          Tanggal: this.formEdit.Tanggal,

        });

        fetch(`https://martinwebszz.000webhostapp.com/pelanggan/update.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
            .then(response => {
              return response.json()
            })
            .then(json =>{
              if(!json.status){
                alert(json.error);
              }else{
                /*
                Update data pada kolom yg diupdate
                 */
                this.data[this.selectedIndex] = json.data;
              }
            })
            .catch( (e) =>{
              alert('Terjadi error'+e.toString())
            })
            .finally(()=>{
              this.selectedIndex = -1;
            })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.data[index];
      this.formEdit = {
        ID_Pelanggan: selectedData.ID_Pelanggan,
        Nama: selectedData.Nama,
        Alamat: selectedData.Alamat,
        Kota: selectedData.Kota,
        kode_pos: selectedData.kode_pos,
        Tanggal: selectedData.Tanggal,
      }
      nextTick(()=>{
        document.getElementById('Nama_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('ID_Pelanggan_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        ID_Pelanggan: this.formAdd.ID_Pelanggan,
        Nama: this.formAdd.Nama,
        Alamat: this.formAdd.Alamat,
        Kota: this.formAdd.Kota,
        kode_pos: this.formAdd.kode_pos,
        Tanggal: this.formAdd.Tanggal,

      });

      fetch(`https://martinwebszz.000webhostapp.com/pelanggan/Create.php`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              this.data.push(json.data);
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.formAdd.nama = '';
          })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        ID_Pelanggan: '',
        Nama: '',
        Alamat: 1,
        Kota: 0,
        kode_pos: '',
        Tanggal: new Date().toISOString().slice(0, 10)
      }
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>

</style>