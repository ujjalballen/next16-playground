import dbConnect from "../../../../lib/db";
import Note from "../../../../models/Note";

export async function GET(request) {
  try {
    await dbConnect();
    const notes = Note.find({}).sort({ createdAt: -1 }).exec();

    return Response.json({ success: true, data: notes }, { status: 201 }); // OPTIONAL: we can add status code
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Faild to fetch notes",
      },
      { status: 500 } /// 400
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const note = await Note.create(body);

    return Response.json({ success: true, data: note }, { status: 201 });
  } catch (error) {
        console.error("API Route Error:", error); 

    return Response.json(
      {
        success: false,
        error: "Faild to Add the Note",
      },
      { status: 500 }/// 400
    );
  }
}
