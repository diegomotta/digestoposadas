class DataOrdinancesController < ApplicationController
    before_action :authenticate_user!,:user_signed_in?, except: [:index]
  before_action :set_data_ordinance, only: [:show, :edit, :update, :destroy]
   respond_to :json
    protect_from_forgery
  # GET /branches
  # GET /branches.json
  def index
  	@branch =Branch.find(params[:branch_id])
    @data_ordinances = @branch.data_ordinances
  	respond_to do |format|
      format.json { render json: @data_ordinances, status: :ok  }
    end
  end

  # GET /countrys/1
  # GET /countrys/1.json
  def show
  	@branch =Branch.find(params[:branch_id])
  	@dataordinance = @branch.data_ordinances.find(params[:id])
    respond_to do |format|
        format.json { render json: @dataordinance, status: :ok }	
    end
  end

  # POST /branchs
  # POST /branchs.json
  def create
  	@branch =Branch.find(params[:branch_id])
  	@dataordinance = @branch.data_ordinances.new(data_ordinance_params)

    respond_to do |format|
      if @dataordinance.save
        format.json { render json: @dataordinance, status: :ok }
      else
        format.json { render json: @dataordinance.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /branchs/1
  # PATCH/PUT /branchs/1.json
  def update
  	@branch =Branch.find(params[:branch_id])
  	@dataordinance = @branch.data_ordinances.find(params[:id])
    respond_to do |format|
      if @dataordinance.update(data_ordinance_params)
        format.json { render json: @dataordinance, status: :ok  }
      else
        format.json { render json: @dataordinance.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /branchs/1
  # DELETE /branchs/1.json
  def destroy
  	@branch =Branch.find(params[:branch_id])
  	@dataordinance = @branch.data_ordinances.find(params[:id])
    @dataordinance.destroy
    respond_to do |format|
      format.json { render json: {}, status: :ok }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_data_ordinance
      @dataordinance = DataOrdinance.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def data_ordinance_params
      params.require(:data_ordinance).permit(:branch_id,:title, :description, :type_ordinance,  :number, :previous_number, :date_sanction, :type_bulletin, :number_bulletin, :date_publication_bulletin, :page, :type_promulgation, :decree_promulgating, :date_promulgation, :general_theme)
    end
end
