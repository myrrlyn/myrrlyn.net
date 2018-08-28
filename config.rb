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
			link: "category/{category}.html",
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

# Build-specific configuration
configure :build do
	config[:build] ||= true
	# Minify CSS on build
	activate :minify_css

	# Minify Javascript on build
	# For some reason, this panics.
	# activate :minify_javascript

	# Minify HTML on build
	# activate :minify_html

	# GZip built files
	activate :gzip
end
