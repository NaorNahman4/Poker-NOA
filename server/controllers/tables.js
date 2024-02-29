const tableService = require('../services/tables.js');

const getAllTables = async (req, res) => {
    const tables = await tableService.getAllTables();
    if(tables) {
        res.status(200).json(tables);
    }
    else {
        res.status(500).json({});
    }
}

const validateTable = async (req, res) => {
    const name = req.body.name;
    const password = req.body.password

    const table = await tableService.validateTable(name, password);
    //if we have user and password
    if(table) {
        res.status(200).json(table);
    }
    else {
        //not found (incorrect username or password)
        res.status(404).json({});
    }
}

const addTable = async (req, res) => {
    const new_table = req.body.table;
    const userCreated = req.body.nickname;

    let status = await tableService.addTable(new_table, userCreated);
    //table name taken
    if (status === 2) {
        res.status(302).json({});
    } //Max players is larger than 4
    else if (status === 1) {
        res.status(303).json({});
    }
    else {
        res.status(200).json({});
    }
}

module.exports = {
    getAllTables, validateTable, addTable
  }