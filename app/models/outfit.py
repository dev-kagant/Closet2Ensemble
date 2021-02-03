from .db import db
from datetime import datetime


class Outfit(db.Model):
    __table__ = "outfits"

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    event = db.Column(db.Text)
    day = db.Column(db.Date, nullable=False)
    notes = db.Column(db.String(2500))
    jacketId = db.Column(db.Integer, db.ForeignKey('items.id'))
    bagId = db.Column(db.Integer, db.ForeignKey('items.id'))
    shoeId = db.Column(db.Integer, db.ForeignKey('items.id'))
    topId = db.Column(db.Integer, db.ForeignKey('items.id'))
    bottomId = db.Column(db.Integer, db.ForeignKey('items.id'))
    dressId = db.Column(db.Integer, db.ForeignKey('items.id'))
    accessoryOne = db.Column(db.Integer, db.ForeignKey('items.id'))
    accessoryTwo = db.Column(db.Integer, db.ForeignKey('items.id'))
    accessoryThree = db.Column(db.Integer, db.ForeignKey('items.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "creatorId": self.creatorId,
            "event": self.event,
            "day": self.day,
            "notes": self.notes,
            "jacketId": self.jacketId,
            "bagId": self.bagId,
            "shoeId": self.shoeId,
            "topId": self.topId,
            "bottomId": self.bottomId,
            "dressId": self.dressId,
            "accessoryOne": self.accessoryOne,
            "accessoryTwo": self.accessoryTwo,
            "accessoryThree": self.accessoryThree,
        }
