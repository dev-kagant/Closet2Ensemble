from app.models import db, Item, Weather, Style, Color
# from app.models.item import
# from app.models.weather import
# from app.models.style import
# from app.models.color import

def seed_joins():

    item1 = Item.query.get(1)
    item2 = Item.query.get(2)
    item3 = Item.query.get(3)
    item4 = Item.query.get(4)
    item5 = Item.query.get(5)

    weather1 = Weather.query.get(1)
    weather3 = Weather.query.get(3)
    weather7 = Weather.query.get(7)
    weather8 = Weather.query.get(8)
    weather10 = Weather.query.get(10)

    style14 = Style.query.get(14)
    style8 = Style.query.get(8)
    style12 = Style.query.get(12)
    style4 = Style.query.get(4)
    style15 = Style.query.get(15)

    color1 = Color.query.get(1)
    color3 = Color.query.get(3)
    color4 = Color.query.get(4)
    color5 = Color.query.get(5)
    color9 = Color.query.get(9)

    weather3.items.append(item3)
    weather8.items.append(item3)
    weather1.items.append(item5)
    weather1.items.append(item4)
    weather10.items.append(item4)
    weather8.items.append(item1)
    weather3.items.append(item1)
    weather7.items.append(item2)

    style8.items.append(item4)
    style12.items.append(item5)
    style14.items.append(item2)
    style4.items.append(item3)
    style4.items.append(item2)
    style15.items.append(item1)

    color1.items.append(item4)
    color1.items.append(item1)
    color1.items.append(item3)
    color9.items.append(item5)
    color3.items.append(item2)
    color4.items.append(item4)
    color5.items.append(item4)

    db.session.commit()

def undo_joins():
    db.session.execute('TRUNCATE joins;')
    db.session.commit()
