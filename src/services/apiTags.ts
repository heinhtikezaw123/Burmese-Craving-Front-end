import { endpoints } from "./endpoints";

const extractEndpointKeyword = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 2] : parts[0];
};

const endpointValues = Object.values(endpoints) as string[];
export const tagTypes = endpointValues.map(extractEndpointKeyword);

export type Tag = (typeof tagTypes)[number];

export const determineTag = (url: string): Tag => {
  const endpointKeyword = extractEndpointKeyword(url.split("?")[0]);
  if (tagTypes.includes(endpointKeyword)) {
    return endpointKeyword as Tag;
  }
  return "defaultTag"; // or handle it differently
};
