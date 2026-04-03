'use strict';

const catalyst = require('zcatalyst-sdk-node');

module.exports = async (req, res) => {
  try {
    const app = catalyst.initialize(req);
    const datastore = app.datastore();
    const table = datastore.table('matters');

    const method = req.method;

    if (method === "GET") {
      const records = await table.getAllRows();

      return res.send({
        success: true,
        data: records
      });
    }

    if (method === "POST") {
      const body = typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

      const inserted = await table.insertRow({
        matter_no: body.title ? `MAT-${new Date().getFullYear()}-${Date.now()}` : "",
        title: body.title,
        type: body.type,
        owner: body.owner,
        department: body.department,
        status: body.status,
        opened_date: body.openedDate,
        priority_: body.priority,
        description: body.description
      });

      return res.send({
        success: true,
        data: inserted
      });
    }

    return res.status(405).send({
      success: false,
      message: "Method not allowed"
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
};