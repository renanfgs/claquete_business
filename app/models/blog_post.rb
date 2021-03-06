class BlogPost < ApplicationRecord
  extend FriendlyId
  include Bootsy::Container


  has_one_attached :image
  validates :image, presence: true
  validates :content, presence: true
  validates :title, presence: true

  friendly_id :title, use: :slugged
end
