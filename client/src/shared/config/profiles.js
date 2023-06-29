const PROFILES = {
  Soapy: {
    image: process.env.PUBLIC_URL + "/ppp.jpeg",
    displayName: "Soapy",
  },
  Strawberry: {
    image: process.env.PUBLIC_URL + "/ppa.jpeg",
    displayName: "Strawberry",
  },
};

export const getProfile = (id) => PROFILES[id] ?? PROFILES.Soapy;

export default PROFILES;
