from app.models import db, weather, style, color
from app.models.weather import theWeather

def seed_joins():

    # itemStyles1 = itemStyle(itemId=1, styledId=8)
    # itemStyles2 = itemStyle(itemId=2, styledId=12)
    # itemStyles3 = itemStyle(itemId=3, styledId=14)
    # itemStyles4 = itemStyle(itemId=3, styledId=4)
    # itemStyles5 = itemStyle(itemId=5, styledId=4)
    # itemStyles6 = itemStyle(itemId=4, styledId=15)

    # # itemWeather1 = theWeather(weatherId=3 , itemId=5 )
    # itemWeather1 = theWeather(snowy.weather.append(RedBoots))
    # # itemWeather2 = theWeather(weatherId=8 , itemId=5 )
    # itemWeather2 = theWeather(freezing.weather.append(RedBoots))
    # # itemWeather3 = theWeather(weatherId=1 , itemId=2 )
    # itemWeather3 = sunny.weather.append(FlowerDress)
    # # itemWeather4 = theWeather(weatherId=1 , itemId=1 )
    # itemWeather4 = sunny.weather.append(RainbowWrap)
    # # itemWeather5 = theWeather(weatherId=10 , itemId=1 )
    # itemWeather5 = hot.weather.append(RainbowWrap)
    # # itemWeather6 = theWeather(weatherId=8 , itemId=4 )
    # itemWeather6 = freezing.weather.append(RedJacket)
    # # itemWeather7 = theWeather(weatherId=3 , itemId=4 )
    # itemWeather7 = snowy.weather.append(RedJacket)
    # # itemWeather8 = theWeather(weatherId=7 , itemId=3 )
    # itemWeather8 = chilly.weather.append(Yellowbomber)

    # itemColors1 = itemColor(colorId=1, itemId=4)
    # itemColors2 = itemColor(colorId=1, itemId=5)
    # itemColors3 = itemColor(colorId=1, itemId=1)
    # itemColors4 = itemColor(colorId=3, itemId=1)
    # itemColors5 = itemColor(colorId=4, itemId=1)
    # itemColors6 = itemColor(colorId=5, itemId=1)


    # db.session.add(itemStyles1)
    # db.session.add(itemStyles2)
    # db.session.add(itemStyles3)
    # db.session.add(itemStyles4)
    # db.session.add(itemStyles5)
    # db.session.add(itemStyles6)

    # db.session.add(itemWeather1)
    # db.session.add(itemWeather2)
    # db.session.add(itemWeather3)
    # db.session.add(itemWeather4)
    # db.session.add(itemWeather5)
    # db.session.add(itemWeather6)
    # db.session.add(itemWeather7)
    # db.session.add(itemWeather8)

    # db.session.add(itemColors1)
    # db.session.add(itemColors2)
    # db.session.add(itemColors3)
    # db.session.add(itemColors4)
    # db.session.add(itemColors5)
    # db.session.add(itemColors6)

    db.sessions.commit()

def undo_joins():
    db.session.execute('TRUNCATE joins;')
    db.session.commit()
