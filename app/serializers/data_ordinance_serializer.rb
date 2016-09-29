class DataOrdinanceSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :type_ordinance, :branch, :number, :previous_number, :date_sanction, :type_bulletin, :number_bulletin, :date_publication_bulletin, :page, :type_promulgation, :decree_promulgating, :date_promulgation, :general_theme
end
