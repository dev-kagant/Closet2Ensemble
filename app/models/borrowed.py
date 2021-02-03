from .db import db
from datetime import datetime


class Borrowed(db.Model):
    __tablename__ = "borrow"

    id = db.Column(db.Integer, primary_key=True)
    borrowerId = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    dateBorrowed = db.Column(db.Date, nullable=False)
    notes = db.Column(db.String(2500))

    def to_dict(self):
        return {
            "id": self.id,
            "borrowerId": self.borrowerId,
            "dateBorrowed": self.dateBorrowed,
            "notes": self.notes
        }
