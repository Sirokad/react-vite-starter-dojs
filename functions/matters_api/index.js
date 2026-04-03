"use strict";

const catalyst = require("zcatalyst-sdk-node");

async function getAllRowsPaged(table) {
  let allRows = [];
  let hasNext = true;
  let nextToken = undefined;

  while (hasNext) {
    const response = await table.getMyPagedRows({
      next_token: nextToken,
      max_rows: 200,
    });

    const rows = response?.data || [];
    allRows = allRows.concat(rows);

    hasNext = response?.pagination?.has_more_records || false;
    nextToken = response?.pagination?.next_token;
  }

  return allRows;
}

module.exports = async (req, res) => {
  try {
    const app = catalyst.initialize(req);
    const datastore = app.datastore();
    const table = datastore.table("matters");

    if (req.method === "GET") {
      const records = await getAllRowsPaged(table);

      return res.send({
        success: true,
        data: records,
      });
    }

    if (req.method === "POST") {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;

      const inserted = await table.insertRow({
        matter_no: `MAT-${new Date().getFullYear()}-${Date.now()}`,
        title: body.title || "",
        type: body.type || "",
        owner: body.owner || "",
        department: body.department || "",
        status: body.status || "Open",
        opened_date: body.openedDate || "",
        priority_: body.priority || "",
        description: body.description || "",
      });

      return res.send({
        success: true,
        data: inserted,
      });
    }

    return res.status(405).send({
      success: false,
      message: "Method not allowed",
    });
  } catch (error) {
    console.error("matters_api error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};