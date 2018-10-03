Rails.application.routes.draw do
  mount Bootsy::Engine => '/bootsy', as: 'bootsy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :admin do
    resources :blog_posts, only: [:index, :show, :new, :create, :destroy, :edit, :update]
  end

  resources :blog_posts, only: [:index, :show]

  get "/agradecimento", to: "greetings#index"
  get "/agradecimento/download", to: "greetings#download"

  root to: 'blog_posts#index'
end
