"use server";

import dbConnect from "@/lib/db";
import ContactForm from "@/components/contact-form";
import { Contact } from "../models/Contact";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

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

export async function getContacts() {
  try {
    await dbConnect();

    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();


    return contacts.map((contact) => ({
      ...contact,
      _id: contact._id.toString(),
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching contact: ", error);
    return [];
  }
}

export async function updateContact(contactId, status) {
  try {
    console.log(status);
    await dbConnect();
    await Contact.findByIdAndUpdate(contactId, { status });

    // revalidatePath("/contacts");
    revalidateTag("stats")
    return { success: true };
  } catch (error) {
    console.error("Error updating contact status: ", error);
    return { success: false, error: "Faild to Updated status" };
  }
}

export async function contactStats() {
  const getCacheStats = unstable_cache(
    async () => {
      await dbConnect();
      const total = await Contact.countDocuments();
      const newCount = await Contact.countDocuments({ status: "new" });
      console.log('newCount: ', newCount)
      const readCount = await Contact.countDocuments({ status: "read" });
      const repliedCount = await Contact.countDocuments({ status: "replied" });

      return { total, newCount, readCount, repliedCount };
    },
    ["contact-stats"],
    {
      tags: ["stats"],
      // revalidate: 60,
    }
  );

 return getCacheStats();
}
