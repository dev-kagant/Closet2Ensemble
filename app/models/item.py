from .db import db
from datetime import datetime


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    description = db.Column(db.Text)
    image = db.Column(db.Text)
    sizeId = db.Column(db.Integer, db.ForeignKey("sizes.id"), nullable=False)
    purchasedAt = db.Column(db.String(255))
    clean = db.Column(db.Boolean)
    datePurchased = db.Column(db.Date)
    lastWorn = db.Column(db.Date)
    timesWorm = db.Column(db.Integer)
    borrowedId = db.Column(db.Integer, db.ForeignKey(
        "isborrowed.id"), nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.ownerId,
            "description": self.description,
            "image": self.image,
            "sizeId": self.sizeId,
            "purchasedAt": self.purchasedAt,
            "clean": self.clean,
            "datePurchased": self.datePurchased,
            "lastWorn": self.lasWorn,
            "timesworn": self.timesWorm,
            "borrowedId": self.borrowedId,
            "created": self.created,
            "updated": self.updated
        }
