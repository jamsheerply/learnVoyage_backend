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
const request_1 = __importDefault(require("request"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
// Add this Cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, publicId, version } = req.body;
        const video = new videoModel_1.default({
            title,
            publicId,
            version,
        });
        const data = yield video.save();
        // console.log(data);
        res.status(201).json(data);
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
// Helper function to get video size
const getVideoSize = (url) => {
    return new Promise((resolve, reject) => {
        request_1.default.head(url, (err, res) => {
            if (err)
                reject(err);
            const contentLength = res.headers["content-length"];
            // console.log("contentLength", contentLength);
            if (typeof contentLength === "string") {
                resolve(parseInt(contentLength, 10));
            }
            else {
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
router.get("/stream/test/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield videoModel_1.default.findById(req.params.id);
        if (!video) {
            return res.status(404).send("Video not found");
        }
        console.log("Video found:", video);
        // const networkSpeed =
        //   parseFloat(req.headers["x-network-speed"] as string) || 1000000;
        // const bitrate = getAdaptiveBitrate(networkSpeed);
        let signedUrl;
        try {
            signedUrl = cloudinary_1.v2.url(video.publicId, {
                resource_type: "video",
                version: video.version,
                sign_url: true,
                secure: true,
            });
            console.log("Generated signed URL:", signedUrl);
        }
        catch (cloudinaryError) {
            console.error("Cloudinary URL generation error:", cloudinaryError);
            return res.status(500).send("Error generating video URL");
        }
        const range = req.headers.range;
        if (!range) {
            return res
                .status(400)
                .send("Requires Range header,donot try to download its copyright");
        }
        const videoSize = yield getVideoSize(signedUrl);
        // Ensure videoSize is a number
        if (typeof videoSize !== "number") {
            throw new Error("Invalid video size");
        }
        const CHUNK_SIZE = Math.pow(10, 6); // 1MB
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
        const videoStream = (0, request_1.default)({
            url: signedUrl,
            headers: {
                Range: `bytes=${start}-${end}`,
            },
        });
        videoStream.pipe(res);
    }
    catch (error) {
        console.error("Error streaming video:", error);
        res.status(500).send("Error streaming video");
    }
}));
//Stream video
router.get("/stream/:publicId/:version", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { publicId, version } = req.params;
        if (!publicId || !version) {
            return res.status(404).send("req params not found");
        }
        let signedUrl;
        try {
            signedUrl = cloudinary_1.v2.url(publicId, {
                resource_type: "video",
                version: version,
                sign_url: true,
                secure: true,
            });
            // console.log("Generated signed URL:", signedUrl);
        }
        catch (cloudinaryError) {
            console.error("Cloudinary URL generation error:", cloudinaryError);
            return res.status(500).send("Error generating video URL");
        }
        const range = req.headers.range;
        if (!range) {
            return res
                .status(400)
                .send("Requires Range header,donot try to download its copyright");
        }
        const videoSize = yield getVideoSize(signedUrl);
        // Ensure videoSize is a number
        if (typeof videoSize !== "number") {
            throw new Error("Invalid video size");
        }
        const CHUNK_SIZE = Math.pow(10, 6); // 1MB
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
        const videoStream = (0, request_1.default)({
            url: signedUrl,
            headers: {
                Range: `bytes=${start}-${end}`,
            },
        });
        videoStream.pipe(res);
    }
    catch (error) {
        console.error("Error streaming video:", error);
        res.status(500).send("Error streaming video");
    }
}));
router.get("/stream/:publicId/:version", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { publicId, version } = req.params;
        // console.log(publicId);
        let signedUrl;
        try {
            signedUrl = cloudinary_1.v2.url(`${publicId}`, {
                resource_type: "video",
                version: version,
                sign_url: true,
                secure: true,
            });
            // console.log("Generated signed URL:", signedUrl);
        }
        catch (cloudinaryError) {
            console.error("Cloudinary URL generation error:", cloudinaryError);
            return res.status(500).send("Error generating video URL");
        }
        const range = req.headers.range;
        if (!range) {
            return res.status(400).send("Requires Range header");
        }
        const videoRes = yield axios_1.default.get(signedUrl, {
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
    }
    catch (error) {
        console.error("Error streaming video:", error);
        res.status(500).send("Error streaming video");
    }
}));
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
exports.default = router;
