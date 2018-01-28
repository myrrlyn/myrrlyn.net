module Helpers
	def gravatar_for(email = "me@myrrlyn.net", size: 128)
		gid = Digest::MD5::hexdigest(email.downcase)
		"https://gravatar.com/avatar/#{gid}?s=#{size}"
	end

	# Render an email address (hopefully) unparsable for spam crawlers.
	def mask_email(email = "me@myrrlyn.net")
		str = email.downcase.reverse.split('@')
		b = Builder::XmlMarkup.new(indent: 2)
		b.span(
			class: "masked-email",
			title: "Spam scrapers make life worse for all of us; sorry"
		) do |span|
			span.text!(str[0])
			span.a(href: "#nospam") do |a|
				a.text!("don’t spam")
			end
			span.text!("@#{str[1]}")
		end
		b.target!
	end

	# Render the Glider pattern with inlined size and position attributes
	# This trick brought to you by Firefox's suboptimal SVG renderer.
	def glider_svg(**opts)
		gb = Builder::XmlMarkup.new(indent: 2)
		scale = opts[:scale] || 48

		gliders = Tomlrb.load_file("data/glider.toml", symbolize_keys: true)

		gb.svg(
			xmlns: "http://www.w3.org/2000/svg",
			id: "glider",
			width: scale * 3,
			height: scale * 3
		) do |svg|
			svg.rect(class: "outer", width: scale * 3, height: scale * 3)
			svg.rect(class: "inner-x", width: scale * 3, height: scale, y: scale)
			svg.rect(class: "inner-y", width: scale, height: scale * 3, x: scale)
			3.times do |y|
				3.times do |x|
					svg.circle(
						class: "cell x-#{x} y-#{y}",
						cx: scale * (x + 0.5),
						cy: scale * (y + 0.5),
						r: (scale / 3).round(3)
					)
				end
			end
		end

		gb.target!
	end

	def canonicalize(path = "/")
		path = "/#{path}" unless path.start_with?("/")
		if config[:indev]
			unless path == "/" || path.end_with?(".html")
				path + ".html"
			else
				path
			end
		else
			path.gsub(/.html$/, "")
		end
	end

	def fa(kind, link, title = "")
		b = Builder::XmlMarkup.new(indent: 2)
		b.i(class: "fa fa-2x fa-#{kind}", title: title)
		link_to(b.target!, link)
	end

	def h5logo(*elems, **opts)
		elems = elems.sort.join("-")
		image_tag "https://www.w3.org/html/logo/badge/html5-badge-h-#{elems}.png", **opts
	end

	def blog_categories(blog, category = "misc", method = :select)
		blog.articles.send(method) do |a|
			a.data["category"] == category
		end
		.sort do |a, b|
			a.data["number"] <=> b.data["number"]
		end
		.group_by do |a|
			a.data["category"]
		end
	end
end
