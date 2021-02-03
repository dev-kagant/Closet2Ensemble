from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


follow = db.Table(
    'follows',
    db.Column('userFollowed', db.Integer, db.ForeignKey('users.id')),
    db.Column('userFollowing', db.Integer, db.ForeignKey('users.id')),
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    undies = db.Column(db.Integer)
    bras = db.Column(db.Integer)
    socks = db.Column(db.Integer)
    tees = db.Column(db.Integer)
    items = db.relationship('Item', backref="ownerId", lazy='dynamic')
    borrowedItems = db.relationship(
        'Borrowed', backref="borrowerId", lazy="dynamic")
    following = db.relationship(
        "User", secondary=follow, backref=db.backref('followers', lazy="dynamic"))
    outfits = db.relationship(
        "Outfit", backref=db.backref('userId', lazy="dynamic"))

    @ property
    def password(self):
        return self.hashed_password

    @ password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "undies": self.undies,
            "bras": self.bras,
            "socks": self.socks,
            "tees": self.tees,
            "items": [item.to_dict() for item in self.items],
            "borrowedItems": [item.to_dict() for item in self.borrowedItems],
            "following": [follow.to_dict() for follow in self.following],
            "followers": [follower.to_dict() for follower in self.followers]
        }
