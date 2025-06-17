import authHeader from "../utils/authHeader";

// Function to fetch user details from the protected endpoint
export const fetchUserDetails = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/user", {
      headers: {
        ...authHeader(),
      },
      credentials: 'include', // Add this to handle cookies properly
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
