from .db import db


itemColors = db.Table(
    'itemColors',
    db.Column('colorId', db.Integer, db.ForeignKey('colors.id')),
    db.Column('itemId', db.Integer, db.ForeignKey('items.id'))
)


class Color(db.Model):
    __tablename__ = "colors"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String(50), nullable=False)
    # itemId = db.Column(db.Integer, db.ForeignKey("items.id"), nullable=True)

    items = db.relationship("Item", secondary='itemColors', backref=db.backref("colorId", lazy='dynamic'))
    # items = db.relationship("Item", back_populates="colorId", lazy='dynamic')

    def to_dict(self):
        return {
            "id": self.id,
            "color": self.color,
            "items": [item.to_dict() for item in self.items]
        }
