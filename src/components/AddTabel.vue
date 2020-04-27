<template>
  <div>
    <el-button size="mini" type="primary" @click="dialogVisible = true">Создать</el-button>
    <el-button size="mini" @click="$root.$emit('updateTabel')" style="margin-bottom: 2px"
      >Обновить</el-button
    >{{ "" }}
    <el-date-picker
      size="mini"
      v-model="value"
      type="monthrange"
      align="right"
      unlink-panels
      range-separator="до"
      start-placeholder="Начало периода"
      end-placeholder="Конец периода"
      :picker-options="pickerOptions"
      @change="changeFilter"
    >
    </el-date-picker
    >{{ ""
    }}<el-button size="mini" @click="resetFilter" style="margin-bottom: 2px"
      >Сбросить фильтр</el-button
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
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "Этот месяц",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            }
          },
          {
            text: "Этот год",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Последние полгода",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value: ""
    };
  },
  props: ["curPodrazdel"],
  mounted() {
    this.value = this.$localStorage.get("value");
  },
  methods: {
    changeFilter() {
      if (this.value === null) {
        this.$localStorage.remove("filter");
        this.$root.$emit("changeFilter");
      } else {
        let f = {
          s: {
            m: this.value[0].getMonth() + 1,
            y: this.value[0].getFullYear()
          },
          e: {
            m: this.value[1].getMonth() + 1,
            y: this.value[1].getFullYear()
          }
        };

        this.$localStorage.set("filter", f);
        this.$root.$emit("changeFilter");
      }
    },
    resetFilter() {
      this.value = "";
      this.$localStorage.remove("filter");
      this.$root.$emit("changeFilter");
    },
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
