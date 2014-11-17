var path         = require('path'),
through      = require('through');

var DEFAULT_EXTENSIONS = [
  '.html',
];


/**
 * Takes a set of user-supplied options, and determines which set of file-
 * extensions to run Stringify on.
 * @param   {object | array}    options
 * @param   {object}            options.extensions
 * @returns {string[]}
 */
function getExtensions (options) {
  /**
   * The file extensions which are stringified by default.
   * @type    {string[]}
   */
  var extensions = DEFAULT_EXTENSIONS;

  if (options) {
    if (Object.prototype.toString.call(options) === '[object Array]') {
      extensions = options;
    } else if (options.extensions) {
      extensions = options.extensions;
    }
  }

  // Lowercase all file extensions for case-insensitive matching.
  extensions = extensions.map(function (ext) {
    return ext.toLowerCase();
  });

  return extensions;
}

/**
 * Returns whether the filename ends in a Stringifiable extension. Case
 * insensitive.
 * @param   {string} filename
 * @return  {boolean}
 */
function hasStringifiableExtension (filename, extensions) {
  var file_extension = path.extname(filename).toLowerCase();

  return extensions.indexOf(file_extension) > -1;
}

/**
 * Returns minified contents if requested
 * @param   {string} filename
 * @param   {string} contents
 * @param   {object} options
 * @return  {string}
 */
function textify(filename, contents, options) {
  if(contents.match("text!")){
    contents = contents.replace("text!pviz_templates/", "../../templates/");
  }
  return contents;
}

/**
 * Creates the Browserify transform function which Browserify will pass the
 * file to.
 * @param   {object | array}    options
 * @param   {object}            options.extensions
 * @returns {stream}
 */
module.exports = function (options) {
  var extensions = getExtensions(options);

  /**
   * The function Browserify will use to transform the input.
   * @param   {string} file
   * @returns {stream}
   */
  function browserifyTransform (file) {
    /*
    if (!hasStringifiableExtension(file, extensions)) {
      return through();
    }
    */

    var chunks = [];


    var write = function (buffer) {
      chunks.push(buffer);
    };

    var end = function () {
      var contents = Buffer.concat(chunks).toString('utf8');

      this.queue(textify(file, contents, options));
      this.queue(null);
    };

    return through(write, end);
  }

  return browserifyTransform;
};
