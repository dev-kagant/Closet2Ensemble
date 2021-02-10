from app.models import db, Weather

def seed_weather():

    sunny = Weather(weatherType='Sunny')
    rainy = Weather(weatherType='Rainy')
    snowy = Weather(weatherType='Snowy')
    cloudy = Weather(weatherType='Cloudy')
    windy = Weather(weatherType='Windy')
    brisk = Weather(weatherType='Brisk')
    chilly = Weather(weatherType='Chilly')
    freezing = Weather(weatherType='Freezing')
    nasty = Weather(weatherType='Nasty')
    hot = Weather(weatherType='Hot')
    cold = Weather(weatherType='Cold')


    db.session.add(sunny)
    db.session.add(rainy)
    db.session.add(snowy)
    db.session.add(cloudy)
    db.session.add(windy)
    db.session.add(brisk)
    db.session.add(chilly)
    db.session.add(freezing)
    db.session.add(nasty)
    db.session.add(hot)
    db.session.add(cold)

    db.session.commit()

def undo_weather():
    db.session.execute('TRUNCATE weather;')
    db.session.commit()
