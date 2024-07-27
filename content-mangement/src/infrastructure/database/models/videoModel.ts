import mongoose, { Document, Schema } from "mongoose";

interface IVideo extends Document {
  title: string;
  publicId: string;
  version: string;
  adaptiveStreamingPublicId: string;
  // adaptiveStreamingUrl: string;
  createdAt: Date;
}

const videoSchema = new mongoose.Schema({
  title: String,
  publicId: String,
  version: String,
  adaptiveStreamingPublicId: String,
  // adaptiveStreamingUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVideo>("Video", videoSchema);
