import { IFile } from "../common/index.type";

export type TextSegment = {
    start: number;
    end: number;
    text: string;
};

export type VideoSection = {
    start: number;
    end: number;
    segments: TextSegment[];
};

export interface ILearnVideo {
    _id?: string;
    name: string;
    description: string;
    video: IFile;
    videoSections: VideoSection[]
}