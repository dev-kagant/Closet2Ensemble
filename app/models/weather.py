from .db import db


class Weather(db.Model):
    __table__ = "weather"

    id = db.Column(db.Integer, primary_key=True)
    weatherType = db.Column(db.String(50), nullable=False)
    items = db.relationship("Item", secondary=theWeather,
                            backref=db.backref("weather"), lazy="dynamic")

    def to_dict(self):
        return {
            "id": self.id,
            "weatherType": self.weatherType,
            "items": [item.to_dict() for item in self.items]
        }


theWeather = db.Table(
    'theWeather',
    db.Column('weatherId', db.Integer, db.ForeignKey('weather.id')),
    db.Column('itemId', db.Integer, db.ForeignKey('item.id'))
)
