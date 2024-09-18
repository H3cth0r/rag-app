import { PromptBox, TypingAnimation } from '@/components';

export default function Home() {
  const baseText = "RaggApp is ";
  const phrases = [
    "the Best Option to manage your coding projects.",
    "your go-to tool for efficient development.",
    "revolutionizing project management.",
    // Add more phrases as needed
  ];

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-2/3 w-1/2 ">
        <div className="h-2/5 w-full">
          <TypingAnimation baseText={baseText} phrases={phrases} />
        </div>
        <div className="h-3/5 w-full bg-blue-500">
          <PromptBox />
        </div>
      </div>
    </div>
  );
}
