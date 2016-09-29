class CreateDataOrdinances < ActiveRecord::Migration
  def change
    create_table :data_ordinances do |t|
      t.string :title
      t.string :description
      t.string :type_ordinance
      t.string :branch
      t.string :number
      t.integer :previous_number
      t.date :date_sanction
      t.string :type_bulletin
      t.integer :number_bulletin
      t.date :date_publication_bulletin
      t.integer :page
      t.string :type_promulgation
      t.string :decree_promulgating
      t.date :date_promulgation
      t.string :general_theme
      t.integer :branch_id
      t.timestamps null: false
    end
    add_foreign_key  :data_ordinances, :branches
    #add_attachment :data_ordinances, :file
  end
end
