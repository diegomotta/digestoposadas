class TicketsController < ApplicationController
  before_action :authenticate_user!,:user_signed_in?, except: [:create,:show]
  before_action :set_ticket, only: [:show, :edit, :update, :destroy]
   respond_to :json
    protect_from_forgery
  # GET /branches
  # GET /branches.json
  def index
	@tickets = Ticket.all
	render json: @tickets
  end

  # GET /countrys/1
  # GET /countrys/1.json
  def show
  	@ticket =Ticket.find(params[:id])
    respond_to do |format|
        format.json { render json: @ticket, status: :ok }	
    end
  end

  # POST /branchs
  # POST /branchs.json
  def create
    @ticket = Ticket.new(ticket_params)
    respond_to do |format|
      if @ticket.save
        format.json { render json: @ticket, status: :ok }
      else
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /branchs/1
  # PATCH/PUT /branchs/1.json
  def update
    respond_to do |format|
      if @ticket.update(ticket_params)
        format.json { render json: @ticket, status: :ok  }
      else
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /branchs/1
  # DELETE /branchs/1.json
  def destroy
  	@ticket =Ticket.find(params[:id])
    @ticket.destroy
    respond_to do |format|
      format.json { render json: {}, status: :ok }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ticket
      @ticket = Ticket.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ticket_params
      params.require(:ticket).permit(:name,:email,:contact,:description,:state,:response)
    end
end
