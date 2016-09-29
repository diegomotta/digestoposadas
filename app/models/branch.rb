class Branch < ActiveRecord::Base
	has_many :data_ordinances ,dependent: :destroy
end
