from app.models import db, Category

def seed_categories():

    tops = Category(categoryName='Tops')
    bottoms = Category(categoryName='Bottoms')
    jackets = Category(categoryName='Jackets')
    sweaters = Category(categoryName='Sweaters')
    accessories = Category(categoryName='Accessories')
    shoes = Category(categoryName='Shoes')
    handbags = Category(categoryName='Handbags')
    pajamas = Category(categoryName='Pajamas')
    dresses = Category(categoryName='Dresses')
    rompers = Category(categoryName='Rompers')
    swimsuits = Category(categoryName='Swimsuits')

    db.session.add(tops)
    db.session.add(bottoms)
    db.session.add(jackets)
    db.session.add(sweaters)
    db.session.add(accessories)
    db.session.add(shoes)
    db.session.add(handbags)
    db.session.add(pajamas)
    db.session.add(dresses)
    db.session.add(rompers)
    db.session.add(swimsuits)

    db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories;')
    db.session.commit()
