import Image from "next/image";
import DeepSeekChat from './components/DeepSeekChat';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-950">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">DeepSeek Chat</h1>
        <DeepSeekChat />
      </main>
    </div>
  );
}
