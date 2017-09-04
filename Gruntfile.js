module.exports = grunt => {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		watch: {
			css: {
				files: ['src/css/*.scss'],
				tasks: ['newer:postcss'],
				options: {
					spawn: false,
					livereload: 8082,
				}
			},
			js: {
				files: ['src/js/*.js'],
				tasks: ['babel'],
				options: {
					spawn: false,
					livereload: 8082,
				}
			},
			pug: {
				files: ['views/*.pug'],
				tasks: [],
				options: {
					spawn: false,
					livereload: 8082,
				}
			}
		},
		postcss: {
			options: {
				map: {
					inline: false,
					dist: 'public/css/map/'
				},
				parser: require('postcss-scss'),
				processors: [
					require('precss')(),
					require('postcss-cssnext')({
						warnForDuplicates: false
					}),
					require('cssnano')(),
					require('lost')(),
					require('postcss-strip-inline-comments')()
				],
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/css/',
					src: ['*.scss'],
					dest: 'public/css',
					ext: '.css',
				}],
			}
		},
		babel: {
			options: {
				sourceMap: true,
				presets: ['env'],
				comments: false,
				sourceMaps: true,
				minified: true,
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/js',
					src: '*.js',
					dest: 'public/js',
					ext: '.js',
				}]
			}
		},
	});
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['babel', 'postcss']);
};
