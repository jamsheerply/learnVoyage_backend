"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoModel_1 = __importDefault(require("../../../infrastructure/database/models/videoModel"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Add this Cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const router = express_1.default.Router();
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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, publicId, version } = req.body;
        // Note: The adaptive streaming URL might not be immediately available
        // due to async processing. We'll store the publicId instead.
        const video = new videoModel_1.default({
            title,
            publicId,
            version,
            adaptiveStreamingPublicId: publicId,
        });
        const data = yield video.save();
        // Set up adaptive streaming
        const result = yield cloudinary_1.v2.uploader.explicit(publicId, {
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
    }
    catch (error) {
        console.error("Error saving video details:", error);
        res.status(500).json({ error: "Error saving video details" });
    }
}));
// Get all videos
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield videoModel_1.default.find().sort({ createdAt: -1 });
        res.json(videos);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching videos" });
    }
}));
// Get single video
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield videoModel_1.default.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }
        res.json(video);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching video" });
    }
}));
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
router.get("/stream/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield videoModel_1.default.findById(req.params.id);
        if (!video) {
            return res.status(404).send("Video not found");
        }
        // Generate the HLS streaming URL
        const streamingUrl = cloudinary_1.v2.url(video.adaptiveStreamingPublicId, {
            resource_type: "video",
            streaming_profile: "full_hd",
            format: "m3u8",
        });
        // Redirect to the Cloudinary URL instead of piping it through your server
        res.redirect(streamingUrl);
    }
    catch (error) {
        console.error("Error streaming video:", error);
        res.status(500).send("Error streaming video");
    }
}));
router.get("/adaptive-streaming/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("adaptive-stream is ready", req.params.id);
}));
exports.default = router;
