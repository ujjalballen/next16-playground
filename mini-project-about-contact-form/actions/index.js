"use server";

import dbConnect from "@/lib/db";
import ContactForm from "@/components/contact-form";
import { Contact } from "../models/Contact";

export async function createContact(formData) {
  try {
    console.log("Hit in Server side ONLY...");

    await dbConnect();

    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      return { succes: false, error: "All fields are required" };
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return {
      success: true,
      message: "Created successfully",
      contactId: contact._id.toString(),
    };
  } catch (error) {
    console.error("Error creating contact:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again",
    };
  }
}
