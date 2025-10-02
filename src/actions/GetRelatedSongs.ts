"use server";

import axios from "axios";

export async function getRelatedSongs({ regionCode }: { regionCode: string }) {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q:"Latest dance tracks official video -kids -nursery -rhymes -children",
          order:"viewCount",
          region:regionCode,
          topicId:"/m/04rlf",
          type:"video",
          videoDefinition:"high",
          videoDuration:"short",
          maxResults:20,
          key: process.env.GOOGLE_API_KEY,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

const responseData = res.data;
    console.log(res.data);

    const filteredData = responseData.items.map((item:any)=>{

        return {
            title:item.snippet.title,
            thumbnail:item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
            videoId:item.id.videoId
        }
    });

    console.log(filteredData)

     return {
      status: "success",
      message: "Related Songs Fetched Successfully",
      relatedSongs:filteredData

    };
  } catch (error: any) {
    console.log(error);
    return {
      status: "error",
      message: error.message || "Something went wrong, Try Again!",
    };
  }
}
