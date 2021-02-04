from .db import db


itemColor = db.Table(
    'itemColors',
    db.Column('colorId', db.Integer, db.ForeignKey('colors.id'), nullable=False),
    db.Column('itemId', db.Integer, db.ForeignKey('items.id'), nullable=False)
)


class Color(db.Model):
    __tablename__ = "colors"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String(50), nullable=False)
    items = db.relationship("Item", secondary=itemColor,
                            backref=db.backref("colors", lazy="dynamic"))

    def to_dict(self):
        return {
            "id": self.id,
            "color": self.color,
            "items": [item.to_dict() for item in self.items]
        }
