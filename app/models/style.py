from .db import db


itemStyle = db.Table(
    'itemStyles',
    db.Model.metadata,
    db.Column('styledId', db.Integer, db.ForeignKey('styles.id', ondelete="CASCADE"), nullable=False),
    db.Column('itemId', db.Integer, db.ForeignKey('items.id', ondelete="CASCADE"), nullable=False)
)


class Style(db.Model):
    __tablename__ = "styles"

    id = db.Column(db.Integer, primary_key=True)
    styleType = db.Column(db.String(50), nullable=False)
    items = db.relationship("Item", secondary=itemStyle,
                            backref=db.backref("itemStyles.styleId", lazy="dynamic", passive_deletes=True))

    def to_dict(self):
        return {
            "id": self.id,
            "styleType": self.styleType,
        }

    def all_items(self):
        return{
            "items": [item.to_dict() for item in self.items]
        }
