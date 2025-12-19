import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/db";
import Note from "../../../../../models/Note";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await request.json();

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return NextResponse.json(
        {
          success: false,
          error: "Note not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedNote },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Faild to Add",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const deletedItem = await Note.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json(
        {
          success: false,
          error: "Note not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: deletedItem },
      { status: 200 }
    ); //OPTIONAL: send status code
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Faild to delete",
      },
      { status: 400 }
    );
  }
}
