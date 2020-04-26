<template>
  <div>
    <el-button size="mini" type="primary" @click="dialogVisible = true">Создать</el-button>
    <el-button size="mini" @click="$root.$emit('updateTabel')" style="margin-bottom: 2px"
      >Обновить</el-button
    >

    <el-dialog title="Создание нового табеля" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Подразделение" prop="date">
          <el-input v-model="curPodrazdel.label" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Месяц" prop="date">
          <el-date-picker v-model="ruleForm.date" type="month" placeholder="Выберите месяц">
          </el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')" :disabled="disabled">Отмена</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled"
          >Добавить</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import url from "../config";

export default {
  name: "AddTabel",
  data() {
    return {
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        date: null
      },
      rules: {
        date: [
          { type: "date", required: true, message: "Пожалуйста, укажите месяц", trigger: "change" }
        ]
      }
    };
  },
  props: ["curPodrazdel"],
  methods: {
    async handleAdd() {
      this.disabled = true;
      await this.axios.post(url + `/onetabel/add`).then(response => {
        this.$root.$emit("updateTabel");
        this.dialogVisible = false;
      });
    },
    async submitForm(formName) {
      await this.$refs[formName].validate(async valid => {
        if (valid) {
          this.disabled = true;
          await this.axios
            .post(url + `/onetabel/add`, {
              podrazdelorg: this.curPodrazdel.id,
              year: this.ruleForm.date.getFullYear(),
              month: this.ruleForm.date.getMonth()
            })
            .then(response => {
              this.$root.$emit("updateTabel");
              this.dialogVisible = false;
              this.disabled = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped></style>
