const express = require("express");
const app = express();
const port = 3000;
const data = require("./db.json");




//call this api : http://localhost:3000/timing/1234567




// check availability API  on the basis of timings

app.post("/timing/:timing", (req, res) => {
  const { timing } = req.params;
  console.log("timing", timing);
  if (!timing) {
    return res.status(400).send("timing parameter is missing");
  }

  console.log("Requested timing:", timing);

  const available = data.filter((item) => {
    return item.timings >= timing && item.isAvailable;
  });

  if (available.length > 0) {
    res.send({ "available Sheets": available.length, Sheets: available });
  } else {
    res.send("Not available");
  }
});

// api for booking the ticket

// API endpoint to update isAvailable to false
app.put("/booking/:ticketId", (req, res) => {
  const { ticketId } = req.params;

  // Find the ticket with the specified ticketId
  const ticket = data.find((t) => t.ticketId === ticketId);

  if (!ticket) {
    return res.status(404).send("Ticket not found");
  }

  // Update isAvailable to false
  ticket.isAvailable = false;
  
//    you can do something in sql of nosql DB right 
  res.send("Booking marked as not available");
});

//api for Cancellation
// API endpoint to update isAvailable to true (cancellation)
app.put("/cancellation/:ticketId", (req, res) => {
  const { ticketId } = req.params;

  // Find the ticket with the specified ticketId
  const ticket = data.find((t) => t.ticketId === ticketId);

  if (!ticket) {
    return res.status(404).send("Ticket not found");
  }

  // Check if the ticket is currently available
  if (!ticket.isAvailable) {
    return res.status(400).send("Ticket is already not available");
  }

  // Update isAvailable to true (cancellation)
  ticket.isAvailable = true;
  //    you can do something in sql of nosql DB right 

  res.send("Booking canceled, ticket is now available");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
