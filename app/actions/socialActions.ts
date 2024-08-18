"use server"

async function getData(url) {
  console.log("URL>>>>", url)
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export const upvote = async (annotation_id) => {
  const url = `http://127.0.0.1:5000/upvote`;
  return getData(url);
};
