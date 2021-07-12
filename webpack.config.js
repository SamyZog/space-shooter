const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = (env, argv) => {
	// check for mode
	const isDev = argv.mode === "development";

	return {
		devtool: isDev ? "inline-source-map" : false,
		entry: {
			// increase values according to number of pages if app is MPA, if SPA keep one entry point
			// each key is a name of a chunk
			app: "./src/index.js",
		},
		output: {
			// [name] = entry point name
			filename: isDev ? "[name].[contenthash].js" : "[name].[contenthash].bundle.js",
			path: path.resolve(__dirname, "build"),
			publicPath: "",
			// output file name for asset
			assetModuleFilename: "assets/[contenthash][ext][query]",
			// set the length of hashes in file names
			hashDigestLength: 8,
			// deletes all files in dist folder before generating new ones
			// clean: true,
			// !!! seems like it has issues, pictures are lost on reloads in dev mode, I switched to using CleanWebpackPlugin instead !!!
		},

		optimization: {
			runtimeChunk: "single",
			// better minimizer, eliminates duplicate code
			minimizer: [`...`, new CssMinimizerPlugin()],
			splitChunks: {
				chunks: "all",
			},
		},

		devServer: {
			contentBase: path.join(__dirname, "dist"),
			writeToDisk: true,
			open: {
				// key is same as entry point name
				app: ["chrome", "--incognito"],
			},
		},

		module: {
			rules: [
				{ test: /\.html$/, loader: "html-loader" },
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: [["@babel/preset-env", { bugfixes: true, targets: "defaults" }]],
						},
					},
				},
				{
					test: /\.s?css$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"postcss-loader",
						"resolve-url-loader",
						{
							loader: "sass-loader",
							options: {
								sourceMap: true,
							},
						},
					],
					sideEffects: true,
				},
				{
					test: /\.(png|jpeg|jpg|webp|avif|gif|svg)$/,
					type: "asset/resource",
					// emit files to this destination
					generator: { filename: "assets/images/[contenthash][ext][query]" },
				},
				{
					test: /\.(ogg|wav)$/,
					type: "asset/resource",
					generator: { filename: "assets/audio/[contenthash][ext][query]" },
				},
			],
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: "src/index.html",
				filename: "index.html",
			}),
			new MiniCssExtractPlugin({
				filename: isDev ? "[name].css" : "[contenthash].min.css",
			}),
			new CleanWebpackPlugin(),
			new WorkboxPlugin.GenerateSW({
				// these options encourage the ServiceWorkers to get in there fast
				// and not allow any straggling "old" SWs to hang around
				clientsClaim: true,
				skipWaiting: true,
			}),
		],
	};
};
