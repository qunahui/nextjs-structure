# config valid for current version and patch releases of Capistrano
lock '~> 3.16.0'
set :application, 'nextjs'
set :deploy_user, 'deploy'
set :keep_releases, 2
set :nvm_type, :user
set :nvm_node, 'v14.16.1'
set :nvm_map_bins, %w[node npm yarn pm2]

# change to your git address
set :repo_url, 'git@github.com:qunahui/nextjs-structure.git'

# share node_modules folder
# set :linked_dirs, %w[.next]
# append :linked_files, '.env'

# pm2 tasks
namespace :pm2 do
  task :start do
    on roles(:app) do
      within current_path do
        execute :pm2, "start yarn --name #{fetch(:full_app_name)} -- run start-#{fetch(:stage)}"
      end
    end
  end

  task :restart do
    on roles(:app) do
      within current_path do
        execute :pm2, "delete #{fetch(:full_app_name)}"
        execute :pm2, "start yarn --name #{fetch :full_app_name} -- run start-#{fetch(:stage)}"
      end
    end
  end

  task :stop do
    on roles(:app) do
      within shared_path do
        execute :pm2, "stop #{fetch(:full_app_name)}"
      end
    end
  end
end

namespace :deploy do
  after 'deploy:publishing', 'deploy:yarn_install'
  after 'deploy:publishing', 'deploy:restart'

  task :yarn_install do
    on roles(:app) do
      within current_path do
        execute :yarn, 'install'
        execute "rm -rf #{current_path}/.next"
        execute "cp -R #{shared_path}/.next #{current_path}/"
      end
    end
  end

  task :restart do
    invoke 'pm2:restart'
  end

  task :start do
    invoke 'pm2:start'
  end

  task :stop do
    invoke 'pm2:stop'
  end
end
