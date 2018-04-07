const path = require('path');

const config = {
    entry: './src/solver.js',
    output: {
        filename: 'solver.min.js',
        library: 'SolverJS'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
  };
  
  module.exports = config;