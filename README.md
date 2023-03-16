# KwameAiInternChallenge
Methodology:

## Initial Thoughts:
- Rust language was the preferred choice due to familiarity and usefulness for this kind of project.
- JavaScript was used as an alternative since Rust was not allowed.


## Code Organization:
All important codes for running the main script(index.js) are stored in the src folder.
The src folder contains the following files:

- index.js: The main executable file 
- iofxns.js: Relevant functions for reading and writing to files, including reading PDF files to file and writing JSON strings to file.
- metadata.js: The MetaData class, a template for generating the metadata.json file.
- metadatafuncs.js: Relevant functions for searching and updating fields of the metadata object from the PDF text.
- perform.js: Simulates the extracting process for each single file.

The test folder is for testing various features of the program.

The input folder may contain the files to be executed.

The output folder contains all newly created files.

The procedure folder may be ignored and only contains information that is no longer relevant
 

## Instructions for Use:
- Navigate the terminal to src folder.
- Open the index.js file and update the lawfileUrls variable with the relevant file urls.
- Alternatively, move the test files to the input directory and update the lawfileUrls variable.
- Run the command `node index.js`

### Footnote
Consider checking out my open source project [blockify](https://github.com/nisaacdz/blockify) and [num_rust](https://github.com/nisaacdz/num_rust)
