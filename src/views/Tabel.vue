<template>
  <div>
    <el-container>
      <!--      <el-header>Header</el-header>-->
      <el-container>
        <el-aside width="400px">
          <p>Список подразделений</p>
          <el-tree v-if="tree != null" :data="tree" @node-click="handleNodeClick"></el-tree>
          <i v-if="tree == null" class="el-icon-loading" />
        </el-aside>
        <el-main>
          <p>
            Список табелей для подразделения <b>{{ curPodrazdel.label }}</b>
          </p>
          <el-table border v-if="tabels != null" :data="tabels" style="width: 100%">
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
                <DeleteTabel :tabel="scope.row"></DeleteTabel>
              </template>
            </el-table-column>
          </el-table>
          <i v-if="tabels == null" class="el-icon-loading" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import url from "../config";
import DeleteTabel from "../components/DeleteTabel";
export default {
  name: "Tabel",
  components: { DeleteTabel },
  data() {
    return {
      tree: null,
      tabels: null,
      curPodrazdel: {
        label: null,
        id: null
      }
    };
  },
  methods: {
    async handleNodeClick(data) {
      this.curPodrazdel.id = data.id;
      this.curPodrazdel.label = data.label;
      this.$router.replace("/tabel/" + data.id);
      this.$root.$emit("updateTabel");
    },
    handleOpen(row) {
      this.$router.replace("/onetabel/" + row.PK_TABEL);
    }
  },
  async mounted() {
    document.title = "Табель учета рабочего времени";
    await this.$root.$on("updateTabel", async () => {
      this.tabels = null;
      await this.axios
        .get(url + `/tabel/${this.$route.params.podrazdel_org || 1}`)
        .then(response => {
          this.tabels = response.data;
        });
    });

    await this.axios.get(url + `/podrazdelorg`).then(response => {
      this.tree = response.data;
    });
    this.$root.$emit("updateTabel");
  }
};
</script>

<style scoped></style>
