const fs = require("fs");
const xml2js = require("xml2js");

// Define the schema template
const schemaTemplate = {
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  privatePhone: null,
  reservationsPhone: null,
  governmentalSector: null,
  privateSector: null,
  gender: null,
  curriculumVitaeUrl: null,
  twitterUrl: null,
  instagramUrl: null,
  linkedinUrl: null,
  snapchatUrl: null,
  tiktokUrl: null,
  location: { area: null, city: null },
  profilePicture: null, // Include profilePicture field
  locationUrl: [],
  category: null,
  title: null,
  specialty: null,
  firstNameArabic: null,
  lastNameArabic: null,
  governmentalSectorArabic: null,
  privateSectorArabic: null,
  locationArabic: { areaArabic: null, cityArabic: null },
  categoryArabic: null,
  titleArabic: null,
  specialtyArabic: null,
  description: null,
  descriptionArabic: null,
  isApproved: false,
  otpReset: null,
  otpResetExpiresAt: null,
};

// Parse XML and convert to JSON
function parseXMLToJSON(filePath) {
  const parser = new xml2js.Parser();

  // Read XML file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading XML file:", err);
      return;
    }

    // Parse XML content
    parser.parseString(data, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return;
      }

      const items = result.rss.channel[0].item || [];
      const jsonData = items.map((item) => {
        const entry = { ...schemaTemplate };

        // Extract data from <item> tags
        entry.title = item.title[0];
        entry.description = item["content:encoded"] ? item["content:encoded"][0] : null;
        entry.profilePicture = item.guid ? item.guid[0]._ : null; // Set profilePicture from guid

        // Extract postmeta data
        if (item["wp:postmeta"]) {
          item["wp:postmeta"].forEach((meta) => {
            const key = meta["wp:meta_key"][0];
            const value = meta["wp:meta_value"][0];

            if (key === "golo-place_email") {
              entry.email = value;
            } else if (key === "golo-place_phone") {
              entry.privatePhone = value;
            } else if (key === "golo-place_instagram") {
              entry.instagramUrl = value;
            } else if (key === "golo-place_twitter") {
              entry.twitterUrl = value;
            }
          });
        }

        return entry;
      });

      // Write JSON data to output file
      const outputFilePath = "output.json";
      fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error("Error writing JSON file:", err);
        } else {
          console.log(`JSON data has been saved to ${outputFilePath}`);
        }
      });
    });
  });
}

// Run the parser
parseXMLToJSON("content.xml");
