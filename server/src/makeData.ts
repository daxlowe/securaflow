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

    // Retrieve the specific groups with IDs '656fdc30c520c1e6536d0931' and '656fdc31c520c1e6536d0939'
    const group1 = await Group.findById("65712e165fc8178ec0758361")
      .lean()
      .exec();
    const group2 = await Group.findById("656fdc31c520c1e6536d0939")
      .lean()
      .exec();

    if (!group1 || !group2) {
      console.error("One or both specified groups not found.");
      return;
    }

    // Update the specific group with all user IDs
    await Group.findByIdAndUpdate(
      group1._id,
      { $set: { users: allUserIds.map((user) => user._id) } },
      { new: true }
    );

    // Update the specific group with all user IDs
    await Group.findByIdAndUpdate(
      group2._id,
      { $set: { users: allUserIds.map((user) => user._id) } },
      { new: true }
    );

    // Creating Tickets with varying properties and status updates
    const tickets = await Ticket.create(
      Array.from({ length: numTickets }, (_, index) => ({
        title: faker.hacker.adjective() + ` Ticket${index + 1}`,
        description: faker.lorem.sentence(),
        difficulty: faker.number.int({ min: 1, max: 5 }),
        team: faker.helpers.arrayElements([group1._id, group2._id], 1),
        assignees: faker.helpers.arrayElement(allUserIds),
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
        created_by: "656fdc30c520c1e6536d0931",
      }))
    );

    // Update Users with Ticket Information
    for (let ticket of tickets) {
      const latestStatusUpdate = ticket.status_updates[0];

      // Check if the latest status is 'Open' or if there are no assignees
      if (latestStatusUpdate.body === "Open") {
        continue;
      }

      // Assuming you want to add only a few assignees, you can modify the logic here
      const selectedAssignees = ticket.assignees.slice(0, 2); // Adjust the number of assignees as needed

      await Promise.all(
        selectedAssignees.map(async (userId) => {
          // Update the ticket's assignees array
          await Ticket.findByIdAndUpdate(
            ticket._id,
            { $push: { assignees: userId } },
            { new: true }
          );
        })
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
    createDummyData(50); // You can adjust the number of tickets as needed
  })
  .catch((error) => {
    console.error("Error connecting to the database or creating data:", error);
  });
