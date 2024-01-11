import Image from 'next/image';
import { Quiz } from '@/components/quiz';
import { NameTag } from '@/components/nametag';
import { Badge } from "@/components/ui/badge";

// https://platform.openai.com/playground?assistant=asst_532NxdHgVLGprQJu4f8Td9Vd&thread=thread_E89QT6iaUgScmmA4QfI1iP8T

export default function Home() {
  return (
    <>
      <div style={{ position: 'absolute', top: 5, right: 8 }}>
        <Badge className="bg-slate-700">V6</Badge>
      </div>
      <NameTag />
      <Quiz />
    </>
  );
}