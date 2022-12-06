export type Sources = {
  [key: string]: {
    pathOrUrl: string;
    name: string;
    // TODO: find out, how to type this value: to the key of the indexer
    value: string;
  };
};

// TODO write a type utility for this function to be able to use it in a type definition

// Experiment 1
// export type KeyLiteral<TObj, TKey extends keyof TObj> = keyof TObj[TKey];

// Create a function that takes a key and returns the type of the property with that key
//  IDEA FROM ChatGPT
// function getType<T, K extends keyof T>(obj: T, key: K): T[K] {
//   // Use the `typeof` operator to access the property with the given key
//   return obj[key];
// }

export const sources: Sources = {
  bennyPath: {
    pathOrUrl: "/Users/bjesuiter/02 The Saddest Noise.m4a",
    name: "Benny",
    // valid value for discord bot choice - has to be the same as the key in this object!
    value: "bennyPath",
  },

  anfang: {
    pathOrUrl:
      "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/JB Core/Bruno Gröning Freundeskreis/Liebet das Leben/02 Ich Will Mein Leben.m4a",
    name: "Anfangsmusik",
    value: "anfang",
  },

  ende: {
    pathOrUrl:
      "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/JB Core/Bruno Gröning Freundeskreis/Werke Alter Meister/12 3. Satz _Allegro.m4a",
    name: "Endmusik",
    value: "ende",
  },

  bastiPath: {
    pathOrUrl: "/home/ebiko/Music/Games und Filme (music)/ff8/02 - ride on.mp3",
    name: "Basti",
    value: "bastiPath",
  },

  urlDemo: {
    pathOrUrl:
      "https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5ef06db148ba07a7/5fd95c9a752123476ba05287/TFT_Club2021_Mus_Full_MasterQC_201012.mp3",
    name: "URL Demo",
    value: "urlDemo",
  },

  // relative path calculated from the workdir of the node executable from `npm start` (which should equal to the root of this git repo)
  botLocalDemo: {
    pathOrUrl: "./resources/demo_flocks_a_mile_wide.mp3",
    name: "Bot Local Demo",
    value: "botLocalDemo",
  },
};
