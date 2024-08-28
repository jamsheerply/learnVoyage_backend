import express from "express";
import Video from "../../../infrastructure/database/models/videoModel";
import { v2 as cloudinary } from "cloudinary";
import request from "request";
import dotenv from "dotenv";
import { IncomingMessage } from "http";
import axios from "axios";
dotenv.config();

// Add this Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, publicId, version } = req.body;

    const video = new Video({
      title,
      publicId,
      version,
    });

    const data = await video.save();

    // console.log(data);
    res.status(201).json(data);
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

// Helper function to get video size
const getVideoSize = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    request.head(url, (err: Error | null, res: IncomingMessage) => {
      if (err) reject(err);
      const contentLength = res.headers["content-length"];
      // console.log("contentLength", contentLength);
      if (typeof contentLength === "string") {
        resolve(parseInt(contentLength, 10));
      } else {
        reject(new Error("Content-Length header is missing or invalid"));
      }
    });
  });
};

// const getAdaptiveBitrate = (networkSpeed: number) => {
//   if (networkSpeed > 5000000) return "high";
//   if (networkSpeed > 1000000) return "medium";
//   return "low";
// };

//Stream video
router.get("/stream/test/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).send("Video not found");
    }

    console.log("Video found:", video);

    // const networkSpeed =
    //   parseFloat(req.headers["x-network-speed"] as string) || 1000000;
    // const bitrate = getAdaptiveBitrate(networkSpeed);

    let signedUrl;
    try {
      signedUrl = cloudinary.url(video.publicId, {
        resource_type: "video",
        version: video.version,
        sign_url: true,
        secure: true,
      });
      console.log("Generated signed URL:", signedUrl);
    } catch (cloudinaryError) {
      console.error("Cloudinary URL generation error:", cloudinaryError);
      return res.status(500).send("Error generating video URL");
    }

    const range = req.headers.range;
    if (!range) {
      return res
        .status(400)
        .send("Requires Range header,donot try to download its copyright");
    }

    const videoSize = await getVideoSize(signedUrl);

    // Ensure videoSize is a number
    if (typeof videoSize !== "number") {
      throw new Error("Invalid video size");
    }
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = request({
      url: signedUrl,
      headers: {
        Range: `bytes=${start}-${end}`,
      },
    });

    videoStream.pipe(res);
  } catch (error) {
    console.error("Error streaming video:", error);
    res.status(500).send("Error streaming video");
  }
});
//Stream video
router.get("/stream/:publicId/:version", async (req, res) => {
  try {
    const { publicId, version } = req.params;
    if (!publicId || !version) {
      return res.status(404).send("req params not found");
    }

    let signedUrl;
    try {
      signedUrl = cloudinary.url(publicId, {
        resource_type: "video",
        version: version,
        sign_url: true,
        secure: true,
      });
      // console.log("Generated signed URL:", signedUrl);
    } catch (cloudinaryError) {
      console.error("Cloudinary URL generation error:", cloudinaryError);
      return res.status(500).send("Error generating video URL");
    }

    const range = req.headers.range;
    if (!range) {
      return res
        .status(400)
        .send("Requires Range header,donot try to download its copyright");
    }

    const videoSize = await getVideoSize(signedUrl);

    // Ensure videoSize is a number
    if (typeof videoSize !== "number") {
      throw new Error("Invalid video size");
    }
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = request({
      url: signedUrl,
      headers: {
        Range: `bytes=${start}-${end}`,
      },
    });

    videoStream.pipe(res);
  } catch (error) {
    console.error("Error streaming video:", error);
    res.status(500).send("Error streaming video");
  }
});

router.get("/stream/:publicId/:version", async (req, res) => {
  try {
    const { publicId, version } = req.params;
    // console.log(publicId);
    let signedUrl;
    try {
      signedUrl = cloudinary.url(`${publicId}`, {
        resource_type: "video",
        version: version,
        sign_url: true,
        secure: true,
      });
      // console.log("Generated signed URL:", signedUrl);
    } catch (cloudinaryError) {
      console.error("Cloudinary URL generation error:", cloudinaryError);
      return res.status(500).send("Error generating video URL");
    }

    const range = req.headers.range;
    if (!range) {
      return res.status(400).send("Requires Range header");
    }

    const videoRes = await axios.get(signedUrl, {
      responseType: "stream",
      headers: { Range: range },
    });

    const videoSize = parseInt(videoRes.headers["content-length"], 10);
    const contentRange = videoRes.headers["content-range"];
    const contentType = videoRes.headers["content-type"];

    res.writeHead(206, {
      "Content-Range": contentRange,
      "Accept-Ranges": "bytes",
      "Content-Length": videoSize,
      "Content-Type": contentType,
    });

    videoRes.data.pipe(res);
  } catch (error) {
    console.error("Error streaming video:", error);
    res.status(500).send("Error streaming video");
  }
});

// router.get("/stream/:id", async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) {
//       return res.status(404).send("Video not found");
//     }

//     // Generate the HLS streaming URL
//     const streamingUrl = cloudinary.url(video.publicId, {
//       resource_type: "video",
//       streaming_profile: "full_hd",
//       format: "m3u8",
//     });

//     // Redirect to the Cloudinary URL instead of piping it through your server
//     res.redirect(streamingUrl);
//   } catch (error) {
//     console.error("Error streaming video:", error);
//     res.status(500).send("Error streaming video");
//   }
// });

export default router;
