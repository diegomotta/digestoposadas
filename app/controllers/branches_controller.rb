class BranchesController < ApplicationController
  before_action :authenticate_user!,:user_signed_in? , except: [:index, :show]
  before_action  :set_branch, only: [:show, :edit, :update, :destroy]
  respond_to :json
  protect_from_forgery
  # GET /countrys
  # GET /countrys.json
def index
  @branches = Branch.all
   render json: @branches

end

  # GET /countrys/1
  # GET /countrys/1.json
  def show
  	@branch = Branch.find(params[:id])
    respond_to do |format|
      format.json { render json: @branch, status: :ok  }
    end
  end

  # POST /branchs
  # POST /branchs.json
  def create
    @branch = Branch.new(branch_params)
    respond_to do |format|
      if @branch.save
        format.json { render json: @branch, status: :ok }
      else
        format.json { render json: @branch.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /branchs/1
  # PATCH/PUT /branchs/1.json
  def update
    respond_to do |format|
      if @branch.update(branch_params)
        format.json { render json: @branch, status: :ok  }
      else
        format.json { render json: @branch.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /branchs/1
  # DELETE /branchs/1.json
  def destroy
    @branch.destroy
    respond_to do |format|
      format.json { render json: {}, status: :ok }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_branch
      @branch = Branch.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def branch_params
      params.require(:branch).permit(:name,:number)
    end
end
