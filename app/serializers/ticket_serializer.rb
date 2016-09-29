class TicketSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :contact, :description, :state, :response
end
