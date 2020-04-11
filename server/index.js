import express from "express";
const oracledb = require("oracledb");
var cors = require("cors");

function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection({
        user: "admin",
        password: "xF08aNKj5jLbE6AwjDMR",
        connectString: "database-1.czy3pep6xaul.us-east-2.rds.amazonaws.com/DATABASE"
      });

      const result = await conn.execute(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

export default async (app, http) => {
  app.use(cors());
  app.use(express.json());
  app.get("/tabel/:id", async (req, res) => {
    let statement =
      "SELECT TO_CHAR(TABEL.STARTDATE,  'MM') as MONTH,\n" +
      "       TO_CHAR(TABEL.STARTDATE,  'YYYY') as YEHR,\n" +
      "       NUMDOC,\n" +
      "       PK_TABEL\n" +
      "FROM TABEL\n" +
      "WHERE PK_PODRAZDEL = " +
      req.params.id;
    let result = await simpleExecute(statement);
    res.json(result.rows);
  });

  app.get("/podrazdelorg", async (req, res) => {
    let statement =
      "SELECT PK_PODRAZDEL, NAME, PK_PODRAZDEL_PK_PODRAZDEL as PARENT\n" + "FROM PODRAZDELORG";
    let result = await simpleExecute(statement);

    res.json(result.rows);
  });

  app.get("/onetabel/:id", async (req, res) => {
    let statement =
      "SELECT DAY1,DAY2,DAY3,DAY4,DAY5,DAY6,DAY7,DAY8,DAY9,DAY10,DAY11,DAY12,DAY13,DAY14,DAY15,DAY16,DAY17,DAY18,DAY19,DAY20,DAY21,DAY22,DAY23,DAY24,DAY25,DAY26,DAY27,DAY28,DAY29,DAY29,DAY30,DAY31, JOB_POSITION.NAME AS JOB_POSITION_NAME, PERSONCARD.TABEL_NUM,\n" +
      "       PERSONCARD.SURNAME || ' ' || SUBSTR(PERSONCARD.NAME, 0, 1) || '.' || SUBSTR(PERSONCARD.MIDDLENAME, 0, 1) || '.' as FIO,\n" +
      "       TO_CHAR(TABEL.STARTDATE,  'DD.MM.YY') as STARTDATE,\n" +
      "       TO_CHAR(TABEL.ENDDATE,  'DD.MM.YY') as ENDDATE," +
      "       PODRAZDELORG.NAME as PODRAZDELORG_NAME\n" +
      "FROM STR_TABEL, PERSONCARD, JOB_POSITION, TABEL, PODRAZDELORG\n" +
      "WHERE STR_TABEL.PK_TABEL = " +
      req.params.id +
      "\n" +
      "  AND STR_TABEL.PK_PERSONCARD = PERSONCARD.PK_PERSONCARD\n" +
      "  AND PERSONCARD.JOB_POSITION_PK_JOB_POS = JOB_POSITION.PK_JOB_POS\n" +
      "  AND TABEL.PK_TABEL = STR_TABEL.PK_TABEL\n" +
      "  AND TABEL.PK_PODRAZDEL = PODRAZDELORG.PK_PODRAZDEL";

    let result = await simpleExecute(statement);

    res.json(result.rows);
  });
};
