class BlogPostsController < ApplicationController
  def index
    @blog_posts = BlogPost.all
  end

  def show
    @blog_posts = BlogPost.all
    @blog_post = BlogPost.friendly.find(params[:id])
  end
end
