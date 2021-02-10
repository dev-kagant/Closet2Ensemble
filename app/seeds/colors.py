from app.models import db, Color

def seed_colors():

    red = Color(color='red')
    orange = Color(color='orange')
    yellow = Color(color='yellow')
    green = Color(color='green')
    blue = Color(color='blue')
    indigo = Color(color='indigo')
    violet = Color(color='violet')
    teal = Color(color='teal')
    white = Color(color='white')
    black = Color(color='black')
    brown = Color(color='brown')
    beige = Color(color='beige')
    gray = Color(color='gray')
    pink = Color(color='pink')

    db.session.add(red)
    db.session.add(orange)
    db.session.add(yellow)
    db.session.add(green)
    db.session.add(blue)
    db.session.add(indigo)
    db.session.add(violet)
    db.session.add(teal)
    db.session.add(white)
    db.session.add(black)
    db.session.add(brown)
    db.session.add(gray)
    db.session.add(pink)

    db.session.commit()

def undo_colors():
    db.session.execute('TRUNCATE colors;')
    db.session.commit()
