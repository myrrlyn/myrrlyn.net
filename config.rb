###
# Page options, layouts, aliases and proxies
###

set :layout, :main

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

ignore 'typescripts/*'

set :markdown_engine, :kramdown
set :markdown, {
	input: :GFM,
	hard_wrap: false,
}

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Extensions

activate :pry

activate :blog do |blog|
	blog.name = "blog"
	blog.prefix = "blog"
	blog.layout = "blog"
	blog.default_extension = ".md"
	blog.sources = "{year}-{month}-{day}-{title}.html"
	blog.permalink = "{category}/{title}.html"
	blog.custom_collections = {
		category: {
			link: "{category}.html",
			template: "blog_category.html",
		}
	}
end

activate :blog do |blog|
	blog.name = "oeuvre"
	blog.prefix = "oeuvre"
	blog.layout = "oeuvre"
	blog.default_extension = ".md"
	blog.sources = "{title}.html"
	blog.permalink = "{title}.html"
end

activate :syntax, line_numbers: true

activate :rsync do |rsync|
	rsync.production_server = "myrrlyn.net"
	rsync.staging_server = "myrrlyn.net"
	rsync.path = "/srv/http/myrrlyn/myrrlyn.net/build"
	rsync.user = "myrrlyn"
	rsync.rsync_flags = "-a -i -m -z --delete-delay --progress --inplace -e 'ssh -p 42405'"
end

# Reload the browser automatically whenever files change
configure :development do
	activate :livereload
	config[:indev] ||= true
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
# 	def some_helper
# 		"Helping"
# 	end
# end

require 'lib/helpers.rb'
helpers Helpers

require 'lib/extensions.rb'

# Build-specific configuration
configure :build do
	config[:build] ||= true

	activate :favicon_maker, :icons => {
		"_favicon.png" => [
			# Same as apple-touch-icon-57x57.png, for iPhone 6 Plus with @3× display
			{ icon: "apple-touch-icon-180x180-precomposed.png" },
			# Same as apple-touch-icon-57x57.png, for retina iPad with iOS7.
			{ icon: "apple-touch-icon-152x152-precomposed.png" },
			# Same as apple-touch-icon-57x57.png, for retina iPad with iOS6 or prior.
			{ icon: "apple-touch-icon-144x144-precomposed.png" },
			# Same as apple-touch-icon-57x57.png, for retina iPhone with iOS7.
			{ icon: "apple-touch-icon-120x120-precomposed.png" },
			# Same as apple-touch-icon-57x57.png, for retina iPhone with iOS6 or
			# prior.
			{ icon: "apple-touch-icon-114x114-precomposed.png" },
			# Same as apple-touch-icon-57x57.png, for non-retina iPad with iOS7.
			{ icon: "apple-touch-icon-76x76-precomposed.png" },
			# Same as apple-touch-icon-57x57.png, for non-retina iPad with iOS6 or
			# prior.
			{ icon: "apple-touch-icon-72x72-precomposed.png" },
			# Same as apple-touch-icon-57x57.png, for non-retina iPhone with iOS7.
			{ icon: "apple-touch-icon-60x60-precomposed.png" },
			# iPhone and iPad users can turn web pages into icons on their home
			# screen. Such link appears as a regular iOS native application. When this
			# happens, the device looks for a specific picture. The 57x57 resolution
			# is convenient for non-retina iPhone with iOS6 or prior. Learn more in
			# Apple docs.
			{ icon: "apple-touch-icon-57x57-precomposed.png" },
			# Same as apple-touch-icon.png, expect that is already have rounded
			# corners (but neither drop shadow nor gloss effect).
			{ icon: "apple-touch-icon-precomposed.png", size: "57x57" },
			# Same as apple-touch-icon-57x57.png, for "default" requests, as some
			# devices may look for this specific file. This picture may save some 404
			# errors in your HTTP logs. See Apple docs
			{ icon: "apple-touch-icon.png", size: "57x57" },
			# For Android Chrome M31+.
			{ icon: "favicon-196x196.png" },
			# For Opera Speed Dial (up to Opera 12; this icon is deprecated starting
			# from Opera 15), although the optimal icon is not square but rather
			# 256x160. If Opera is a major platform for you, you should create this
			# icon yourself.
			{ icon: "favicon-160x160.png" },
			# For Google TV.
			{ icon: "favicon-96x96.png" },
			# For Safari on Mac OS.
			{ icon: "favicon-32x32.png" },
			# The classic favicon, displayed in the tabs.
			{ icon: "favicon-16x16.png" },
			# The classic favicon, displayed in the tabs.
			{ icon: "favicon.png", size: "16x16" },
			# Used by IE, and also by some other browsers if we are not careful.
			{ icon: "favicon.ico", size: "64x64,32x32,24x24,16x16" },
			# For Windows 8 / IE11.
			{ icon: "mstile-70x70.png", size: "70x70" },
			{ icon: "mstile-144x144.png", size: "144x144" },
			{ icon: "mstile-150x150.png", size: "150x150" },
			{ icon: "mstile-310x310.png", size: "310x310" },
			{ icon: "mstile-310x150.png", size: "310x150" },
		],
	}

	# Minify CSS on build
	activate :minify_css

	# Minify Javascript on build
	# For some reason, this panics.
	# activate :minify_javascript

	# Minify HTML on build
	activate :minify_html

	# GZip built files
	activate :gzip

	# Sign files
	activate :sign
end
