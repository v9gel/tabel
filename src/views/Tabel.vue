<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="400px">
          <el-tree
            v-if="tree != null"
            :data="tree"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
          <i v-if="tree == null" class="el-icon-loading" />
        </el-aside>
        <el-main>
          <el-table v-if="tabels != null" :data="tabels" style="width: 100%">
            <el-table-column prop="MONTH" label="Месяц" width="180"> </el-table-column>
            <el-table-column prop="YEHR" label="Год" width="180"> </el-table-column>
            <el-table-column prop="NUMDOC" label="№ документа"> </el-table-column>
            <el-table-column label="Действия">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleOpen(scope.row)"
                  >Открыть</el-button
                >
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                  >Изменить</el-button
                >
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                  >Удалить</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <i v-if="tabels == null" class="el-icon-loading" />
        </el-main>
      </el-container>
    </el-container>
    <!--    <ul>-->
    <!--      <li  @click="getTabel(element.PK_PODRAZDEL)"  v-for="element in podrazdelorg" :key="element.PK_PODRAZDEL" >-->
    <!--        <router-link :to="'/tabel/'+ element.PK_PODRAZDEL">{{ element.NAME }}</router-link>-->
    <!--      </li>-->
    <!--    </ul>-->
    <!--    <p v-for="element in tabels" :key="element.PK_TABEL">{{element.MONTH}} {{element.YEHR}} {{element.NUMDOC}} <router-link :to="'/onetabel/'+ element.PK_TABEL">Открыть</router-link></p>-->
  </div>
</template>

<script>
import url from "../config";
export default {
  name: "Tabel",
  data() {
    return {
      tree: null,
      tabels: null
    };
  },
  methods: {
    async handleNodeClick(data) {
      this.tabels = null;
      this.$root.config.api_url;
      await this.axios.get(url + `/tabel/${data.id}`).then(response => {
        console.log(response.data);
        this.tabels = response.data;
      });
    },
    handleOpen(row) {
      this.$router.replace("/onetabel/" + row.PK_TABEL);
    }
  },
  async mounted() {
    await this.axios.get(url + `/podrazdelorg`).then(response => {
      console.log(response.data);
      this.tree = response.data;
    });
    await this.axios.get(url + `/tabel/${this.$route.params.podrazdel_org || 1}`).then(response => {
      console.log(response.data);
      this.tabels = response.data;
    });
  }
};
</script>

<style scoped></style>
