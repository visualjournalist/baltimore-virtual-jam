# Spreadsheet data download app #

Using a Google Spreadsheet to bake out data. 

This app is designed to grab the Google spreadsheet data and save it locally as a series of JSON files.

In this instance the data is stored in `_data/` for reference by Jekyll and `data/` for reference by JavaScript.



### How it works ###
A Google spreadsheet provides the editable data. [The spreadsheet](https://docs.google.com/spreadsheets/d/123DWrahipU6XOVjnVdTd0kdOBFBlzXuxButFymJ-OmA/pubhtml) has sheet for the profiles. We can share the document with editors who can provide translations and corrections. 


### Running the app ###

To run the application, download the JSON and serve the files:

* Switch to the `/download-spreadsheet-data-app/` directory
* run `$ node app.js`
