export interface ILessonContent {
  lessonNumber: string;
  lessonTitle: string;
  description: string;
  videoUrl: string;
}

export interface ICourse {
  id: string;
  courseName: string;
  category: string;
  description: string;
  language: string;
  coursePrice: number;
  courseThumbnailUrl: string;
  courseDemoVideoUrl: string;
  mentorId: string;
  content: ILessonContent[];
}
