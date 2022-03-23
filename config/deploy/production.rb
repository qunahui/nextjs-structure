set :stage, :production
set :branch, 'main'

set :full_app_name, "#{fetch(:application)}_#{fetch(:stage)}"
# set :server_name, 'nextjs-deployddment.jameshuynh.com' # change to your application domain name

server '1.2.3.4', user: 'deploy', roles: 'app', primary: true # change to your server IP and your username

set :deploy_to, "/home/#{fetch(:deploy_user)}/#{fetch(:full_app_name)}"
