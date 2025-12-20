"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/products");
    // router.replace("/products");
  };

  const handleGOBack = () => {
    router.back();
  };

  const handleForward = () => {
    router.forward();
  };

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div>
      Login Page:
      <button onClick={handleClick} className="py-2 px-2 bg-amber-400">
        Go to Products
      </button>
      <button onClick={handleGOBack} className="py-2 px-2 bg-amber-400">
        Back
      </button>
      <button onClick={handleForward} className="py-2 px-2 bg-amber-400">
        Forward
      </button>
      <button onClick={handleRefresh} className="py-2 px-2 bg-amber-400">
        Refresh
      </button>
    </div>
  );
}
