import { API } from "../web.config";

export const get_images = async () => {
  const response = await fetch(`${API}`);
  if (!response) throw new Error("Data not found");
  else return await response.json();
};
