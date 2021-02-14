from flask import Blueprint, jsonify, session, request
from app.models import User, Item, Color, Weather, Style, Size, Category, SubCategory, Borrowed, db


items_routes = Blueprint('items', __name__)


@items_routes.route('/<category>')
def getCategory(category):
    thisCategory = Category.query.filter(Category.categoryName == category).first()
    return thisCategory.to_dict()

@items_routes.route('/colors')
def getAllColors():
    allColors = Color.query.all()
    print("COLORS", [color.to_dict() for color in allColors])
    return {"colors": [color.to_dict() for color in allColors]}

@items_routes.route('/styles')
def getAllStyles():
    allStyles = Style.query.all()
    print("STYLE", [style.to_dict() for style in allStyles])
    return {"styles": [style.to_dict() for style in allStyles]}

@items_routes.route('/weather')
def getAllWeather():
    allWeather = Weather.query.all()
    print("WEATHER", [weather.to_dict() for weather in allWeather])
    return {"weather": [weather.to_dict() for weather in allWeather]}
