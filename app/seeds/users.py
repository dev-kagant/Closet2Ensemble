from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io', password='password', undies=30, bras=5, socks=20, tees=10)
    ashley = User(username='Ashley', email='ashley@aa.io', password='gant', undies=50, bras=2, socks=10,)
    kris = User(username='Kris', email='kris@aa.io', password='gant', undies=20, tees=15, socks=30,)
    anthony = User(username='Anthony', email='anthony@aa.io', password='gant', tees=15, undies=20, socks=20,)
    coletta = User(username='Coletta', email='coletta@aa.io', password='gant', undies=30, bras=10, socks=25,)
    kerry = User(username='Kerry', email='kerry@aa.io', password='gant', undies=30, tees=15, socks=25,)
    brad = User(username='Brad', email='brad@aa.io', password='simpson', undies=10, tees=5, socks=30,)
    joe = User(username='Joe', email='joe@aa.io', password='alves', undies=40, tees=5, socks=10,)
    juliet = User(username='Juliet', email='juliet@aa.io', password='shafto', undies=60, bras=30, socks=30,)
    michelle = User(username='Michelle', email='michelle@aa.io', password='carothers', undies=35, bras=15, socks=20,)
    mark = User(username='Mark', email='mark@aa.io', password='rodriguez', undies=40, tees=10, socks=13,)
    james = User(username='James', email='james@aa.io', password='robertson', undies=2, tees=30, socks=4,)
    jesse = User(username='Jesse', email='jesse@aa.io', password='warren', undies=8, tees=75, socks=60,)
    emily = User(username='Emily', email='emily@aa.io', password='burnham', undies=20, bras=7, socks=16,)

    db.session.add(demo)
    db.session.add(ashley)
    db.session.add(kris)
    db.session.add(anthony)
    db.session.add(coletta)
    db.session.add(kerry)
    db.session.add(brad)
    db.session.add(joe)
    db.session.add(juliet)
    db.session.add(michelle)
    db.session.add(mark)
    db.session.add(james)
    db.session.add(jesse)
    db.session.add(emily)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
