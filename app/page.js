import Image from 'next/image';
import { Quiz } from '@/components/quiz';
import { NameTag } from '@/components/nametag';
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <>
      <div style={{ position: 'absolute', top: 5, right: 8 }}>
        <Badge className="bg-slate-700">V4</Badge>
      </div>
      <NameTag />
      <Quiz />
    </>
  );
}