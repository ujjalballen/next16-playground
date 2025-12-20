"use client"
import { useRouter } from "next/navigation";

export default function GOBACK() {
  const router = useRouter();
  const handleGOBack = () => {
    router.back();
  };




  return (
    <div>
      <button onClick={handleGOBack} className="py-2 px-2 bg-amber-400">
        Back
      </button>

    </div>
  );
}
