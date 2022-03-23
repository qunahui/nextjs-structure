set :stage, :staging
set :branch, 'dev'

set :full_app_name, "#{fetch(:application)}_#{fetch(:stage)}"

server '1.2.3.4', user: 'deploy', roles: 'app', primary: true

set :deploy_to, "/home/#{fetch(:deploy_user)}/#{fetch(:full_app_name)}"
