const path = require('path')
const gulp = require('gulp')
const imageDataUri = require('gulp-image-data-uri')
const concat = require('gulp-concat')
const assetManifest = require('gulp-asset-manifest')
const jsonEditor = require('gulp-json-editor')
// const debug = require('gulp-debug')

const src = './source'
const iconsDir = path.resolve(src, 'images/icons')
const icons = iconsDir + '/*.svg'
const scssDest = path.resolve(src, 'scss/foundation')
const manifestDestDir = path.resolve(src, '_patterns/00-Foundation')
const manifestDestFile = path.resolve(manifestDestDir, '03-icons.json')
const iconCategories = [
	{ category: 'account' },
	{ category: 'general' },
	{ category: 'nav', background: 'primary-1', text: 'primary-3' },
	{ category: 'payment' },
	{ category: 'support' }
]

const cssTemplate = path.resolve(iconsDir, '_template.css')

function generateIcons() {
	return gulp.src(icons)
		.pipe(assetManifest({
			bundleName: 'icons',
			manifestFile: manifestDestFile
		}))
		.pipe(imageDataUri({
			template: {
				file: cssTemplate
			}
		}))
		.pipe(concat('_icons.scss'))
		.pipe(gulp.dest(scssDest))
}

function rewriteManifestWithoutExtensions() {
	return gulp.src(manifestDestFile)
		.pipe(jsonEditor(function(json) {
			const newIcons = [ 
				...iconCategories.map(
					cat => ({
						...cat,
						icons: json.icons
							.filter(icon => icon.indexOf(cat.category) === 0)
							.map(icon => icon.replace('.svg', ''))
					})
				),
				{
					category: 'etc',
					icons: json.icons
					.filter(icon => iconCategories.every(cat => icon.indexOf(cat.category) !== 0))
					.map(icon => icon.replace('.svg', ''))
				}
			]

			return { icons: newIcons }
		}))
		.pipe(gulp.dest(manifestDestDir, { overwrite: true }))
}

gulp.task('icons', gulp.series(generateIcons, rewriteManifestWithoutExtensions))
