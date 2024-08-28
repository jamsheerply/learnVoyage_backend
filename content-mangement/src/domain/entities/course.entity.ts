import { Types } from "mongoose";

export interface ILessonContent {
  lessonNumber: string;
  lessonTitle: string;
  description: string;
  video: {
    publicId: string;
    version: string;
  };
}

export interface ICourse {
  id: string;
  courseName: string;
  categoryId: Types.ObjectId;
  description: string;
  language: string;
  coursePrice: number;
  courseThumbnailUrl: string;
  courseDemoVideo: {
    publicId: string;
    version: string;
  };
  isBlocked?: boolean;
  reason?: string;
  mentorId: string;
  lessons: ILessonContent[];
}
