const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

async function connectDB() {

    try {

        await client.connect();

        console.log("MongoDB Connected Successfully");

    } catch (error) {

        console.log(error);

    }

}

connectDB();

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "indexes.html"));

});
app.post("/add-patient", async (req, res) => {

    try {

        const db = client.db("jaaw_dental_clinic");

        const patients = db.collection("patients");

        await patients.insertOne(req.body);

        res.send("Patient Saved Successfully");

    }

    catch(error){

        console.log(error);

        res.status(500).send("Error Saving Patient");

    }

});
app.get("/patients", async (req, res) => {

    try {

        const db = client.db("jaaw_dental_clinic");

        const patients = db.collection("patients");

        const patientList = await patients.find().toArray();

        res.json(patientList);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error fetching patients"
        });

    }

});
app.post("/add-staff", async (req, res) => {

    try {

        const db = client.db("jaaw_dental_clinic");

        const staff = db.collection("staff");

        await staff.insertOne(req.body);

        res.json({ message: "Staff Saved Successfully" });

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: "Error Saving Staff" });

    }

});

app.get("/staff", async (req, res) => {

    try {

        const db = client.db("jaaw_dental_clinic");

        const staff = db.collection("staff");

        const staffList = await staff.find().toArray();

        res.json(staffList);

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: "Error Fetching Staff" });

    }

});
// ADD APPOINTMENT

app.post("/add-appointment", async (req, res) => {

    try {

        const db = client.db("jaaw_dental_clinic");

        const appointments = db.collection("appointments");

        await appointments.insertOne(req.body);

        res.json({
            message: "Appointment Saved Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Saving Appointment"
        });

    }

});

// GET ALL APPOINTMENTS

app.get("/appointments", async (req, res) => {

    try {

        const db = client.db("jaaw_dental_clinic");

        const appointments = db.collection("appointments");

        const appointmentList = await appointments.find().toArray();

        res.json(appointmentList);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Fetching Appointments"
        });

    }

});
// ADD MEDICINE

app.post("/add-medicine", async (req, res) => {

    try {

        const db = client.db("jaaw_dental_clinic");

        const medicines = db.collection("medicines");

        await medicines.insertOne(req.body);

        res.json({
            message: "Medicine Saved Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Saving Medicine"
        });

    }

});

app.get("/medicines", async (req, res) => {

    try {

        const db = client.db("jaaw_dental_clinic");

        const medicines = db.collection("medicines");

        const medicineList = await medicines.find().toArray();

        res.json(medicineList);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Fetching Medicines"
        });

    }

});
console.log("Medicines Route Loaded Successfully");
app.post("/login",(req,res)=>{

    const {username,password}=req.body;

    if(username==="admin" && password==="admin123"){

        res.json({

            success:true

        });

    }

    else{

        res.json({

            success:false

        });

    }

});
app.listen(3000, () => {
    console.log("Server Started on Port 3000");

});