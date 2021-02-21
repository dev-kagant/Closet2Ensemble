from flask import Blueprint, jsonify, session, request
from app.models import User, Item, Color, Weather, Style, Size, Category, SubCategory, Borrowed, db


items_routes = Blueprint('items', __name__)


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
    print("ITEM", request.json['image'])
    item = Item(**request.json)
    db.session.add(item)
    db.session.commit()
    return item.to_dict()
