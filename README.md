# KwameAiInternChallenge
Methodology:

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
- Move the test files to the input directory and update the lawfileUrls variable.
- Run the command `node index.js`

### Note
Cloning this repository and running it on `Windows Subsystem for Linux` produces the following error: 
```
node:internal/modules/cjs/loader:1361
  return process.dlopen(module, path.toNamespacedPath(filename));
                 ^

Error: /workspaces/KwameAiInternChallenge/node_modules/canvas/build/Release/canvas.node: invalid ELF header
    at Module._extensions..node (node:internal/modules/cjs/loader:1361:18)
    at Module.load (node:internal/modules/cjs/loader:1133:32)
    at Module._load (node:internal/modules/cjs/loader:972:12)
    at Module.require (node:internal/modules/cjs/loader:1157:19)
    at require (node:internal/modules/helpers:119:18)
    at Object.<anonymous> (/workspaces/KwameAiInternChallenge/node_modules/canvas/lib/bindings.js:3:18)
    at Module._compile (node:internal/modules/cjs/loader:1275:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1329:10)
    at Module.load (node:internal/modules/cjs/loader:1133:32)
    at Module._load (node:internal/modules/cjs/loader:972:12) {
  code: 'ERR_DLOPEN_FAILED'
}

```
I have tested and confirmed its functionality in windows OS
