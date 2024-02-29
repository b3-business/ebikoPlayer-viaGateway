/**
 * This Source Type does directly satisfy the shape needed for discord bot "choice options".
 * - name: will be the name of the choice, shown to users
 * - value: will be the value which is returned when the user selects this option
 *
 * - pathOrUrl: my own property to know from where to load the music file!
 */
export type Source = {
  pathOrUrl: string;
  name: string;
  // This value will be used as an index for the sourcesMap,
  // so that the discord option value is exactly the same as the key in the sourcesMap
  value: string;
};

/**
 * Add new Sources to this array!
 * the sources Map, which is used in the code, will be updated automatically!
 */
const sourcesArray = [
  {
    name: "Benny",
    value: "bennyPath",
    pathOrUrl: "/Users/bjesuiter/02 The Saddest Noise.m4a",
  },
  {
    name: "Anfangsmusik",
    value: "anfang",
    pathOrUrl:
      "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis_MP3/Drei Dinge führen zum Ewigen/06 Im Glück nicht stolz sein.mp3",
    // "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis/Liebet das Leben/01 Er Kam Zu Euch.m4a",
    // "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis Spezial/C_Tagungsmusik/14 Danklied.mp3",
    // '/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis/Instrumentalkompositionen/02 Fantasie in C * "Brief von der Mutter".m4a',
    // "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno-Gröning Freundeskreis/Die Liebe siegt/08 Zu Dir, Vater, Kommen Wir.m4a",
    // "/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis/Weit/2-05 Bruno Gröning.m4a",
    // "/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis/Drei Dinge führen zum Ewigen/09 Gott segne dich.m4a",
    //"/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/BGF Chorwochenenden/2023 Belgrad/01 Kato ptitsite - Full.m4a",
    // "/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis Spezial/C_Tagungsmusik/28 In Wahrheit ist es Liebe (klarer).m4a",
    // "/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis/Der Wunderapostel/24 Beatus bei den Eltern und die Entscheidung.m4a",
  },
  {
    name: "Endmusik",
    value: "ende",
    pathOrUrl:
      // "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/JB Core/Bruno Gröning Freundeskreis/Eine neue Erde/06 Von Vergangenen Heldentaten.m4a"
      // "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/JB Core/Bruno Gröning Freundeskreis/Liebet das Leben/05 Heil'ger Friede.m4a",
      // "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis/Werke Alter Meister/12 3. Satz _Allegro_.m4a",
      // "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis Spezial/C_Tagungsmusik/15 Frieden auf Erden.mp3",
      "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis_MP3/Liebe ist mein Schwert und Schild/07 Weil alles sich zum Guten wend´t.mp3",
    // "/Users/bjesuiter/@Sync/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno-Gröning Freundeskreis/Die Liebe siegt/05 Von Einer Lieb' Getragen.m4a",
    // "/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis/Werke Alter Meister/12 3. Satz _Allegro_.m4a",
    // "/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis/Drei Dinge führen zum Ewigen/15 Abendsegen.m4a",
    // "/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis/Liebe ist mein Schwert und Schild/04 Heimatgruß.m4a",
    // "/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis Spezial/C_Tagungsmusik/19 Hebe den Blick - Piano _ Gesang.mp3",
    // "/Volumes/MacMini Data/bjesuiter-nextcloud/#Bibliotheken/Music/Bruno Gröning - Freundeskreis/Es saß ein klein Waldvögelein/1-04 Walzer.m4a",
  },
  {
    name: "Basti",
    value: "bastiPath",
    pathOrUrl: "/home/ebiko/Music/Games und Filme (music)/ff8/02 - ride on.mp3",
  },
  {
    pathOrUrl:
      "https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt5ef06db148ba07a7/5fd95c9a752123476ba05287/TFT_Club2021_Mus_Full_MasterQC_201012.mp3",
    name: "URL Demo",
    value: "urlDemo",
  },
  {
    // relative path as seen from the workdir of the node executable from `npm start` (which should equal to the root of this git repo)
    pathOrUrl: "./resources/demo_flocks_a_mile_wide.mp3",
    name: "Bot Local Demo",
    value: "botLocalDemo",
  },
] as const;

// { objectKey : objectValue }
// sourceArray[number] = 1 Element im Array
// sourceArray[number][value] = const string typ des values (z.B. "bennyPath" als literal string type)
// => Like in type RGB = "red" | "green" | "blue";
// K in typeof sourcesArray[number] = Loop über alle Array Elemente
// sourcesArray[number]["value"] = Property access auf "value"
// typeof sourcesArray[number]["value"] = get the value of this "value" property as literal string type
//
// => K is forced to be a specifc value
// => objectValue is forced to be the object matching the K
type Sources = {
  [K in typeof sourcesArray[number]["value"]]: typeof sourcesArray[number];
};

export const sources = sourcesArray.reduce((obj, source) => {
  obj[source.value] = source;
  return obj;
}, {}) as Sources;
