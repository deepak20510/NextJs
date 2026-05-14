import axios from "axios";
export default async function BlogPage({ params }: any) {
  const { postId } = await params;
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );
  const data = response.data;
  return (
    <div>
      Blog Page {postId}
      <br />
      title- {data.title}
      body- {data.body}
    </div>
  );
}
