class BlogPost < ApplicationRecord
  has_one_attached :image
  validates :image, presence: true
  validates :content, presence: true
  validates :title, presence: true
end
