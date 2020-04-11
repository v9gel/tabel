<template>
  <div>
    <ul>
      <li  @click="getTabel(element.PK_PODRAZDEL)"  v-for="element in podrazdelorg" :key="element.PK_PODRAZDEL" >
        <router-link :to="'/tabel/'+ element.PK_PODRAZDEL">{{ element.NAME }}</router-link>
      </li>
    </ul>
    <p v-for="element in tabels" :key="element.PK_TABEL">{{element.MONTH}} {{element.YEHR}} {{element.NUMDOC}} <router-link :to="'/onetabel/'+ element.PK_TABEL">Открыть</router-link></p>
  </div>
</template>

<script>
export default {
  name: "Tabel",
  data() {
    return {
      podrazdelorg: null,
      tabels: null
    };
  },
  methods:{
    async getTabel(id){
      this.tabels = null;
      await this.axios.get(`http://localhost:3000/tabel/${id}`).then(response => {
        console.log(response.data);
        this.tabels = response.data;
      });
    }
  },
  async mounted() {
    await this.axios.get(`http://localhost:3000/podrazdelorg`).then(response => {
      console.log(response.data);
      this.podrazdelorg = response.data;
    });
    await this.axios.get(`http://localhost:3000/tabel/${this.$route.params.podrazdel_org}`).then(response => {
      console.log(response.data);
      this.tabels = response.data;
    });
  }
};
</script>

<style scoped></style>
