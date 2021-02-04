from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


followers = db.Table(
    "followers",  # tablename
    db.Model.metadata,  # inheritance
    db.Column('leader_id', db.Integer, db.ForeignKey("users.id"), primary_key=True),  # leader
    db.Column('follower_id', db.Integer, db.ForeignKey("users.id"), primary_key=True),  # follower
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
    items = db.relationship('Item', backref="items.ownerId", lazy="dynamic")
    borrowedItems = db.relationship(
        'Borrowed', backref="items.borrowerId", lazy="dynamic")
    outfits = db.relationship(
        "Outfit", backref='outfits.creatorId', lazy="dynamic")
    following = db.relationship(
        'User', secondary="followers",
        primaryjoin=id == followers.c.follower_id,
        secondaryjoin=id == followers.c.leader_id,
        backref="followers"
    )

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
