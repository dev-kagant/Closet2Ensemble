from .db import db


itemColors = db.Table(
    'itemColors',
    db.Model.metadata,
    db.Column('colorId', db.Integer, db.ForeignKey('colors.id')),
    db.Column('itemId', db.Integer, db.ForeignKey('items.id'))
)


class Color(db.Model):
    __tablename__ = "colors"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String(50), nullable=False)
    items = db.relationship("Item", secondary=itemColors, backref=db.backref("itemColors.colorId", lazy='dynamic'))


    def to_dict(self):
        return {
            "id": self.id,
            "color": self.color,
        }

    def all_items(self):
        return{
            "items": [item.to_dict() for item in self.items]
        }
