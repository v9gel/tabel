<template>
  <div>
    <div v-if="data == null"><i class="el-icon-loading" /></div>
    <div v-if="data != null">
      <p style="margin-top: 3px">
        Табель подразделения <b>{{ data[0].PODRAZDELORG_NAME }}</b
        >, номер <b>{{ data[0].NUMDOC }}</b
        >, за месяц <b>{{ data[0].STARTDATE }}</b
        >{{ " " }}
        <el-button @click="handleBack" :disabled="disabled" size="mini"
          >Назад к списку табелей</el-button
        >
        <el-button @click="update" :disabled="disabled" size="mini">Обновить</el-button>
        <el-button @click="handleSave" size="mini" type="primary" :disabled="isEdited || disabled"
          >Сохранить</el-button
        >
        {{ " " }}<i v-if="disabled" class="el-icon-loading" />
      </p>
      <hot-table
        :data="data"
        :colHeaders="colHeaders"
        :row="row"
        :columns="columns"
        :hiddenColumns="{ columns: hiddenColumns, indicators: false }"
      ></hot-table>
    </div>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import url from "../config";
var hash = require("object-hash");

const sources = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Я",
  "Н",
  "РВ",
  "С",
  "ВМ",
  "К",
  "ПК",
  "ПМ",
  "ОТ",
  "ОД",
  "У",
  "УВ",
  "УД",
  "Р",
  "ОЖ",
  "ДО",
  "ОЗ",
  "ДБ",
  "Б",
  "Т",
  "ЛЧ",
  "ПВ",
  "Г",
  "ПР",
  "НС",
  "В",
  "ОВ",
  "НВ",
  "ЗБ",
  "НН",
  "РП",
  "НП",
  "ВП",
  "НО",
  "НБ",
  "НЗ",
  ""
];

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
          data: "DAY1",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY2",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY3",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY4",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY5",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY6",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY7",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY8",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY9",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY10",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY11",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY12",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY13",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY14",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY15",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY16",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY17",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY18",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY19",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY20",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY21",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY22",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY23",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY24",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY25",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY26",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY27",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY28",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY29",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY30",
          type: "autocomplete",
          source: sources,
          strict: true
        },
        {
          data: "DAY31",
          type: "autocomplete",
          source: sources,
          strict: true
        }
      ],
      disabled: false
    };
  },
  components: {
    HotTable
  },
  computed: {
    isEdited() {
      return this.dataStartHash === hash(this.data);
    },
    hiddenColumns() {
      Date.prototype.daysInMonth = function() {
        return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
      };
      let d = new Date();
      let s = this.data[0].STARTDATE.split(".");
      d.setDate(1);
      d.setMonth(parseInt(s[0]) - 1);
      d.setFullYear(parseInt(s[1]));

      let h = d.daysInMonth();
      if (h === 28) {
        return [31, 32, 33];
      }
      if (h === 29) {
        return [32, 33];
      }
      if (h === 30) {
        return [33];
      }
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
      // this.$router.replace("/tabel/" + 1);
    },
    handleSave() {
      this.disabled = true;
      this.axios
        .post(url + `/onetabel/${this.$route.params.id}`, { data: this.data })
        .then(response => {
          this.disabled = false;
          // console.log(response.data);
          // this.data = response.data;
          // this.dataStartHash = hash(this.data);
        });
    },
    update() {
      this.axios.get(url + `/onetabel/${this.$route.params.id}`).then(response => {
        console.log(response.data);
        this.data = response.data;
        this.dataStartHash = hash(this.data);
        document.title =
          "Табель подразделения " +
          this.data[0].PODRAZDELORG_NAME +
          " c " +
          this.data[0].STARTDATE +
          " по " +
          this.data[0].ENDDATE;
      });
    }
  },
  mounted() {
    this.update();
  }
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>
