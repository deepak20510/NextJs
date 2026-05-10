// Function to fetch user data from an API endpoint
async function getUserData() {
  // Sending a GET request to the API to fetch user details
  const response = await fetch("http://localhost:3000/api/v1/user/details");

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  // Returning the API response data
  return data;
}

// The main functional component that renders the page
export default async function Home() {
  // Fetching the user data by calling the `getUserData` function
  const userData = await getUserData();

  // JSX to render the user data in a styled container
  return (
    <div className="flex flex-col justify-center h-screen">
      {" "}
      {/* Centering the content vertically */}
      <div className="flex justify-center">
        {" "}
        {/* Centering the content horizontally */}
        <div className="border p-8 rounded">
          {" "}
          {/* Adding border, padding, and rounded corners */}
          {/* Displaying user name, or a fallback message if data is unavailable */}
          <div>Name: {userData?.name || "No name available"}</div>
          {/* Displaying user email, or a fallback message if data is unavailable */}
          <div>Email: {userData?.email || "No email available"}</div>
        </div>
      </div>
    </div>
  );
}
