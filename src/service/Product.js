import axiosInstance from "../axiosInstance";

export const productData = async () => {

    try {
        const response = await axiosInstance().get("/getProducts", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });

        return response?.data; // Return the data from the response
    } catch (error) {
        // Log error for debugging
        console.error("ERROR SERVICE", JSON.stringify(error));
        // Optionally, re-throw the error if you want to handle it further up the chain
        throw error;
    }
};
