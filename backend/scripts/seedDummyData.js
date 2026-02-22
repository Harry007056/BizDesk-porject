const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const connectDB = require("../config/db");
const Business = require("../models/Business");
const User = require("../models/Users");
const Customer = require("../models/Customer");
const Service = require("../models/Service");
const Appointment = require("../models/Appointment");
const Subscription = require("../models/Subscription");

const makeDate = (daysOffset, hour, minute = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  d.setHours(hour, minute, 0, 0);
  return d;
};

const seed = async () => {
  await connectDB();

  const demoSlug = "bizdesk-demo";
  const existing = await Business.findOne({ slug: demoSlug });

  if (existing) {
    await Promise.all([
      Appointment.deleteMany({ business: existing._id }),
      Service.deleteMany({ business: existing._id }),
      Customer.deleteMany({ business: existing._id }),
      User.deleteMany({ business: existing._id }),
      Subscription.deleteMany({ business: existing._id }),
    ]);
    await Business.deleteOne({ _id: existing._id });
  }

  const business = await Business.create({
    name: "BizDesk Demo Salon",
    slug: demoSlug,
    industry: "salon",
    timezone: "Asia/Kolkata",
    currency: "INR",
    status: "active",
  });

  const owner = await User.create({
    business: business._id,
    name: "Aarav Owner",
    email: "owner@bizdesk-demo.com",
    password: "Demo@123",
    phone: "9999999901",
    role: "owner",
  });

  const admin = await User.create({
    business: business._id,
    name: "Meera Admin",
    email: "admin@bizdesk-demo.com",
    password: "Demo@123",
    phone: "9999999902",
    role: "admin",
  });

  const staff1 = await User.create({
    business: business._id,
    name: "Riya Stylist",
    email: "riya@bizdesk-demo.com",
    password: "Demo@123",
    phone: "9999999903",
    role: "staff",
  });

  const staff2 = await User.create({
    business: business._id,
    name: "Kabir Barber",
    email: "kabir@bizdesk-demo.com",
    password: "Demo@123",
    phone: "9999999904",
    role: "staff",
  });

  business.owner = owner._id;
  await business.save();

  const customers = await Customer.insertMany([
    {
      business: business._id,
      name: "Neha Sharma",
      email: "neha.sharma@example.com",
      phone: "9876543210",
      notes: "Prefers evening slots",
      tags: ["vip", "regular"],
      totalVisits: 5,
      lastVisitAt: makeDate(-5, 17),
    },
    {
      business: business._id,
      name: "Rahul Verma",
      email: "rahul.verma@example.com",
      phone: "9876543211",
      notes: "Sensitive skin, use mild products",
      tags: ["skin-care"],
      totalVisits: 2,
      lastVisitAt: makeDate(-10, 12),
    },
    {
      business: business._id,
      name: "Pooja Iyer",
      email: "pooja.iyer@example.com",
      phone: "9876543212",
      tags: ["new"],
    },
    {
      business: business._id,
      name: "Arjun Patil",
      email: "arjun.patil@example.com",
      phone: "9876543213",
      totalVisits: 1,
      lastVisitAt: makeDate(-15, 15),
    },
  ]);

  const services = await Service.insertMany([
    {
      business: business._id,
      name: "Hair Cut",
      description: "Basic hair styling and cut",
      category: "hair",
      durationMin: 45,
      price: 399,
      currency: "INR",
      createdBy: admin._id,
    },
    {
      business: business._id,
      name: "Facial Cleanup",
      description: "Deep cleansing facial treatment",
      category: "skin",
      durationMin: 60,
      price: 899,
      currency: "INR",
      createdBy: admin._id,
    },
    {
      business: business._id,
      name: "Beard Grooming",
      description: "Trim and shape with finishing",
      category: "grooming",
      durationMin: 30,
      price: 299,
      currency: "INR",
      createdBy: admin._id,
    },
  ]);

  await Appointment.insertMany([
    {
      business: business._id,
      service: services[0]._id,
      customer: customers[0]._id,
      staff: staff1._id,
      startAt: makeDate(1, 11, 0),
      endAt: makeDate(1, 11, 45),
      status: "scheduled",
      notes: "Requested layered cut",
      priceSnapshot: services[0].price,
      createdBy: admin._id,
    },
    {
      business: business._id,
      service: services[1]._id,
      customer: customers[1]._id,
      staff: staff1._id,
      startAt: makeDate(2, 14, 0),
      endAt: makeDate(2, 15, 0),
      status: "confirmed",
      priceSnapshot: services[1].price,
      createdBy: admin._id,
    },
    {
      business: business._id,
      service: services[2]._id,
      customer: customers[2]._id,
      staff: staff2._id,
      startAt: makeDate(-3, 16, 0),
      endAt: makeDate(-3, 16, 30),
      status: "completed",
      priceSnapshot: services[2].price,
      createdBy: admin._id,
    },
    {
      business: business._id,
      service: services[0]._id,
      customer: customers[3]._id,
      staff: staff2._id,
      startAt: makeDate(-1, 10, 0),
      endAt: makeDate(-1, 10, 45),
      status: "cancelled",
      cancelledReason: "Customer unavailable",
      priceSnapshot: services[0].price,
      createdBy: admin._id,
    },
  ]);

  await Subscription.create({
    business: business._id,
    plan: "growth",
    status: "active",
    seats: 8,
    trialEndsAt: makeDate(-20, 0),
    renewalDate: makeDate(10, 0),
    paymentProvider: "manual",
    providerCustomerId: "demo_customer_001",
    features: {
      maxStaff: 20,
      maxAppointmentsPerMonth: 5000,
      analyticsEnabled: true,
    },
  });

  console.log("Dummy data seeded successfully.");
  console.log("Business slug:", demoSlug);
  console.log("Login email: owner@bizdesk-demo.com");
  console.log("Login password: Demo@123");
};

seed()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
