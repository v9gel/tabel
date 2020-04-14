<template>
  <div>
    <div v-if="data == null"><i class="el-icon-loading" /></div>
    <div v-if="data != null">
      <p>
        Табель подразделения <b>{{ data[0].PODRAZDELORG_NAME }}</b> c {{ data[0].STARTDATE }} по
        {{ data[0].ENDDATE }}
        <el-button @click="handleBack" size="mini">Назад</el-button>
        <el-button @click="handleSave" size="mini" type="primary" :disabled="isEdited">Сохранить</el-button>
      </p>
      <hot-table :data="data" :colHeaders="colHeaders" :row="row" :columns="columns"></hot-table>
    </div>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
var hash = require("object-hash");

export default {
  name: "OneTabel",
  data() {
    return {
      data: null,
      dataStartHash: null,
      colHeaders: [
        "ФИО",
        "Должность",
        "Табельный №",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31
      ],
      row: null,
      columns: [
        {
          data: "FIO",
          readOnly: true
        },
        {
          data: "JOB_POSITION_NAME",
          readOnly: true
        },
        {
          data: "TABEL_NUM",
          readOnly: true
        },
        {
          data: "DAY1"
        },
        {
          data: "DAY2"
        },
        {
          data: "DAY3"
        },
        {
          data: "DAY4"
        },
        {
          data: "DAY5"
        },
        {
          data: "DAY6"
        },
        {
          data: "DAY7"
        },
        {
          data: "DAY8"
        },
        {
          data: "DAY9"
        },
        {
          data: "DAY10"
        },
        {
          data: "DAY11"
        },
        {
          data: "DAY12"
        },
        {
          data: "DAY13"
        },
        {
          data: "DAY14"
        },
        {
          data: "DAY15"
        },
        {
          data: "DAY16"
        },
        {
          data: "DAY17"
        },
        {
          data: "DAY18"
        },
        {
          data: "DAY19"
        },
        {
          data: "DAY20"
        },
        {
          data: "DAY21"
        },
        {
          data: "DAY22"
        },
        {
          data: "DAY23"
        },
        {
          data: "DAY24"
        },
        {
          data: "DAY25"
        },
        {
          data: "DAY26"
        },
        {
          data: "DAY27"
        },
        {
          data: "DAY28"
        },
        {
          data: "DAY29"
        },
        {
          data: "DAY30"
        },
        {
          data: "DAY31"
        }
      ]
    };
  },
  components: {
    HotTable
  },
  computed: {
    isEdited() {
      return this.dataStartHash === hash(this.data);
    }
  },
  methods: {
    handleBack() {
      this.$router.replace("/tabel/" + 1);
    },
    handleSave() {}
  },
  mounted() {
    this.axios.get(`http://localhost:3000/onetabel/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.data = response.data;
      this.dataStartHash = hash(this.data);
    });
  }
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>
