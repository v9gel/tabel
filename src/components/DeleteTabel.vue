<template>
  <div>
    <el-button size="mini" type="danger" @click="dialogVisible = true">Удалить</el-button>

    <el-dialog title="Удалить табель?" :visible.sync="dialogVisible" width="30%">
      <span>Подтвердите удаление табеля</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" :disabled="disabled">Отмена</el-button>
        <el-button type="primary" @click="handleDelete" :disabled="disabled">Удалить</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import url from "../config";

export default {
  name: "DeleteTabel",
  data() {
    return {
      dialogVisible: false,
      disabled: false
    };
  },
  props: ["tabel"],
  methods: {
    async handleDelete() {
      this.disabled = true;
      await this.axios.delete(url + `/onetabel/${this.tabel.PK_TABEL}`).then(response => {
        this.$root.$emit("updateTabel");
        this.dialogVisible = false;
      });
    }
  }
};
</script>

<style scoped></style>
