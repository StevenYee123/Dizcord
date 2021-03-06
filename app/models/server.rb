# == Schema Information
#
# Table name: servers
#
#  id             :bigint           not null, primary key
#  name           :string           not null
#  leader_id      :integer          not null
#  private_status :boolean          default(FALSE), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  invite_link    :string
#
class Server < ApplicationRecord 
    validates :name, presence: true, length: {minimum: 3}
    validates :invite_link, presence: true
    validates :leader_id, presence: true 
    validates :private_status, inclusion: {in: [true, false]}

    belongs_to :leader,
    foreign_key: :leader_id,
    class_name: :User

    has_many :server_memberships,
    foreign_key: :server_id,
    class_name: :ServerMembership

    has_many :users,
    through: :server_memberships,
    source: :user

    has_many :channels,
    foreign_key: :server_id,
    class_name: :Channel,
    dependent: :destroy
end
