from .db import db
from datetime import datetime
from app.models.weather import theWeather
from app.models.style import itemStyle
from app.models.color import itemColors

class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    description = db.Column(db.Text)
    subCategoryId = db.Column(db.Integer, db.ForeignKey("subcategories.id"), nullable=False)
    image = db.Column(db.Text)
    sizeId = db.Column(db.Integer, db.ForeignKey("sizes.id"))
    purchasedAt = db.Column(db.String(255))
    clean = db.Column(db.Boolean)
    datePurchased = db.Column(db.Date)
    lastWorn = db.Column(db.Date)
    timesWorn = db.Column(db.Integer)
    borrowedId = db.Column(db.Integer, db.ForeignKey(
        "borrow.id"))
    weathers = db.relationship("Weather", secondary=theWeather,
                            backref=db.backref("itemWeather.itemId", lazy="dynamic"))
    colors = db.relationship("Color", secondary=itemColors,
                            backref=db.backref("itemColors.itemId", lazy="dynamic"))
    styles = db.relationship("Style", secondary=itemStyle,
                            backref=db.backref("itemStyles.itemId", lazy="dynamic"))
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow)

    # def __hash__(self):
    #     return hash(self.colors, self.weathers, self.styles)

    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.ownerId,
            "description": self.description,
            "subCategoryId": self.subCategoryId,
            "image": self.image,
            "sizeId": self.sizeId,
            "purchasedAt": self.purchasedAt,
            "clean": self.clean,
            "datePurchased": self.datePurchased,
            "lastWorn": self.lastWorn,
            "timesWorn": self.timesWorn,
            "borrowedId": self.borrowedId,
            "weathers": [weather.to_dict() for weather in tuple(self.weathers)],
            "colors": [color.to_dict() for color in tuple(self.colors)],
            "styles": [style.to_dict() for style in tuple(self.styles)],
            # "weathers": tuple(self.weathers),
            # "colors":tuple(self.colors),
            # "styles": tuple(self.styles),
            # "weathers": [weather.to_dict() for weather in self.weathers],
            # "colors": [color.to_dict() for color in self.colors],
            # "styles": [style.to_dict() for style in self.styles],
            "created": self.created,
            "updated": self.updated,
        }
