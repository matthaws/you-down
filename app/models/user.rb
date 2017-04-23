class User < ActiveRecord::Base
  validates :email, :session_token, uniqueness: true
  validates :email, :full_name, :password_digest, :session_token, :location_zip, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  has_attached_file :profile_pic, default_url: "DEFAULT"
  validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\z/

  after_initialize :ensure_session_token

  has_many :organized_groups,
    class_name: "Group",
    foreign_key: :organizer_id,
    primary_key: :id

  has_many :memberships,
    class_name: "Membership",
    foreign_key: :member_id,
    primary_key: :id

  has_many :joined_groups,
    through: :memberships,
    source: :group

  has_many :organized_events,
    class_name: "Events",
    foreign_key: :organizer_id,
    primary_key: :id


  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end
end
