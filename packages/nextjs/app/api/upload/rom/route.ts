import axios from "axios";

const ACCESS_KEY = process.env.BUNNYCDN_API_KEY as string;
const cdnurl = process.env.BUNNYCDN_HOSTNAME as string;

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");
    const name = formData.get("name");
  if (!file) {
    return Response.json({ error: "No files received." }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return Response.json(
      { error: "Uploaded file is not valid." },
      { status: 400 }
    );
  }
  const buffer = Buffer.from(await file.arrayBuffer());

  const filename = name + ".gba"
  const url = `https://storage.bunnycdn.com/shaboy/roms/${filename}`;
  try {
    const req = await axios.put(url, buffer, {
      headers: {
        AccessKey: ACCESS_KEY,
        "Content-Type": "application/octet-stream",
      },
    });

    console.log(req.data);

    return Response.json({
      status: 200,
      message: "Upload successful",
      url: `https://${cdnurl}/roms/${filename}`,
    });
  } catch (e: any) {
    console.log(e);
    return Response.json({ status: 500, message: e.message });
  }
}
