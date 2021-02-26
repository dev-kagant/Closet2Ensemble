from flask import Blueprint, jsonify, session, request
from app.models import User, Item, Color, Weather, Style, Size, Category, SubCategory, Borrowed, db
from app.models.color import itemColors

items_routes = Blueprint('items', __name__)


@items_routes.route('/<int:itemId>')
def setItem(itemId):
    item = Item.query.get(itemId)
    return item.to_dict()

@items_routes.route('/<category>')
def getCategory(category):
    thisCategory = Category.query.filter(Category.categoryName == category).first()
    return thisCategory.to_dict()

@items_routes.route('/categories')
def getAllCategories():
    allCategories = Category.query.all()
    return {"categories": [category.to_dict() for category in allCategories]}

@items_routes.route('/subCates')
def getAllSubCates():
    allSubCates = SubCategory.query.all()
    return {"subCates": [subCate.to_dict() for subCate in allSubCates]}

@items_routes.route('/colors')
def getAllColors():
    allColors = Color.query.all()
    return {"colors": [color.to_dict() for color in allColors]}

@items_routes.route('/styles')
def getAllStyles():
    allStyles = Style.query.all()
    return {"styles": [style.to_dict() for style in allStyles]}

@items_routes.route('/weather')
def getAllWeather():
    allWeather = Weather.query.all()
    return {"weather": [weather.to_dict() for weather in allWeather]}

@items_routes.route('/sizes')
def getAllSizes():
    allSizes = Size.query.all()
    return {"sizes": [size.to_dict() for size in allSizes]}

@items_routes.route('/add-color', methods=['POST'])
def addColor():
    print("COLOR", request.json['color'])
    color = Color(**request.json)
    db.session.add(color)
    db.session.commit()
    return color.to_dict()

@items_routes.route('/add-style', methods=['POST'])
def addStyle():
    print("STYLE", request.json['styleType'])
    style = Style(**request.json)
    db.session.add(style)
    db.session.commit()
    return style.to_dict()

@items_routes.route('/add-weather', methods=['POST'])
def addWeather():
    print("WEATHER", request.json['weatherType'])
    weather = Weather(**request.json)
    db.session.add(weather)
    db.session.commit()
    return weather.to_dict()

@items_routes.route('/add', methods=['POST'])
def addNewItem():
    item = Item(**request.json)
    print("NEW-ITEM", item.description)
    db.session.add(item)
    db.session.commit()
    return item.to_dict()

@items_routes.route('/add-to-item', methods=['POST'])    #Come back and add a map to add more than one at a time
def addFeatures():
    item = Item.query.get(request.json['newItem']['id'])
    if(request.json['color']):
        color = Color.query.get(request.json['color'])
        color.items.append(item)
    if(request.json['weather']):
        weather = Weather.query.get(request.json['weather'])
        weather.items.append(item)
    if(request.json['style']):
        style = Style.query.get(request.json['style'])
        style.items.append(item)
    db.session.commit()
    return item.to_dict()

@items_routes.route('/<int:itemId>', methods=['DELETE'])
def dropItem(itemId):
    item = Item.query.get(itemId)
    db.session.delete(item)
    db.session.commit()
    return "Item Removed"

@items_routes.route('/get-items', methods=['POST'])
def getFilterItem():
    print("WHAT ARE WE GETTING BACK")
    if request.json['colorId']:
        color = Color.query.get(request.json['colorId'])
        color = color.all_items()
        print("COLOR COLOR COLOR", color)
    else:
        color=[]
    if request.json['styleId']:
        style = Style.query.get(request.json['styleId'])
        style = style.all_items()
        print("STYLE STYLE STYLE", style)
    else:
        style=[]
    if request.json['weatherId']:
        weather = Weather.query.get(request.json['weatherId'])
        weather = weather.all_items()
        print("WEATHER WEATHER WEATHER", weather)
    else:
        weather=[]
    # return "Complete"
    # return {'color': color.all_items()}
    return {"color": color, "style": style, "weather": weather}
