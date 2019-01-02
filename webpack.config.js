module.exports = {
  // This is the entry point or start of our react applicaton
  entry: "./app/app.js",

  // The plain compiled Javascript will be output into this file
  output: {
    filename: "public/bundle.js"
  },

  //this is a workaround for a bug:
  //"ERROR in ./~/isexe/mode.js
  //Module not found: Error: Cannot resolve module 'fs' in /Users/inki/react-shift-scheduler/node_modules/isexe"
  // solution was found here https://github.com/webpack-contrib/css-loader/issues/447
  // apparently it's an issue with webpack
  node: {
    fs: 'empty'
  },

  // This section desribes the transformations we will perform
  module: {
    loaders: [
      {
        // Only working with files that in in a .js or .jsx extension
        test: /\.jsx?$/,
        // Webpack will only process files in our app folder. This avoids processing
        // node modules and server files unnecessarily
        exclude: /node_modules/, 
        include: /app/,
        loader: "babel-loader",
        query: {
          // These are the specific transformations we'll be using.
          presets: ["react"]
        }
      }
    ]
  },
  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js
  devtool: "eval-source-map"
};

