// Papa Parse for parsing CSV Files
var Papa = require('papaparse');
// HTTP and FS to enable Papa parse to download remote CSVs via node streams.
var https = require('https');
var fs = require('fs');



/*

After several recent changes to Google sheets API, 
my new approach involves using Papa Parse to download the CSV and aggregate it into a single JSON object

https://github.com/mholt/PapaParse/issues/440

The current drawback is that you have to record the unique GID for each sheet.


The resulting JSON looks like this:

{
	"sheet 1 (e.g. 'english') ": [
		{
			row 1 data
		},
		{
			row 2 data
		}...
	],
	"pashto": [
		{
			row 1 data
		},
		{
			row 2 data
		}...
	]
}

// HOW TO RUN IT

From the `/download-data/` directory, run `npm install` (or `npm update`).

Then run `node app.js`

This will bake out the data defined in Google spreadsheet specified in `spreadsheets[i].url`.

The resulting JSON will be saved in  `/[location]/[name].json`



CONFIG
// https://docs.google.com/spreadsheets/d/1hTb6sk-n4AvJVocv8pCv37tElovbBFwdyWvFh8wgTMk/edit#gid=0
// https://docs.google.com/spreadsheets/d/e/2PACX-1vRETXc4dPDh4nhXmwWT0FHRmHn8Z2v9QHZJcX_5lQTdJ9PdSAW2X7bt6nflGjCc37oR1V3BuDjTsy2S/pubhtml

// Baltimore jam database
// https://docs.google.com/spreadsheets/d/1fbb395KjgD4wRi04s4FvX3GYegHz3gZ8e-nBXw1agQ8/edit#gid=1310162511
// https://docs.google.com/spreadsheets/d/e/2PACX-1vRfo2CENUaYK248KEbMmZodbVvGW7bw9uZSD0FhJKrJWI9n9dVIqldmwSoq8o9hsUpsLfMB3JdkzFb_/pubhtml

*/

var spreadsheets = [
	{"name": "config", "id": "2PACX-1vRETXc4dPDh4nhXmwWT0FHRmHn8Z2v9QHZJcX_5lQTdJ9PdSAW2X7bt6nflGjCc37oR1V3BuDjTsy2S", "location": "../_data/",
		'languages': [
			{
				'language': 'english',
				'gid': 0
			}
		]
	},
	{"name": "baltimore", "id": "2PACX-1vRfo2CENUaYK248KEbMmZodbVvGW7bw9uZSD0FhJKrJWI9n9dVIqldmwSoq8o9hsUpsLfMB3JdkzFb_", "location": "../_data/",
		'languages': [
			{
				'language': 'english',
				'gid': 1310162511
			}
		]
	}
	
];
//https://docs.google.com/spreadsheets/d/e/2PACX-1vS4D-vd-1EWIukwcK2KW8ivaTfPRwMJYBLifUzMwuEqH0fcAv09MS4ArLoCmSUIUuYh-8Y4k1qUgZoM/pubhtml

const papa = require("papaparse");
const request = require("request");

const options = {header: true, encoding: "UTF-8", dynamicTyping: true};


let configData = {};


const storeData = (data, path) => {
	try {
		//console.log("Saving: " + path);
		fs.writeFileSync(path, JSON.stringify(data));
	} catch (err) {
		console.error(err)
	}
}


var currentSheetNumber = 0;
var currentLanguageNumber = 0;
function downloadLanguage(){
	if (currentSheetNumber < spreadsheets.length){

		var numberOfLanguages = spreadsheets[currentSheetNumber].languages.length;

		if (currentLanguageNumber < numberOfLanguages){

			var spreadsheetID = spreadsheets[currentSheetNumber].id;
			var languageGID = spreadsheets[currentSheetNumber].languages[currentLanguageNumber].gid;
			var language = spreadsheets[currentSheetNumber].languages[currentLanguageNumber].language;

			var feedURL = 'https://docs.google.com/spreadsheets/d/e/' + spreadsheetID + '/pub?gid=' + languageGID + '&single=true&output=csv';
			var data = [];

			const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);

			const dataStream = request
				.get(feedURL)
				.pipe(parseStream);

			parseStream.on("data", chunk => {
			    data.push(chunk);
			});

			dataStream.on("finish", () => {
				//console.log(data);
				//console.log(data.length);

				configData[language] = data;// data[0]; 
				// console.log("\n\nCONFIG DATA OBJECT");
				// console.log(configData);
				currentLanguageNumber++;

				downloadLanguage();
			});
		} else {

			var spreadsheetName = spreadsheets[currentSheetNumber].name;
			var location = spreadsheets[currentSheetNumber].location;

			//console.log(configData);

			console.log("\n\nSaving the " + spreadsheetName + " data")
			console.log("(Saving the )" + location + spreadsheetName + ".json\n\n")
			storeData(configData, location + spreadsheetName + ".json");

			currentSheetNumber++;
			currentLanguageNumber = 0;
			downloadLanguage();
		}
	} else {
		console.log("\n\nDONE\n\n");
	}

}


downloadLanguage();