from flask import Blueprint, jsonify, session, request
from app.models import User, Item, Color, Weather, Style, Size, Category, SubCategory, Borrowed, db


items_routes = Blueprint('items', __name__)


@items_routes.route('/<category>')
def getCategory(category):
    thisCategory = Category.query.filter(Category.categoryName == category).first()
    return thisCategory.to_dict()
