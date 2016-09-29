class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :name
      t.string :email
      t.string :contact
      t.string :description
      t.string :state
      t.string :response
      t.timestamps null: false
    end
  end
end
