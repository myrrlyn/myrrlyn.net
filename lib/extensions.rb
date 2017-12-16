class Deploy < Middleman::Extension
	def initialize(app, **opts, &block)
		super(app, **opts, &block)
	end
	#alias :included :registered
	def after_build(builder)
		builder.thor.run 'app/deploy.sh'
	end
end

::Middleman::Extensions.register(:deploy, Deploy)
