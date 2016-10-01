module Helpers
	def gravatar_for email, size: 128
		email ||= "example@example.com"
		gid = Digest::MD5::hexdigest email.downcase
		"https://gravatar.com/avatar/#{gid}?s=#{size}"
	end

	# Render an email address (hopefully) unparsable for spam crawlers.
	def mask_email email
		email ||= "me@myrrlyn.net"
		str = email.downcase.reverse.split('@')
		"<span class=\"masked-email\">#{str[0]}<a href=\"#nospam\">don’t spam pls</a>&#64;#{str[1]}</span>"
	end

	# Render the Glider pattern with inlined size and position attributes
	# This trick brought to you by Firefox's suboptimal SVG renderer.
	def glider_svg **kwargs
		gb = Builder::XmlMarkup.new indent: 2
		scale = kwargs[:scale] || 48

		$glider_a = [
			[1, 0],
			[2, 1],
			[0, 2],
			[1, 2],
			[2, 2],
		]
		$glider_b = [
			[0, 0],
			[2, 0],
			[1, 1],
			[2, 1],
			[1, 2],
		]

		gb.svg xmlns: "http://www.w3.org/2000/svg", id: "glider" do |svg|\
			svg.rect class: "outer", width: scale * 3, height: scale * 3
			svg.rect class: "inner-x", width: scale * 3, height: scale, y: scale
			svg.rect class: "inner-y", width: scale, height: scale * 3, x: scale
			$glider_a.each do |pair|
				x, y = pair
				svg.circle class: "x-#{x} y-#{y}", cx: scale * (x + 0.5), cy: scale * (y + 0.5), r: (scale / 3).round(3)
			end
		end

		gb.target!
	end
end
