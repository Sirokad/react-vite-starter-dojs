"use strict";

const catalyst = require("zcatalyst-sdk-node");

module.exports = async (context, basicIO) => {
  try {
    const app = catalyst.initialize(context);
    const datastore = app.datastore();
    const table = datastore.table("matters");

    const method = context.requestType || "GET";

    if (method === "GET") {
      let allRows = [];
      let hasNext = true;
      let nextToken;

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

      basicIO.write(JSON.stringify({
        success: true,
        data: allRows,
      }));
      context.close();
      return;
    }

    if (method === "POST") {
      const body = basicIO.getAllArguments ? basicIO.getAllArguments() : {};
      const input = typeof body === "string" ? JSON.parse(body) : body;

      const inserted = await table.insertRow({
        matter_no: `MAT-${new Date().getFullYear()}-${Date.now()}`,
        title: input.title || "",
        type: input.type || "",
        owner: input.owner || "",
        department: input.department || "",
        status: input.status || "Open",
        opened_date: input.openedDate || "",
        priority: input.priority || "",
        description: input.description || "",
      });

      basicIO.write(JSON.stringify({
        success: true,
        data: inserted,
      }));
      context.close();
      return;
    }

    basicIO.write(JSON.stringify({
      success: false,
      message: "Method not allowed",
    }));
    context.close();
  } catch (error) {
    context.log("matters_api error:", error);
    basicIO.write(JSON.stringify({
      success: false,
      message: error.message,
    }));
    context.close();
  }
};