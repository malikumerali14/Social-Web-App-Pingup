import cloudinary from "../configs/cloudinary.js";
import { inngest } from "../inngest/index.js";
import Story from "../models/Story.js";
import User from "../models/User.js";


// Add Story
export const addStory = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { content, media_type, background_color } = req.body;
        const media = req.file;

        let media_url = '';

        if (media_type == 'image' || media_type == 'video') {
            const response = await cloudinary.uploader.upload(media.path);
            media_url = response.url;

        }

        const story = await Story.create({
            user: userId,
            content,
            media_type,
            background_color,
            media_url
        })

        // Schedule Story Deletion after 24 Hours using inngest
        await inngest.send({
            name: 'app/story.delete',
            data: { storyId: story._id }
        })

        return res.json({ success: true, message: "Story Created Successfully" });


    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }

}


// Get Stories
export const getStories = async (req, res) => {
    try {
        const { userId } = req.auth();
        const user = await User.findById(userId);

        const userIds = [userId, ...user.connections, ...user.following];

        const stories = await Story.find({ user: { $in: userIds } }).populate('user').sort({ createdAt: -1 });
        return res.json({ success: true, stories });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }

}