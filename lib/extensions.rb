class Sign < Middleman::Extension
	def initialize(app, **opts, &block)
		super(app, **opts, &block)
	end
	#alias :included :registered
	def after_build(builder)
		builder.thor.run 'app/sign.sh'
	end
end

::Middleman::Extensions.register(:sign, Sign)
