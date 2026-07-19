import cloudinary from "../configs/cloudinary";
import Message from "../models/Messages";

// Create an empty object to store Server Side Event Connection
const connections = {};


// Controller for the SSE endpoint
export const sseController = (req, res) => {
    const { userId } = req.params;
    console.log("New Client connected: ", userId);

    // Set SSE Headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    connections[userId] = res;

    // Send initial event to the client
    res.write('log: Connected to SSE Stream\n\n')

    //Handle Client Disconnection
    req.on('close', () => {
        // Remove the Client's response object from the connections array
        delete connections[userId];
        console.log('Client disconnected');
    })

}


export const sendMessage = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { to_user_id, text } = req.body;
        const image = req.file;

        let media_url = '';
        let message_type = image ? 'image' : 'text';

        if (message_type === 'image') {
            media_url = await cloudinary.uploader.upload(image.path);

        }

        const message = await Message.create({
            from_user_id: userId,
            to_user_id,
            text,
            message_type,
            media_url
        })

        res.json({ success: true, message });

        // Send message to to_user_id using SSE 
        const messageWithUserData = await Message.findById(message._id).populate('from_user_id');

        if (connections[to_user_id]) {
            connections[to_user_id].write(`data: ${JSON.stringify(messageWithUserData)}\n\n`)

        }



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }


}


// Get Chat Messages
export const getChatMessages = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { to_user_id } = req.body;

        const messages = await Message.find({
            $or: [
                { from_user_id: userId, to_user_id },
                { from_user_id: to_user_id, to_user_id: userId },
            ]
        }).sort({ created_at: -1 })

        await Message.updateMany({ from_user_id: to_user_id, to_user_id: userId }, { seen: true });

        res.json({ success: true, messages })


    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const getUserRecentMessage = async (req, res) => {
    try {
        const { userId } = req.auth;
        const messages = await Message.find({ to_user_id: userId }).populate('from_user_id to_user_id').sort({ created_at: -1 })

        res.json({ success: true, messages });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}