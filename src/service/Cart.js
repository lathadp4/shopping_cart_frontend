import axiosInstance from "../axiosInstance";

export const getCartData = async () => {
    var user_id = localStorage.getItem('user_id')
    try {
        const response = await axiosInstance().get("/getCartItems?user_id=" + user_id, {
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

export const addCartData = async (payload) => {
    var obj = {
        product_title: payload?.title,
        product_price: payload?.price,
        product_description: payload?.description,
        user_id: localStorage.getItem("user_id"),
        product_image: payload?.image
    }

    try {
        const response = await axiosInstance().post("/addProductToCart", obj, {
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

export const removeCartData = async (payload) => {

    try {
        const response = await axiosInstance().delete("/removeProductFromTheCart/" + payload, {
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

export const removeAllCartData = async (payload) => {

    try {
        const response = await axiosInstance().delete("/removeProductFromTheCart", {
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

export const updateCartData = async (payload) => {

    try {
        const response = await axiosInstance().put("/updateProductQuantity/" + payload.id, payload, {
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
