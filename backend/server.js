const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors=require('cors')
app.use(cors())

app.use(express.json()); // Middleware for parsing JSON

const Schema = mongoose.Schema;

// Financial Management Schema
const financialModel = new Schema(
  {
    totalIncome: Number,
    totalSaving: Number,
    totalExpense: Number,
    totalBalance: Number,
  },
  { timestamps: true }
);

const FinancialRecord = mongoose.model("FinancialRecord", financialModel);

// Route to get all financial records
app.get('/financialRecords', async (req, res) => {
  try {
    const records = await FinancialRecord.find({}).sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(404).json({ message: "Records could not be fetched", error });
  }
});

// Route to get a specific financial record by ID
app.get('/financialRecords/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const record = await FinancialRecord.findById(id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Record could not be fetched", error });
  }
});

// Route to add a new financial record
app.post('/financialRecords', async (req, res) => {
  try {
    const record = new FinancialRecord(req.body);
    await record.save();
    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ message: "Record could not be created", error });
  }
});

// Route to update a financial record by ID
app.put('/financialRecords/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const record = await FinancialRecord.findByIdAndUpdate(id, req.body, { new: true });
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Record could not be updated", error });
  }
});

// Route to delete a financial record by ID
// Route to delete a financial record by ID
app.delete('/financialRecords/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const record = await FinancialRecord.findByIdAndDelete(id);
    if (record) {
      res.status(200).json({ message: "Record deleted successfully", record });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: "Error deleting record", error });
  }
});

// MongoDB connection
mongoose
  .connect("")
  .then(() => {
    app.listen(4000, () => {
      console.log("Listening on port 4000 and connected to DB");
    });
  })
  .catch((error) => {
    console.log(error);
  });
