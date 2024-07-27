import express from "express";
import Video from "../../../infrastructure/database/models/videoModel";
import { v2 as cloudinary } from "cloudinary";
import request from "request";
import dotenv from "dotenv";
dotenv.config();

// Add this Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const router = express.Router();

// Upload video
// router.post("/", async (req, res) => {
//   try {
//     const { title, publicId, version } = req.body;

//     const video = new Video({
//       title,
//       publicId,
//       version,
//     });

//     await video.save();
//     console.log(video);
//     res.status(201).json(video);
//   } catch (error) {
//     res.status(500).json({ error: "Error saving video details" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { title, publicId, version } = req.body;

    // Note: The adaptive streaming URL might not be immediately available
    // due to async processing. We'll store the publicId instead.
    const video = new Video({
      title,
      publicId,
      version,
      adaptiveStreamingPublicId: publicId,
    });

    const data = await video.save();

    // Set up adaptive streaming
    const result = await cloudinary.uploader.explicit(publicId, {
      type: "upload",
      resource_type: "video",
      eager: [{ streaming_profile: "full_hd", format: "m3u8" }],
      eager_async: true,
      eager_notification_url: `http://localhost:3000/api/content-management/videos/adaptive-streaming/${data._id}`,
    });

    // Generate and save the adaptive streaming URL
    // const streamingUrl = cloudinary.url(publicId, {
    //   resource_type: "video",
    //   streaming_profile: "full_hd",
    //   format: "m3u8",
    // });
    // data.adaptiveStreamingUrl = streamingUrl;
    // const data2 = await data.save();
    // console.log("adaptiveStreamingUrl", data2.adaptiveStreamingUrl);

    console.log(video);
    res.status(201).json(video);
  } catch (error) {
    console.error("Error saving video details:", error);
    res.status(500).json({ error: "Error saving video details" });
  }
});

// Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos" });
  }
});

// Get single video
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Error fetching video" });
  }
});

//Stream video
// router.get("/stream/:id", async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) {
//       return res.status(404).send("Video not found");
//     }

//     console.log("Video found:", video);

//     let signedUrl;
//     try {
//       signedUrl = cloudinary.url(video.publicId, {
//         resource_type: "video",
//         version: video.version,
//         sign_url: false,
//         secure: true,
//       });
//       console.log("Generated signed URL:", signedUrl);
//     } catch (cloudinaryError) {
//       console.error("Cloudinary URL generation error:", cloudinaryError);
//       return res.status(500).send("Error generating video URL");
//     }

//     // Set appropriate headers
//     res.setHeader("Content-Type", "video/mp4");
//     res.setHeader("Accept-Ranges", "bytes");

//     // Proxy the stream from Cloudinary to the client
//     request(signedUrl)
//       .on("error", (err) => {
//         console.error("Error in request stream:", err);
//         res.status(500).send("Error streaming video");
//       })
//       .pipe(res);
//   } catch (error) {
//     console.error("Error streaming video:", error);
//     res.status(500).send("Error streaming video");
//   }
// });

router.get("/stream/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).send("Video not found");
    }

    // Generate the HLS streaming URL
    const streamingUrl = cloudinary.url(video.adaptiveStreamingPublicId, {
      resource_type: "video",
      streaming_profile: "full_hd",
      format: "m3u8",
    });

    // Redirect to the Cloudinary URL instead of piping it through your server
    res.redirect(streamingUrl);
  } catch (error) {
    console.error("Error streaming video:", error);
    res.status(500).send("Error streaming video");
  }
});

router.get("/adaptive-streaming/:id", async (req, res) => {
  console.log("adaptive-stream is ready", req.params.id);
});

export default router;
