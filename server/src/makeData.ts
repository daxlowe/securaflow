import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import User from "./models/User";
import Group from "./models/Group";
import Ticket from "./models/Ticket";
import dotenv from "dotenv";

dotenv.config();

const DB_CONN_STRING: string = `${process.env.DB_CONN}${process.env.DB_NAME}${process.env.DB_OPTIONS}`;

const createDummyData = async (numTickets: number) => {
  try {
    await Ticket.deleteMany({});

    // Retrieve all user IDs
    const allUserIds = await User.find({}, "_id").lean().exec();

    // Retrieve the specific group with ID '65712e165fc8178ec0758361'
    const specificGroup = await Group.findById("65712e165fc8178ec0758361")
      .lean()
      .exec();

    if (!specificGroup) {
      console.error(
        "The specified group with ID 65712e165fc8178ec0758361 not found."
      );
      return;
    }

    // Update the specific group with all user IDs
    await Group.findByIdAndUpdate(
      specificGroup._id,
      { $set: { users: allUserIds.map((user) => user._id) } },
      { new: true }
    );

    // Creating Tickets with varying properties and status updates
    const tickets = await Ticket.create(
      Array.from({ length: numTickets }, (_, index) => ({
        title: `Ticket${index + 1}`,
        description: faker.lorem.sentence(),
        difficulty: faker.number.int({ min: 1, max: 5 }),
        team: [specificGroup._id], // Add the specific group ID to the team array
        assignees: allUserIds.map((user) => user._id), // Assign all users to each ticket
        time_estimate: faker.number.int({ min: 5, max: 30 }),
        status_updates: [
          {
            body: faker.helpers.arrayElement([
              "In Progress",
              "Assigned",
              "Open",
              "Closed",
            ]),
            date_started: faker.date.past(),
            date_ended: null,
          },
        ],
        vulnerability: {
          name: faker.string.uuid(),
          cve_id: `CVE-${index + 1}`,
          priority: faker.helpers.arrayElement([
            "Low",
            "Medium",
            "High",
            "Critical",
          ]),
        },
        comments: [faker.lorem.sentence(), faker.lorem.sentence()],
        created_by: "some_user_id",
      }))
    );

    // Update Users with Ticket Information
    for (let ticket of tickets) {
      if (!ticket.assignees) {
        continue;
      }
      await Promise.all(
        ticket.assignees.map((userId) =>
          User.findByIdAndUpdate(userId, { $push: { tickets: ticket._id } })
        )
      );
    }

    console.log("Dummy data created successfully.");
  } catch (error) {
    console.error("Error creating dummy data:", error);
  } finally {
    await mongoose.disconnect();
  }
};

mongoose
  .connect(DB_CONN_STRING)
  .then(async () => {
    console.log("Connected to DB. Running data seed script.");
    createDummyData(15); // You can adjust the number of tickets as needed
  })
  .catch((error) => {
    console.error("Error connecting to the database or creating data:", error);
  });
