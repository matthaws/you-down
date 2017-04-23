Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update, :show]
    resources :groups, only: [:create, :update, :show, :destroy] do
      resources :memberships, only: [:create, :destroy]
    end
    resources :event, only: [:create, :update, :show, :destroy]
    resource :session, only: [:create, :destroy]
  end
end
