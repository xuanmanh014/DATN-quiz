import SectionTitle from "@/components/pages/section/SectionTitle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FAQs, PracticesSection } from "../../data/data";
import PracticeCard from "@/components/pages/card/PracticeCard";
import Link from "next/link";
import { QuizApis } from "@/apis/quiz/index.api";
import { IQuiz } from "@/types/quiz/index.type";
import ExercisesCard from "@/components/pages/card/ExercisesCard";
import { IQuizByTopic } from "@/types/common/index.type";

const fetchQuizzes = async () => {
    const response = await QuizApis.getAll();

    return response.data.data || [];
}

export default async function Home() {
    const quizzes: IQuiz[] = await fetchQuizzes();
    const quizzesTransformed = quizzes.reduce((acc, current) => {
        const existingTopic = acc.find(item => item.topic === current.quizTopic?.topicName);

        if (existingTopic) {
            existingTopic.quizzes?.push(current);
        } else {
            acc.push({
                topic: current.quizTopic?.topicName,
                quizzes: [current]
            });
        }

        return acc;
    }, [] as IQuizByTopic[]);

    return (
        <article className="mb-10">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <h1 className="text-[40px] font-medium">Practice English with dictation exercises</h1>

                    <p className="my-5">Dictation is a method to learn languages by listening and writing down what you hear. It is a highly effective method!</p>

                    <p className="my-5">This website contains hundreds of dictation exercises to help English learners practice easily and improve quickly.</p>

                    <div className="flex items-center gap-4">
                        <Link href={"/exercises"}>
                            <Button className="bg-blue-500">Start now</Button>
                        </Link>
                        <p>It's 100% FREE!</p>
                    </div>
                </div>
            </div>
            <Separator className="my-[30px]" />

            <SectionTitle
                title="How practicing dictation will improve your English skills?"
                descriptions="When practicing exercises at dailydictation.com, you will go through 4 main steps, all of them are equally important!"
            />

            <div className="grid grid-cols-2 gap-8">
                {PracticesSection.map((practice, index) => {
                    return (
                        <div key={index} className="col-span-1">
                            <PracticeCard
                                image={practice.image}
                                title={practice.title}
                                descriptions={practice.descriptions}
                            />
                        </div>
                    )
                })}
            </div>

            <Separator className="my-[30px]" />

            <SectionTitle
                title="Available exercises"
                descriptions={<span>
                    Currently, there are more than 1000 exercises on our website, they are divided into different topics. Below is the list of <Link href={"/exercises"} className="text-blue-500">all the topics</Link> and some exercises for each of them:
                </span>}
            />

            <div className="grid grid-cols-2 gap-6">
                {quizzesTransformed.map(item => {
                    return (
                        <div key={item.topic} className="col-span-1">
                            <ExercisesCard exercise={item} />
                        </div>
                    )
                })}
            </div>

            <Separator className="my-[30px]" />

            <SectionTitle
                title="Frequently Asked Questions"
            />

            <div className="grid grid-cols-2 gap-10">
                {FAQs.map((faq, index) => {
                    return (
                        <div key={index} className="col-span-1">
                            <h4 className="text-[25px] font-medium mb-2">{faq.title}</h4>
                            <p>{faq.descriptions}</p>
                        </div>
                    )
                })}
            </div>
        </article>
    );
}
