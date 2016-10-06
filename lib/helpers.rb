module Helpers
	def gravatar_for email = "me@myrrlyn.net", size: 128
		gid = Digest::MD5::hexdigest email.downcase
		"https://gravatar.com/avatar/#{gid}?s=#{size}"
	end

	# Render an email address (hopefully) unparsable for spam crawlers.
	def mask_email email = "me@myrrlyn.net"
		str = email.downcase.reverse.split('@')
		title = "Spam scrapers make life worse for all of us, sorry"
		"<span class=\"masked-email\" title=\"#{title}\">#{str[0]}<a href=\"#nospam\">don’t spam</a>&#64;#{str[1]}</span>"
	end

	# Render the Glider pattern with inlined size and position attributes
	# This trick brought to you by Firefox's suboptimal SVG renderer.
	def glider_svg **kwargs
		gb = Builder::XmlMarkup.new indent: 2
		scale = kwargs[:scale] || 48

		gliders = Tomlrb.load_file "data/glider.toml", symbolize_keys: true

		gb.svg xmlns: "http://www.w3.org/2000/svg",
		       id: "glider",
		       width: scale * 3,
		       height: scale * 3 do |svg|
			svg.rect class: "outer", width: scale * 3, height: scale * 3
			svg.rect class: "inner-x", width: scale * 3, height: scale, y: scale
			svg.rect class: "inner-y", width: scale, height: scale * 3, x: scale
			3.times do |y|
				3.times do |x|
					svg.circle class: "cell x-#{x} y-#{y}", cx: scale * (x + 0.5), cy: scale * (y + 0.5), r: (scale / 3).round(3)
				end
			end
		end

		gb.target!
	end
end
