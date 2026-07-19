// import { useImperativeHandle } from "react";
import cloudinary from "../configs/cloudinary.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

// Add Post
export const addPost = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { content, post_type } = req.body;
        const images = req.files;

        let images_url = [];

        if (images.length) {
            images_url = await Promise.all(
                images.map(async (image) => {
                    const response = await cloudinary.uploader.upload(image.path);
                    const url = response.url;
 
                    return url;
                })
            )
        }

        await Post.create({
            user: userId,
            content,
            images_url,
            post_type
        })
        return res.json({ success: true, message: "Post Created Successfully" });


    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })

    }


}



// Get Feed Posts
export const getFeedPosts = async (req, res) => {
    try {
        const { userId } = req.auth();
        const user = await User.findById(userId);

        // User Connections and Followings
        const userIds = [userId, ...user.following, ...user.connections];
        const posts = await Post.find({ user: { $in: userIds } }).populate('user').sort({ createdAt: -1 });

        res.json({ success: true, posts });


    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }

}


// Like Post
export const likePost = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { postId } = req.body;


        const post = await Post.findById(postId);
        if (post.likes_count.includes(userId)) {
            post.likes_count = post.likes_count.filter((user) => user !== userId);
            await post.save();

            return res.json({ success: true, message: "Post unliked" });

        } else {
            post.likes_count.push(userId);
            await post.save();

            return res.json({ success: true, message: "Post Liked" });
        }


    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }

}