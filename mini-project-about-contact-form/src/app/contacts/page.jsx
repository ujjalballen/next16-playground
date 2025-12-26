import ContactLists from "@/components/contact-lists";
import ContactStats from "@/components/contact-stats";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ContactsPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href={"/"}>
            <Button
              variant="outline"
              size="sm"
              className={"mb-4 cursor-pointer"}
            >
              Back to Form
            </Button>
          </Link>
        </div>

        <ContactStats />
        <ContactLists />
      </div>
    </div>
  );
}
