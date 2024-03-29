from app.models import db, Item


def seed_items():

    RainbowWrap = Item(
        ownerId=2,
        description="rainbow wrap",
        sizeId=29,
        image="https://closettoensemble.s3.amazonaws.com/ForAWS/rainbowWrap.jpg",
        purchasedAt="Cayman Islands",
        clean=True,
        datePurchased="2019-01-10",
        lastWorn="2021-02-05",
        timesWorn=30,
        subCategoryId=44
        )
    FlowerDress = Item(
        ownerId=2,
        description="A white and flower sun dress",
        sizeId=4,
        image="https://closettoensemble.s3.amazonaws.com/ForAWS/whiteDayDress.jpg",
        purchasedAt="Amazon",
        clean=True,
        datePurchased="2018-12-10",
        lastWorn="2020-02-16",
        timesWorn=7,
        subCategoryId=63
        )
    YellowBomber = Item(
        ownerId=2,
        description="Yellow bomber jacket",
        sizeId=3,
        image="https://closettoensemble.s3.amazonaws.com/ForAWS/yellowBomber.jpg",
        purchasedAt="Gift from brother",
        clean=True,
        datePurchased="2015-12-25",
        lastWorn="2015-12-25",
        timesWorn=0,
        borrowedId=1,
        subCategoryId=18
        )
    RedJacket = Item(
        ownerId=5,
        description="A red winter coat with black accents",
        sizeId=3,
        image="https://closettoensemble.s3.amazonaws.com/ForAWS/redCoat.jpg",
        purchasedAt="Macy's",
        clean=True,
        datePurchased="2020-09-13",
        lastWorn="2021-02-02",
        timesWorn=20,
        subCategoryId=12
        )
    RedBoots = Item(
        ownerId=5,
        description="Red winter boots with faux fur and buckles around the tops",
        sizeId=16,
        image="https://closettoensemble.s3.amazonaws.com/ForAWS/redBoots.jpg",
        purchasedAt="Macy's",
        clean=True,
        datePurchased="2019-11-17",
        lastWorn="2021-01-24",
        timesWorn=6,
        subCategoryId=28
        )
    TanBoots = Item(
        ownerId=5,
        description="Tan winter boots with faux fur and buckles around the tops",
        sizeId=16,
        image="https://closettoensemble.s3.amazonaws.com/ForAWS/tanBoots.jpg",
        purchasedAt="Macy's",
        clean=True,
        datePurchased="2019-11-17",
        lastWorn="2021-02-24",
        timesWorn=100,
        subCategoryId=28
    )
    JamaicanWrap = Item(
        ownerId=2,
        description="Jamaican colors in a wrap",
        sizeId=29,
        image="https://closettoensemble.s3.amazonaws.com/ForAWS/jamaicanWrap.jpg",
        purchasedAt="Jamaica",
        clean=True,
        datePurchased="2019-1-17",
        lastWorn="2021-01-20",
        timesWorn=40,
        subCategoryId=44
        )
    CostaWrap = Item(
        ownerId=2,
        description="Orange wrap with cut outs and flowers",
        sizeId=29,
        image="https://closettoensemble.s3.amazonaws.com/ForAWS/costaWrap.jpg",
        purchasedAt="Costa Rica",
        clean=True,
        datePurchased="2017-7-27",
        lastWorn="2021-02-10",
        timesWorn=40,
        subCategoryId=44
        )

    db.session.add(RedBoots)
    db.session.add(YellowBomber)
    db.session.add(RedJacket)
    db.session.add(RainbowWrap)
    db.session.add(FlowerDress)
    db.session.add(TanBoots)
    db.session.add(JamaicanWrap)
    db.session.add(CostaWrap)

    db.session.commit()

def undo_items():
    db.session.execute('TRUNCATE items;')
    db.session.commit()
