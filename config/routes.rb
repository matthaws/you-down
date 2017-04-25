Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update, :show]
    resources :groups, only: [:index, :create, :update, :show, :destroy] do
      resources :memberships, only: [:create]
      delete '/memberships', to: 'memberships#destroy'
    end

    resources :events, only: [:create, :update, :show, :destroy] do
      resources :rsvps, only: [:create]
      delete '/rsvps', to: 'rsvps#destroy'
    end

    resource :session, only: [:create, :destroy]
  end
end
