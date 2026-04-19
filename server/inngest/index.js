import { Inngest } from "inngest";
import User from '../models/User.js'
import connectDB from "../configs/db.js";
import mongoose from "mongoose";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "pingup-app" });

const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
        triggers: { event: "clerk/user.created" },
    },
    async ({ event }) => {
        await connectDB();

        try {
            const { id, email_addresses, first_name, last_name, image_url } = event.data;
            let username = email_addresses[0]?.email_address.split('@')[0];

            // const user = await User.findOne({ username });

            username = username + Math.floor(Math.random() * 1000);

            const userData = {
                _id: id,
                email: email_addresses[0]?.email_address,
                full_name: first_name + " " + last_name,
                profile_picture: image_url,
                username
            }

            await User.create(userData);


        } catch (error) {
            console.error("User creation failed:", err);
            throw err;
        }


    }
);

//Function to update user data in database 
const syncUserUpdation = inngest.createFunction(
    {
        id: "update-user-from-clerk",
        triggers: { event: "clerk/user.updated" },
    },
    async ({ event }) => {
        const { id, email_addresses, first_name, last_name, image_url } = event.data;
        let username = email_addresses[0].split('@')[0];

        const updateUserData = {
            email: email_addresses[0],
            full_name: first_name + " " + last_name,
            profile_picture: image_url
        }

        await User.findByIdAndUpdate(id, updateUserData);

    }
);


//Function to delete user data from database 
const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-from-clerk",
        triggers: { event: "clerk/user.deleted" },
    },
    async ({ event }) => {
        const { id } = event.data;

        await User.findByIdAndDelete(id);

    }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
];