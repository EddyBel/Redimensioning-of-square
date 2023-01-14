import { API } from "../web.config";

/**
 * Function that makes a request to the selected api.
 * @async
 * @returns {Promise<Object>} - Returns an object with the response of the image request.
 * @throws {Error} - If a response cannot be obtained from the server.
 */
export const get_images = async () => {
  try {
    const response = await fetch(`${API}`);
    if (!response) throw new Error("Data not found");
    else return await response.json();
  } catch (err) {
    throw new Error(err);
  }
};
