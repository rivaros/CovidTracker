var fs = require('fs'), // needed to read JSON file from disk
  Collection = require('postman-collection').Collection;

var codegen = require('postman-code-generators'),
  sdk = require('postman-collection'),
  request = new sdk.Request('https://www.google.com'),
  language = 'javascript',
  variant = 'fetch',
  options = {
    trimRequestBody: true,
    followRedirect: true,
  };

// Load a collection to memory from a JSON file on disk (say, sample-collection.json)
const myCollection = new Collection(
  JSON.parse(fs.readFileSync('postman_collection.json').toString()),
);

myCollection.items.map(item => {
  codegen.convert(
    language,
    variant,
    item.request,
    options,
    function (error, snippet) {
      if (error) {
        //  handle error
        console.log('Error ', error);
      }

      console.log(snippet);
      console.log('------');
    },
  );
});
