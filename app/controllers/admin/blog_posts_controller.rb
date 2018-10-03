module Admin
  class BlogPostsController < ApplicationController
    before_action :find_blog_post, only: [:edit, :update]
    def index
      @blog_posts = BlogPost.all
    end

    def new
      @blog_post = BlogPost.new
    end

    def create
      @blog_post = BlogPost.new(blog_post_params)

      respond_to do |format|
        if @blog_post.save
          format.html { redirect_to admin_blog_posts_path(@blog_post), notice: 'Post criado com sucesso!' }
          format.json { render json: @blog_post }
        else
          format.html { render :new }
          format.json { render json: @blog_post.errors.full_messages }
        end
      end
    end

    def edit; end

    def update
      respond_to do |format|
        if @blog_post.update!(blog_post_params)
          format.html { redirect_to admin_blog_posts_path(@blog_post), notice: 'Post alterado com sucesso!' }
          format.json { render json: @blog_post }
        else
          format.html { render :edit }
          format.json { render json: @blog_post.errors.full_messages }
        end
      end
    end

    def destroy
      @blog_post = BlogPost.find(params[:id])

      @blog_post.destroy!

      respond_to do |format|
        format.html { redirect_to admin_blog_posts_path(), notice: "Post removed successfully!" }
        format.json { render json: {} }
      end
    end

    private

    def blog_post_params
      params.require(:blog_post).permit(:title, :content, :image, :bootsy_image_gallery_id)
    end

    def find_blog_post
      @blog_post = BlogPost.friendly.find(params[:id])
    end
  end
end

# @post.image.attach(params[:image])