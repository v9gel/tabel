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
          <p v-if="tabels != null">
            Список табелей для подразделения <b>{{ curPodrazdel.label }}</b>
            <AddTabel :cur-podrazdel="curPodrazdel"></AddTabel>
            <el-date-picker
              size="mini"
              v-model="value2"
              type="monthrange"
              align="right"
              unlink-panels
              range-separator="To"
              start-placeholder="Start month"
              end-placeholder="End month"
              :picker-options="pickerOptions">
            </el-date-picker>
          </p>
          <el-table border v-if="tabels != null" :data="tabels" style="width: 100%">
            <el-table-column prop="MONTH" label="Месяц" width="180"> </el-table-column>
            <el-table-column prop="YEHR" label="Год" width="180"> </el-table-column>
            <el-table-column prop="NUMDOC" label="№ документа"> </el-table-column>
            <el-table-column label="Действия" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleOpen(scope.row)"
                  style="margin-bottom: 2px"
                  >Открыть</el-button
                >
                <!--                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"-->
                <!--                  >Изменить</el-button-->
                <!--                >-->
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
import AddTabel from "../components/AddTabel";

function findNode(id, currentNode) {
  var i, currentChild, result;

  if (id == currentNode.id) {
    return currentNode;
  } else {
    // Use a for loop instead of forEach to avoid nested functions
    // Otherwise "return" will not work properly
    for (i = 0; i < currentNode.children.length; i += 1) {
      currentChild = currentNode.children[i];

      // Search in the current child
      result = findNode(id, currentChild);

      // Return the result if the node has been found
      if (result !== false) {
        return result;
      }
    }

    // The node has not been found and we have no more options
    return false;
  }
}

export default {
  name: "Tabel",
  components: { AddTabel, DeleteTabel },
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
      this.$router.push({ path: `/tabel/${data.id}` });

      this.$root.$emit("updateTabel");
    },
    handleOpen(row) {
      this.$router.push({ path: `/onetabel/${row.PK_TABEL}` });
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

    let temp = findNode(parseInt(this.$route.params.podrazdel_org) || 1, {
      id: 0,
      children: this.tree
    });
    this.curPodrazdel.id = temp.id;
    this.curPodrazdel.label = temp.label;
  }
};
</script>

<style scoped></style>
