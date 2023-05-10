const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "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"
);
const { updateUserMiddleware } = require("./routes");
const app = express();

const routes = require("./routes");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "xxxtentacion",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static("public"));
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/register", routes.register);
app.get("/home", updateUserMiddleware, routes.home);
app.get("/notLoggedIn", routes.notLoggedIn);
app.get("/logOut", routes.logOut);
app.get("/debt", routes.debt);
app.get("/payment", routes.payment);

app.post("/fixer", updateUserMiddleware, routes.fixer);
app.post("/register", routes.signUp);
app.post("/login", routes.signIn);
const endpointSecret =
  "sk_test_51I0mRmHiNK1WM4b4KSRBCiSdt04fBVGGjPx5bbx7YpMrlbiGJHrLAPVPwXXLX76uF56thE5OpuX3Ryu1DTCTuMzW00LYn9X5En";
app.post(
  "https://lazy-owls-win.loca.lt",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "invoice.created":
        const invoiceCreated = event.data.object;
        // Then define and call a function to handle the event invoice.created
        break;
      case "invoice.deleted":
        const invoiceDeleted = event.data.object;
        // Then define and call a function to handle the event invoice.deleted
        break;
      case "invoice.paid":
        const invoicePaid = event.data.object;
        // Then define and call a function to handle the event invoice.paid
        break;
      case "invoice.payment_failed":
        const invoicePaymentFailed = event.data.object;
        // Then define and call a function to handle the event invoice.payment_failed
        break;
      case "invoice.payment_succeeded":
        const invoicePaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event invoice.payment_succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.listen(3000);
