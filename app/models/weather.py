from .db import db


theWeather = db.Table(
    'Weathering',
    db.Column('weatherId', db.Integer, db.ForeignKey('weather.id')),
    db.Column('itemId', db.Integer, db.ForeignKey('items.id'))
)


class Weather(db.Model):
    __tablename__ = "weather"

    id = db.Column(db.Integer, primary_key=True)
    weatherType = db.Column(db.String(50), nullable=False)
    items = db.relationship("Item", secondary=theWeather,
                            backref=db.backref("weather", lazy="dynamic"))

    def to_dict(self):
        return {
            "id": self.id,
            "weatherType": self.weatherType,
            "items": [item.to_dict() for item in self.items]
        }
