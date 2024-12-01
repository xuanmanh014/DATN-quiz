"use client";

import { LearnVideoApis } from "@/apis/learn-video/index.api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/contexts/app";
import { ILearnVideo } from "@/types/learn-video/index.type";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const LearnVideoPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [currentSection, setCurrentSection] = useState<number>(0);
    const params = useParams<{ id: string }>();
    const [learnVideo, setLearnVideo] = useState<ILearnVideo>();
    const { openNotiError } = useAppContext();

    useEffect(() => {
        LearnVideoApis.getById(params.id).then(response => {
            setLearnVideo(response.data);
        }).catch(error => {
            const { response } = error;
            openNotiError("Get learn video", response?.data?.message);
        })
    }, [params.id]);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleJumpToSection = (sectionIndex: number) => {
        const section = learnVideo?.videoSections?.[sectionIndex];
        if (videoRef.current && section) {
            videoRef.current.currentTime = section.start;
            videoRef.current.play();
        }
        setCurrentSection(sectionIndex);
    };

    return (
        <>
            <h1 className="text-[30px] font-bold">{learnVideo?.name}</h1>
            <Separator className="my-4" />
            <div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "20px" }}>

                <div>
                    <video
                        ref={videoRef}
                        controls
                        width={600}
                        src={learnVideo?.video?.filePath}
                        onTimeUpdate={handleTimeUpdate}
                    >
                    </video>

                    <p className="text-[20px] font-medium my-5">{learnVideo?.description}</p>

                    <Button onClick={() => handleJumpToSection(currentSection)}>Read script</Button>
                </div>

                <div style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "20px" }}>
                    {learnVideo?.videoSections?.map((section, sectionIndex) => (
                        <div key={sectionIndex} style={{ marginBottom: "20px" }}>
                            <Button
                                onClick={() => handleJumpToSection(sectionIndex)}
                                style={{
                                    padding: "10px",
                                    fontSize: "14px",
                                    marginBottom: "10px",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                {`00:${String(section.end - section.start).padStart(2, "0")}`}
                            </Button>

                            <div className="w-fit">
                                {section.segments.map((segment, segmentIndex) => (
                                    <p
                                        key={segmentIndex}
                                        style={{
                                            margin: "5px 0",
                                            fontSize: "16px",
                                            background: currentTime >= segment.start && currentTime <= segment.end
                                                ? "yellow"
                                                : "none",
                                        }}
                                    >
                                        {segment.text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LearnVideoPage;
