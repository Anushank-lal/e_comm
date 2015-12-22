# config/initializers/rabl_init.rb
require 'rabl'
Rabl.configure do |config|

    config.view_paths = [
    Rails.root.join("app/api/templates"),
    Rails.root.join("app/views")
  ]
  # Commented as these are defaults
  config.cache_all_output = false
  config.cache_sources = Rails.env != 'development' # Defaults to false
  config.cache_engine = Rabl::CacheEngine.new # Defaults to Rails cache
  config.perform_caching = false
  config.raise_on_missing_attribute = false # Defaults to false
  config.exclude_empty_values_in_collections = true # Defaults to false
end
