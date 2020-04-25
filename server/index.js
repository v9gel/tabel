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
        password: "Ntcnbhjdfybt_01",
        connectString: "database-1.carm3vtno1l6.us-east-2.rds.amazonaws.com/ORCL"
      });

      const result = await conn.execute(statement, binds, opts);
      // const result1 = await conn.execute('COMMIT;', binds, opts);

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
    let result = (await simpleExecute(statement)).rows;
    console.log({ t: result });

    let tree = [];
    let treeKey = {};
    let newList = result.filter(e => {
      if (e.PARENT === null) {
        let obj = {
          label: e.NAME,
          id: e.PK_PODRAZDEL,
          children: []
        };
        tree.push(obj);
        treeKey[e.PK_PODRAZDEL] = obj;
      } else {
        return e;
      }
    });
    newList = newList.sort((a, b) => (a.PARENT > b.PARENT ? 1 : -1));

    let newList2 = newList.map(e => {
      let obj = {
        label: e.NAME,
        id: e.PK_PODRAZDEL,
        children: []
      };
      treeKey[e.PARENT].children.push(obj);
      treeKey[e.PK_PODRAZDEL] = obj;
    });

    res.json(tree);
  });

  app.get("/onetabel/:id", async (req, res) => {
    let statement =
      "SELECT STR_TABEL.PK_STR_TABEL as PK_STR_TABEL, DAY1,DAY2,DAY3,DAY4,DAY5,DAY6,DAY7,DAY8,DAY9,DAY10,DAY11,DAY12,DAY13,DAY14,DAY15,DAY16,DAY17,DAY18,DAY19,DAY20,DAY21,DAY22,DAY23,DAY24,DAY25,DAY26,DAY27,DAY28,DAY29,DAY29,DAY30,DAY31, JOB_POSITION.NAME AS JOB_POSITION_NAME, PERSONCARD.TABEL_NUM,\n" +
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

  app.post("/onetabel/:id", async (req, res) => {
    for (let i = 0; i < req.body.data.length; i++) {
      let e = req.body.data[i];
      console.log(e);
      let statement =
        "UPDATE ADMIN.STR_TABEL\n" +
        "SET DAY1 = '" +
        e.DAY1 +
        "',\n" +
        "DAY2 = '" +
        e.DAY2 +
        "',\n" +
        "DAY3 = '" +
        e.DAY3 +
        "',\n" +
        "DAY4 = '" +
        e.DAY4 +
        "',\n" +
        "DAY5 = '" +
        e.DAY5 +
        "',\n" +
        "DAY6 = '" +
        e.DAY6 +
        "',\n" +
        "DAY7 = '" +
        e.DAY7 +
        "',\n" +
        "DAY8 = '" +
        e.DAY8 +
        "',\n" +
        "DAY9 = '" +
        e.DAY9 +
        "',\n" +
        "DAY10 = '" +
        e.DAY10 +
        "',\n" +
        "DAY11 = '" +
        e.DAY11 +
        "',\n" +
        "DAY12 = '" +
        e.DAY12 +
        "',\n" +
        "DAY13 = '" +
        e.DAY13 +
        "',\n" +
        "DAY14 = '" +
        e.DAY14 +
        "',\n" +
        "DAY15 = '" +
        e.DAY15 +
        "',\n" +
        "DAY16 = '" +
        e.DAY16 +
        "',\n" +
        "DAY17 = '" +
        e.DAY17 +
        "',\n" +
        "DAY18 = '" +
        e.DAY18 +
        "',\n" +
        "DAY19 = '" +
        e.DAY19 +
        "',\n" +
        "DAY20 = '" +
        e.DAY20 +
        "',\n" +
        "DAY21 = '" +
        e.DAY21 +
        "',\n" +
        "DAY22 = '" +
        e.DAY22 +
        "',\n" +
        "DAY23 = '" +
        e.DAY23 +
        "',\n" +
        "DAY24 = '" +
        e.DAY24 +
        "',\n" +
        "DAY25 = '" +
        e.DAY25 +
        "',\n" +
        "DAY26 = '" +
        e.DAY26 +
        "',\n" +
        "DAY27 = '" +
        e.DAY27 +
        "',\n" +
        "DAY28 = '" +
        e.DAY28 +
        "',\n" +
        "DAY29 = '" +
        e.DAY29 +
        "',\n" +
        "DAY30 = '" +
        e.DAY30 +
        "',\n" +
        "DAY31 = '" +
        e.DAY31 +
        "'\n" +
        "WHERE PK_STR_TABEL = " +
        e.PK_STR_TABEL;
      console.log(statement);

      let result = await simpleExecute(statement);
    }
    let result2 = await simpleExecute("COMMIT WORK;");

    // console.log(e);

    // console.log({ f: req.body.data[0] });
    // await simpleExecute("COMMIT WORK;");

    // let result = await simpleExecute(statement);

    res.json("ok");
  });
};
