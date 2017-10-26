// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');
const Path = require('path')
// Instantiates a client
const translate = Translate();

// The text to translate, e.g. "Hello, world!"
 const text = 'Hello, world!';

// The target language, e.g. "ru"
 const target = 'ar';

// The model to use, e.g. "nmt"
 const model = 'nmt';

const options = {
  // The target language, e.g. "ru"
  to: target,
  // Make sure your project is whitelisted.
  // Possible values are "base" and "nmt"
  model: model
};

var ruta = Path.resolve("getting-started.json")
var j = require(ruta)
if (typeof j.challenges == 'undefined') {
  console.log("Debería ser un archivo json del directorio seed/challenges")
  process.exit(1)
}
var ch = j.challenges;
var tites = [];
var descriptions = [];
var i;
console.log("ch.length ---> "+ch.length);
for(i = 0; i < 5; i++) {
  if (typeof ch[i].translations.ar == 'undefined' || ch[i].translations.ar == '') {
    tites.push(ch[i].title);
    descriptions.push(ch[i].description);
  }
}



// Translates the text into the target language. "text" can be a string for
// translating a single piece of text, or an array of strings for translating
// multiple texts.
 var input = [
   'Hello',
   'How are you today?'
 ];
translate.translate(tites, options)
  .then((results) => {
    let translations = results[0];
    translations = Array.isArray(translations) ? translations : [translations];

    console.log('Translations:');
    translations.forEach((translation, i) => {
      console.log(`${text[i]} => (${target}) ${translation}`);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

  translate.translate(descriptions, options)
    .then((results) => {
      let translations = results[0];
      translations = Array.isArray(translations) ? translations : [translations];

      console.log('Translations:');
      translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
