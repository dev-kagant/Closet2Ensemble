from app.models import db, Item, Weather, Style, Color
# from app.models.item import
# from app.models.weather import
# from app.models.style import
# from app.models.color import

def seed_joins():

    item1 = Item.query.get(1)   #red boots
    item2 = Item.query.get(2)   #yellow bomber
    item3 = Item.query.get(3)   #red coat
    item4 = Item.query.get(4)   #rainbow wrap
    item5 = Item.query.get(5)   #white dress
    item6 = Item.query.get(6)   #tan boots
    item7 = Item.query.get(7)   #jamaican wrap
    item8 = Item.query.get(8)   #costa wrap

    weather1 = Weather.query.get(1)     #sunny
    weather3 = Weather.query.get(3)     #snowy
    weather5 = Weather.query.get(5)     #windy
    weather7 = Weather.query.get(7)     #chilly
    weather8 = Weather.query.get(8)     #freezing
    weather10 = Weather.query.get(10)   #hot
    weather11 = Weather.query.get(11)   #cold

    style14 = Style.query.get(14)   #street
    style8 = Style.query.get(8)     #Bohemian
    style12 = Style.query.get(12)   #Casual
    style4 = Style.query.get(4)     #Trendy
    style15 = Style.query.get(15)   #Chic
    style5 = Style.query.get(5)     #Artsy

    color1 = Color.query.get(1)     #red
    color2 = Color.query.get(2)     #orange
    color3 = Color.query.get(3)     #yellow
    color4 = Color.query.get(4)     #green
    color5 = Color.query.get(5)     #blue
    color9 = Color.query.get(9)     #white
    color10 = Color.query.get(10)   #black
    color11 = Color.query.get(11)   #brown

    weather3.items.append(item3)
    weather8.items.append(item3)
    weather1.items.append(item5)
    weather1.items.append(item4)
    weather10.items.append(item4)
    weather8.items.append(item1)
    weather3.items.append(item1)
    weather7.items.append(item2)
    weather11.items.append(item6)
    weather3.items.append(item6)
    weather1.items.append(item7)
    weather5.items.append(item7)
    weather10.items.append(item7)
    weather1.items.append(item8)
    weather5.items.append(item8)
    weather10.items.append(item8)

    style8.items.append(item4)
    style12.items.append(item5)
    style14.items.append(item2)
    style4.items.append(item3)
    style4.items.append(item2)
    style15.items.append(item1)
    style4.items.append(item6)
    style5.items.append(item7)
    style8.items.append(item7)
    style8.items.append(item8)

    color1.items.append(item4)
    color1.items.append(item1)
    color1.items.append(item3)
    color9.items.append(item5)
    color3.items.append(item2)
    color4.items.append(item4)
    color5.items.append(item4)
    color2.items.append(item8)
    color3.items.append(item7)
    color4.items.append(item7)
    color10.items.append(item7)
    color11.items.append(item6)


    db.session.commit()

def undo_joins():
    db.session.execute('TRUNCATE joins;')
    db.session.commit()
