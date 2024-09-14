import { PromptBox } from '@/components';

export default function Home() {
  return (
    <div class="h-screen w-screen flex justify-center items-center">
      <div class="h-1/2 w-1/2 bg-red-500">
        <div class="h-2/5 w-full">
        </div>
        <div class="h-3/5 w-full bg-blue-500">
          <PromptBox />
        </div>
      </div>
    </div>
  );
}
