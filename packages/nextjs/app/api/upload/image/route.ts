import axios from "axios";

const pinFileToIPFS = async (game_image_file:File,game_name:String) => {
    const formData = new FormData();
    formData.append("file", game_image_file);
    const pinataMetadata = JSON.stringify({ name: game_name });
    formData.append("pinataMetadata", pinataMetadata);
    const pinataOptions = JSON.stringify({ cidVersion: 0 });
    formData.append("pinataOptions", pinataOptions);
    
   try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

export async function POST(req: Request) {
    const formdata = await req.formData()
    const game_image_file = formdata.get("game_image_file")
    const game_name = formdata.get("game_name")
      if(!(game_image_file instanceof File) || !(game_name instanceof String)){
        return Response.json({error:"Invalid input"})
    }
    const res = await pinFileToIPFS(game_image_file,game_name)
    return Response.json(res)
}