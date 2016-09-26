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
end
