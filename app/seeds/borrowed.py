from app.models import db, Borrowed

def seed_borrow():

    yb = Borrowed(borrowerId=5, dateBorrowed="2021-01-16", notes="Coletta need a jacket to wear on her date")

    db.session.add(yb)

    db.session.commit()

def undo_borrow():
    db.session.execute('TRUNCATE borrow;')
    db.session.commit()
