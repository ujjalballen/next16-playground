"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { createContact } from "../../actions";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setMessage("");

    const result = await createContact(formData);

    if (result.success) {
      setMessage("Message Send Successfully");
      console.log("RES Data: ", result.contactId);
      formRef.current.reset();
    } else {
      setMessage(result.error || "Something went Wrong");
    }

    setIsSubmitting(false);
  }

  return (
    <Card className={"w-full max-w-2xl mx-auto"}>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        {message && (
          <div
            className={`mb-6 p-4 rounded ${
              message.includes("Successfully")
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form
          ref={formRef}
          action={handleSubmit}
          id="contact-form"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              disabled={isSubmitting}
              className={"max-h-[120px]"}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className={"w-full"}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
