class GreetingsController < ApplicationController
  def index
    @ebook = params[:ebook]
  end

  def download
    send_file(File.join(Rails.root, 'public/ebooks', "#{ebook_kind}.pdf"))
  end

  private

  def ebook_kind
    case params[:ebook]
    when "endomarketing"
      "CLAQUETEBUSINESS_e-book_endomarketing"
    when "eventos"
      "CLAQUETEBUSINESS_e-book_eventos"
    when "lead"
      "CLAQUETEBUSINESS_e-book_geracao-leads"
    end
  end
end
