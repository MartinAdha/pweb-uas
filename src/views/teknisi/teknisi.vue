<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Teknisi
      </p>
      <p class="subtitle">
        Menampilkan Teknisi
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
          <th>ID_Teknisi</th>
          <th>Nama</th>
          <th>Kota</th>
          <th>TTL</th>
          <th>No_hp</th>
          <th>Alamat</th>
          <th>#</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.ID_Teknisi}}</td>
          <td>{{value.Nama}}</td>
          <td>{{value.Kota}}</td>
          <td>{{value.TTL}} item</td>
          <td>{{value.No_hp}}</td>
          <td>{{value.Alamat}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <RouterLink class="button is-success" :to="{ name: 'teknisi-detail', params: { ID_Teknisi:  value.ID_Teknisi}}">
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
                  <span>Edit</span>
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
            <li>ID_Teknisi <strong>{{data[selectedIndex].ID_Teknisi}}</strong></li>
            <li>Nama <strong>{{data[selectedIndex].Nama}}</strong></li>
            <li>Kota <strong>{{data[selectedIndex].Kota}}</strong></li>
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
              <label class="label" for="Nama_update">Namat</label>
              <div class="control">
                <input class="input" type="text" id="Nama_update" placeholder="Nama" required v-model="formEdit.Nama">
              </div>
            </div>
            <div class="field">
              <label class="label" for="Kota_update">Kota</label>
              <div class="control">
                <input class="input" type="text" id="Kota_update" placeholder="Kota" required v-model="formEdit.Kota">
              </div>
            </div>

            <div class="field">
              <label class="label" for="TTL_update">TTL</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input" type="text" id="TTL_update" placeholder="TTL" required v-model="formEdit.TTL" min="1" max="10000">
                </p>
                <p class="control">
                  <a class="button is-static">
                    item
                  </a>
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label" for="No_hp_update">No_hp</label>
              <div class="control">
                <input class="input" type="number" id="No_hp_update" placeholder="No_hp" required v-model="formEdit.No_hp">
              </div>
            </div>
            <div class="field">
              <label class="label" for="Alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="Alamat_update" placeholder="Alamat" required v-model="formEdit.Alamat">
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
            <label class="label" for="ID_Teknisi_insert">ID_Teknisi</label>
            <div class="control">
              <input class="input" type="text" id="ID_Teknisi_insert" placeholder="ID_Teknisi" required v-model="formAdd.ID_Teknisi">
            </div>
          </div>
          <div class="field">
            <label class="label" for="Nama_insert">Nama</label>
            <div class="control">
              <input class="input" type="text" id="Nama_insert" placeholder="Nama" required v-model="formAdd.Nama">
            </div>
          </div>
          <div class="field">
            <label class="label" for="Kota_insert">Kota</label>
            <div class="control">
              <input class="input" type="text" id="Kota_insert" placeholder="Kota" required v-model="formAdd.Kota">
            </div>
          </div>

          <div class="field">
            <label class="label" for="TTL_insert">TTL</label>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" id="TTL_insert" placeholder="TTL" required v-model="formAdd.TTL" min="1" max="10000">
              </p>
              <p class="control">
                <a class="button is-static">
                  item
                </a>
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label" for="No_hp_insert">No_hp</label>
            <div class="control">
              <input class="input" type="number" id="No_hp_insert" placeholder="No_hp" required v-model="formAdd.No_hp">
            </div>
          </div>
          <div class="field">
            <label class="label" for="Alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="Alamat_insert" placeholder="Alamat" required v-model="formAdd.Alamat">
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
  name: "teknisi",
  data(){
    return{
      data: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        ID_Teknisi: '',
        Nama: '',
        Kota: '',
        TTL: '',
        No_hp: '',
        Alamat: '',
      },
      formEdit: {
        ID_Teknisi: '',
        Nama: '',
        Kota: '',
        TTL: '',
        No_hp: '',
        Alamat: '',
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://martinwebszz.000webhostapp.com/teknisi/all.php`,{
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
          'ID_Teknisi': selectedData.ID_Teknisi
        });

        fetch(`https://martinwebszz.000webhostapp.com/teknisi/delete.php`,{
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
          ID_Teknisi: this.formEdit.ID_Teknisi,
          Nama: this.formEdit.Nama,
          Kota: this.formEdit.Kota,
          TTL: this.formEdit.TTL,
          No_hp: this.formEdit.No_hp,
          Alamat: this.formEdit.Alamat,

        });

        fetch(`https://martinwebszz.000webhostapp.com/teknisi/update.php`,{
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
        ID_Teknisi: selectedData.ID_Teknisi,
        Nama: selectedData.Nama,
        Kota: selectedData.Kota,
        TTL: selectedData.TTL,
        No_hp: selectedData.No_hp,
        Alamat: selectedData.Alamat,
      }
      nextTick(()=>{
        document.getElementById('Namat_update').focus();
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
        ID_Teknisi: this.formAdd.ID_Teknisi,
        Nama: this.formAdd.Nama,
        Kota: this.formAdd.Kota,
        TTL: this.formAdd.TTL,
        No_hp: this.formAdd.No_hp,
        Alamat: this.formAdd.Alamat,
      });

      fetch(`https://martinwebszz.000webhostapp.com/teknisi/Create.php`,{
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
        ID_Teknisi: '',
        Nama: '',
        Kota: '',
        TTL: '',
        No_hp: '',
        Alamat: '',
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