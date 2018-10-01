Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :admin do
    resources :blog_posts, only: [:index, :show, :new, :create, :destroy, :edit, :update]
  end
end
