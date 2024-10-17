import axiosInstance from "../axiosInstance";

export const loginUserData = async (payload) => {


    const data = {
        user_name: payload?.user_name,
        password: payload?.password,
    };

    try {
        const response = await axiosInstance().post("/login", data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });

        // Assuming the response contains user data or a success message
        if (response?.data?.status === true) {
            localStorage.setItem('token', response?.data?.data?.token);
            localStorage.setItem('user_id', response?.data?.data?.response?.id);
        }
        return response?.data; // Return the data from the response
    } catch (error) {
        // Log error for debugging
        console.error("ERROR SERVICE", JSON.stringify(error));
        // Optionally, re-throw the error if you want to handle it further up the chain
        throw error;
    }
};
