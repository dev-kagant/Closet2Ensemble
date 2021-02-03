from .db import db


itemStyle = db.Table(
    'itemStyles',
    db.Column('styledId', db.Integer, db.ForeignKey('styles.id')),
    db.Column('itemId', db.Integer, db.ForeignKey('items.id'))
)


class Style(db.Model):
    __tablename__ = "styles"

    id = db.Column(db.Integer, primary_key=True)
    styleType = db.Column(db.String(50), nullable=False)
    items = db.relationship("Item", secondary=itemStyle,
                            backref=db.backref("styles", lazy="dynamic"))

    def to_dict(self):
        return {
            "id": self.id,
            "styleType": self.styleType,
            "items": [item.to_dict() for item in self.items]
        }
