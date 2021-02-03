from .db import db


class Size(db.Model):
    __tablename__ = "sizes"

    id = db.Column(db.Integer, primary_key=True)
    sizeDescription = db.Column(db.String(50), nullable=False)
    items = db.relationship("Item", backref="sizes", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "sizeDescription": self.sizeDescription,
            "items": [item.to_dict() for item in self.items]
        }
